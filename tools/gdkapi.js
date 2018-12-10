const fs = require("fs")
const path = require("path")
const prettier = require("prettier");
const glob = require('glob')

const baseDir = "../src"

function cutline(text, range) {
	return text.substr(range[0], range[1] - range[0])
}

function findExplain(ast, loc) {
	const comments = ast.comments || []
	let comment = comments.find(info => info['loc']['end']['line'] == (loc['start']['line'] - 1))
	return comment
}

/**
 * @type {
 * text:string,
 * parent:string,
 * declare:string,
 * defcontent:string,
 * key:string,
 * alias:string,
 * params:string[],
 * paramsDef:astObj[],
 * deftype:string,
 * membertype:string,
 * explain:string
 * }[]
 */
const parseModule = (parent, moduleName) => {
	// console.log('parse', moduleName)
	const exportList = []

	const subProtoFile = baseDir + `/framework/sense/${moduleName}.ts`
	const content = fs.readFileSync(subProtoFile, { encoding: 'utf-8' })
	let txt = prettier.format(content, { semi: false, parser: "typescript" })
	prettier.format(txt, {
		parser(text, { typescript }) {
			const ast = typescript(text);
			// console.log("ast", JSON.stringify(ast))
			const namespaces = ast['body']
			for (let _namespace of namespaces) {
				if (_namespace['id']['name'] !== parent) {
					continue
				}
				const namespace_GDK = _namespace['body']
				const defs = namespace_GDK['body']
				for (let interfaceDef of defs) {
					let def = interfaceDef['declaration']
					const defname = def['id'] && def['id']['name']
					if (defname == moduleName) {
						const members = def['body']['body']
						for (let member of members) {
							const memberHead = cutline(text, member['range'])
							const key = member['key']['name']
							/**
							 * - TSMethodSignature
							 * - TSPropertySignature
							 */
							const deftype = member['type']
							const params = []
							let membertype = null
							let paramsDef = null
							// console.log(JSON.stringify(member))
							if (deftype == 'TSMethodSignature') {
								const params_def = member['params']
								paramsDef = params_def
								// console.log('params_def', prettier.format(JSON.stringify(params_def)))
								for (let p of params_def) {
									params.push(p['name'])
								}
								const typeAnnotation = member['typeAnnotation']
								if (typeAnnotation) {
									const typeName = typeAnnotation['typeAnnotation']['typeName']
									if (typeName) {
										membertype = typeName['name']
									}
								}
							} else {
								membertype = cutline(text, member['typeAnnotation']['range'])
							}


							// find explain
							const loc = member['loc']
							const explain = findExplain(ast, loc)
							let explainText = ''
							if (explain) {
								explainText = cutline(text, explain['range'])
							}

							// console.log(memberHead)
							exportList.push({
								text: text,
								parent: moduleName,
								key: key,
								declare: memberHead,
								params: params,
								deftype: deftype,
								membertype: membertype,
								explain: explainText,
								paramsDef: paramsDef,
							})
						}
					}
				}
			}
			return ast;
		}
	});
	return exportList
}

/**
 * @type {varname:string,typename:string,explain:string}[]
 */
