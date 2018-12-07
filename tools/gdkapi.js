const fs = require("fs")
const path = require("path")
const prettier = require("prettier");

const baseDir = "../src"

function cutline(text, range) {
	return text.substr(range[0], range[1] - range[0])
}

function findExplain(ast, loc) {
	const comments = ast.comments || []
	let comment = comments.find(info => info['loc']['end']['line'] == (loc['start']['line'] - 1))
	return comment
}

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
							if (deftype == 'TSMethodSignature') {
								const params_def = member['params']
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
							exportList.push({ parent: moduleName, key: key, declare: memberHead, params: params, deftype: deftype, membertype: membertype, explain: explainText })
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
	console.log(moduleList)
	return moduleList
}

/**
 * @type {parent:string,declare:string,defcontent:string,key:string,alias:string,params:string[],deftype:string,membertype:string,explain:string}[]
 */
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

async function genDoc() {

	const srcfile = baseDir + '/framework/frame/UserApi.ts'
	const destdir = baseDir + '/../docs/'

	const moduleMapFile = baseDir + '/framework/sense/IModuleMap.ts'

	const moduleList = parseModuleList(moduleMapFile)
	const exportList = makeModuleBody(moduleList)

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

		let interfaceLine = alias
		if (def.deftype == 'TSMethodSignature') {
			interfaceLine = `${interfaceLine}()`
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


		const docs = moduleDocs[moduleName] ? moduleDocs[moduleName] : moduleDocs[moduleName] = []
		const line = `### **${interfaceLine}**
${comment}
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