function parseModuleList(moduleMapFile) {
	const moduleList = []
	const content = fs.readFileSync(moduleMapFile, { encoding: 'utf-8' })
	let explain = ''
	for (line of content.split('\n')) {
		const ret = line.match(/^\s*(\w+)\: (\w+)$/)
		if (ret) {
			moduleList.push({ varname: ret[1], typename: ret[2], explain: explain })
			explain = ''
		} else {
			const ret = line.match(/\t+\/\*\* (.*) \*\//)
			if (ret) {
				explain = ret[1]
			}
		}
	}
	// console.log(moduleList)
	return moduleList
}

// make module body
function makeModuleBody(moduleList) {
	const exportList = []
	for (let sub of moduleList) {
		const defs = parseModule('GDK', sub.typename)
		for (let def of defs) {
			let defline = def.declare
			const mvarname = sub.varname
			const key = def.key
			if (key == 'update') {
				const newkey = key + mvarname.substr(0, 1).toUpperCase() + mvarname.substr(1)
				defline = defline.replace(key + '():', newkey + '():')
				def.alias = newkey
			} else {
				def.alias = key
			}
			const paramsline = def.params.join(',')
			const membertype = def.membertype
			const explain = def.explain
			let defcontent = ''
			let returnState = 'undefined'
			if (membertype == 'Promise') {
				returnState = `this.createNonePromise("[${mvarname}.${key}]")`
			}
			if (def.deftype == 'TSMethodSignature') {
				defcontent = `${explain}
						${defline} {
							if(!this.checkModuleAttr("${mvarname}","${key}","function")){
								return ${returnState}
							}
							return this._m.${mvarname}.${key}(${paramsline});
						}`
			} else {
				defcontent = `${explain}
						get ${key}()${membertype} {
							if(!this.checkModuleAttr("${mvarname}","${key}")){
								return undefined
							}
							return this._m.${mvarname}.${key};
						  }`
			}
			def.defcontent = defcontent
			exportList.push(def)
		}
	}
	return exportList
}

async function buildApi() {

	const srcfile = baseDir + '/framework/frame/UserApi.ts'
	const destfile = baseDir + '/framework/frame/UserApi.ts'

	const moduleMapFile = baseDir + '/framework/sense/IModuleMap.ts'

	const moduleList = parseModuleList(moduleMapFile)
	const exportList = makeModuleBody(moduleList)

	// concat def content
	let membersContent = ''
	{
		const lines = exportList.map(info => {
			if (info.key == 'init') {
				return ''
			} else {
				return info.defcontent
			}
		})
		membersContent = lines.join('\n')
	}

	const content = fs.readFileSync(srcfile, { encoding: 'utf-8' })
	let temp = prettier.format(content, { parser: "typescript" });

	const beginMark = '// $batch_export() begin'
	const endMark = '// $batch_export() end'
	let begin = temp.indexOf(beginMark) + beginMark.length
	let end = temp.indexOf(endMark) - 1
	temp = temp.substr(0, begin) + '\n' + membersContent + '\n\n' + temp.substr(end)
	temp = prettier.format(temp, { parser: "typescript", useTabs: true });
	const output = temp
	fs.writeFileSync(destfile, output, { encoding: 'utf-8' })
}

const loadFormattedTSContent = (srcfile) => {
	const content = fs.readFileSync(srcfile, { encoding: 'utf-8' })
	let txt = prettier.format(content, { semi: false, parser: "typescript", useTabs: true })
	return txt
}

const scanInterfaces = (path, parent) => {
	const interfaceList = []

	const content = loadFormattedTSContent(path)
	prettier.format(content, {
		parser(text, { typescript }) {
			const ast = typescript(text);
			const namespaces = ast['body']
			for (let _namespace of namespaces) {
				if (!_namespace['id']) {
					continue
				}
				if (_namespace['id']['name'] !== parent) {
					continue
				}
				const namespace_GDK = _namespace['body']
				const defs = namespace_GDK['body']
				for (let interfaceDef of defs) {
					let def = interfaceDef['declaration']
					if (!def) { continue }
					let defType = def['type']
					let interfaceDefMake = null
					if (defType == 'TSInterfaceDeclaration' || defType == 'ClassDeclaration' || defType == 'TSAbstractClassDeclaration') {
						const defname = def['id'] && def['id']['name']
						const body = cutline(text, def['body']['range'])
						interfaceDefMake = {
							name: defname,
							body: body,
							defType: defType,
						}
					} else if (defType == 'VariableDeclaration') {
						const subDef = def['declarations'][0]
						const defname = subDef['id'] && subDef['id']['name']
						const body = cutline(text, subDef['init']['range'])
						interfaceDefMake = {
							name: defname,
							body: body,
							defType: defType,
						}
					} else if (defType == 'TSEnumDeclaration') {
						const defname = def['id'] && def['id']['name']
						const body = cutline(text, def['range'])
						interfaceDefMake = {
							name: defname,
							body: body,
							defType: defType,
						}
					} else {
						console.log(defType)
					}
					interfaceList.push(interfaceDefMake)
					interfaceDefMake.referList = []

					for (line of interfaceDefMake.body.split('\n')) {
						// 忽略 new()=>T
						const m = line.match(/([\w\$]+)[\?]?\: ([\w\$]+)/)
						if (m) {
							const typeName = m[2]
							interfaceDefMake.referList.push({
								typeName
							})
						}
					}
				}
			}
			return ast;
		}
	})

	// console.log(interfaceList)

	return interfaceList
}

const scanInterfacesInProject = (folder) => {
	return new Promise((resolve, reject) => {
		let interfaceListAll = []
		glob(folder, {}, function (er, files) {
			for (let file of files) {
				const interfaceList = scanInterfaces(file, "GDK")
				interfaceListAll = interfaceListAll.concat(interfaceList)
			}
			resolve(interfaceListAll)
		})
	})
}

// scanInterfaces('F:/workspace/GDK/src/framework/sense/IPay.ts', 'GDK')
// scanInterfacesInProject("F:/workspace/GDK/src/framework/**/*.ts").then((interfaceListAll) => {
// 	console.log(interfaceListAll)
// })

async function genDoc() {

	const srcfile = baseDir + '/framework/frame/UserApi.ts'
	const destdir = baseDir + '/../docs/'

	const moduleMapFile = baseDir + '/framework/sense/IModuleMap.ts'

	const moduleList = parseModuleList(moduleMapFile)
	const exportList = makeModuleBody(moduleList)

	const interfaceListAll = await scanInterfacesInProject("F:/workspace/GDK/src/framework/sense/**/*.ts")

	const moduleDocs = {}
	for (let def of exportList) {
		let defline = def.declare
		const moduleName = def.parent
		const alias = def.alias
		if (alias == 'init') {
			continue
		}
		// const paramsline = def.params.join(',')
		const membertype = def.membertype
		const explain = def.explain
		const text = def.text

		// 参数信息
		const paramsDef = def.paramsDef

		let interfaceLine = alias
		let typeDeclareList = []
		if (def.deftype == 'TSMethodSignature') {
			const info = (() => {
				const pts = []
				const typeDeclareList = []

				{
					let typeRefer = '{/** ReferedType */}'
					let referDef = interfaceListAll.find(info => info.name == membertype)
					if (referDef) {
						typeRefer = referDef.body

						typeDeclareList.push({
							referName: membertype,
							content: typeRefer,
							defType: referDef.defType,
						})
					}
				}

				let counter = 0
				for (let param of paramsDef) {
					counter++
					let varname = param['name']
					let defType = param['typeAnnotation']['typeAnnotation']['type']
					if (defType == 'TSTypeReference') {
						let typename = cutline(text, param['typeAnnotation']['typeAnnotation']['range'])
						if (typename.startsWith('GDK.')) {
							typename = typename.substr('GDK.'.length)
						}
						let typeRefer = '{/** ReferedType */}'
						let referDef = interfaceListAll.find(info => info.name == typename)
						if (referDef) {
							typeRefer = referDef.body

							// 搜寻二级引用
							if (referDef.referList) {
								for (let { typeName } of referDef.referList) {
									let typeRefer = null
									let referDef = interfaceListAll.find(info => info.name == typeName)
									if (referDef) {
										typeRefer = referDef.body
									}
									if (typeRefer) {
										typeDeclareList.push({
											referName: typeName,
											content: typeRefer,
											defType: referDef.defType,
										})
									}
								}
							}
						}
						typeDeclareList.push({
							referName: typename,
							content: typeRefer,
							defType: referDef.defType,
						})
						// if (alias == 'payPurchase') {
						// console.log(param['typeAnnotation']['typeAnnotation'])
						// }
						pts.push(`${varname}: ${typename}`)
					} else {
						const typeline = cutline(text, param['typeAnnotation']['typeAnnotation']['range'])
						let typename = typeline
						// console.log(JSON.stringify(param))
						if (typename.split('\n').length > 1) {
							typename = `ParamType${counter}`
							if (counter == 1) {
								typename = `ParamType`
							}
							typeDeclareList.push({
								referName: typename,
								content: typeline,
							})
						}
						pts.push(`${varname}: ${typename}`)
					}
				}
				return { paramsline: pts.join(','), typeDeclareList: typeDeclareList }
			})()

			let paramsline = info.paramsline
			typeDeclareList = info.typeDeclareList
			interfaceLine = `${interfaceLine}(${paramsline}): ${membertype}`
		}

		let comment = explain || ''
		if (comment) {
			const lines = comment.split('\n')
			const contents = []
			for (let line of lines) {
				let content = line.match('\s*[\*] (.*)')
				if (content) {
					contents.push(content[1])
				}
			}
			if (contents.length == 1) {
				comment = '- ' + contents[0]
				const m = comment.match(/(.*) [\*]\//)
				if (m) {
					comment = m[1]
				}
			} else {
				comment = contents.join('\n')
			}
		} else {
			comment = `- ${interfaceLine}`
		}

		const declareLines = []
		for (let info of typeDeclareList) {
			let code = `type ${info.referName} = ${info.content}`
			if (info.defType == 'TSEnumDeclaration') {
				code = info.content
			}
			try {
				code = prettier.format(code, { semi: false, parser: "typescript", useTabs: true })
			} catch (e) {
				// pass
			}
			const line = `
\`\`\`typescript
${code}
\`\`\`
`
			declareLines.push(line)
		}
		if (declareLines.length > 0) {
			declareLines.unshift('- 参数定义')
		}

		const docs = moduleDocs[moduleName] ? moduleDocs[moduleName] : moduleDocs[moduleName] = []
		// template
		const line =
			`### **${interfaceLine}**
${comment}
${declareLines.join('\n')}
`
		// console.log(line)
		docs.push(line)
	}

	if (!fs.existsSync(destdir + 'modules/')) {
		fs.mkdirSync(destdir + 'modules/')
	}
	// gen moduleName.md
	for (let name in moduleDocs) {
		const destfile = destdir + 'modules/' + name + '.md'
		const docs = moduleDocs[name]
		const content = docs.join('\n')
		fs.writeFileSync(destfile, content, { encoding: 'utf-8' })
	}


	// gen index.md
	{
		const destfile = destdir + 'SUMMARY.md'
		let doclines = []
		doclines.push('# Summary')
		doclines.push('* [概况](README.md)')

		let index = 0
		for (let name in moduleDocs) {
			index++
			const docs = moduleDocs[name]
			const moduleInfo = moduleList.find(info => info.typename == name)
			const explain = moduleInfo.explain
			doclines.push(`* [${index}.${explain}](modules/${name}.md)`)
		}

		const content = doclines.join('\n')

		fs.writeFileSync(destfile, content, { encoding: 'utf-8' })
	}
}

module.exports = {
	buildApi,
	genDoc,
}