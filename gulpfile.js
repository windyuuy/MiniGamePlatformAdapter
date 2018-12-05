var gulp = require('gulp');
// var uglifyjs = require("gulp-uglify");//压缩混淆js
// var rename = require('gulp-rename')//文件重命名
var fs = require("fs")
var child_process = require("child_process")
const OSS = require("ali-oss");
const path = require("path")

const execon = (dir, fn) => {
	const pwd = path.resolve(process.cwd())
	try {
		process.chdir(dir)
		fn()
	} catch (e) {
		console.error(e.toString())
	} finally {
		process.chdir(pwd)
	}
}
const exec = (cmd) => {
	console.log(`-[exec] ${process.cwd()}$ ${cmd}`)
	child_process.execSync(cmd, { stdio: [0, process.stdout, process.stderr] })
}

function getOssClient() {
	let accessKeyId = "LTAIkAAYUCjCkAzb"
	let accessKeySecret = "fAmMWBJ85tt2DoWpIfuovPLQj8ZIGJ"
	let bucket = "mrglee-it"
	let region = "oss-cn-hangzhou"

	console.log(OSS)
	let client = new OSS({
		region: region,//https://help.aliyun.com/document_detail/31837.html?spm=a2c4g.11186623.2.9.vbe29U
		//云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
		accessKeyId: accessKeyId,
		accessKeySecret: accessKeySecret,
		bucket: bucket
	})
	return client;
}

gulp.task("updateLibs", async function () {

	let client = getOssClient();

	await client.get("libs/slib.d.ts", "./libs/slib.d.ts")
	console.log("更新完成 slib.d.ts")

})

gulp.task("compile", async () => {

	execon(".", () => {
		execon("./framework", () => exec("tsc"))
		execon("./plugins/wechat", () => exec("tsc"))
		execon("./plugins/qqplay", () => exec("tsc"))
		execon("./plugins/develop", () => exec("tsc"))
	})

})


gulp.task("uploadVersion", async () => {
	let client = getOssClient();

	let list = fs.readdirSync("./dist")
	for (let n of list) {
		await client.put("libs/" + n, "./dist/" + n)
		console.log("上传完成", "./dist/" + n)
	}

})

function cutline(text, range) {
	return text.substr(range[0], range[1] - range[0])
}

function findExplain(ast, loc) {
	const comments = ast.comments || []
	let comment = comments.find(info => info['loc']['end']['line'] == (loc['start']['line'] - 1))
	return comment
}

gulp.task('buildapi', async () => {
	const prettier = require("prettier");

	const srcfile = './framework/frame/UserApi.ts'
	const destfile = './framework/frame/UserApi.ts'

	const moduleMapFile = './framework/sense/IModuleMap.ts'

	/**
	 * @type {varname:string,typename:string}[]
	 */
	const moduleList = []
	{
		const content = fs.readFileSync(moduleMapFile, { encoding: 'utf-8' })
		for (line of content.split('\n')) {
			const ret = line.match(/^\s*(\w+)\: (\w+)$/)
			if (ret) {
				moduleList.push({ varname: ret[1], typename: ret[2] })
			}
		}
	}
	/**
	 * @type {parent:string,declare:string,defcontent:string,key:string,params:string[],deftype:string,membertype:string,explain:string}[]
	 */
	const exportList = []
	{
		const parseModule = (parent, moduleName) => {
			// console.log('parse', moduleName)
			const exportList = []

			const subProtoFile = `./framework/sense/${moduleName}.ts`
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

		// make module body
		{
			for (let sub of moduleList) {
				const defs = parseModule('GDK', sub.typename)
				for (let def of defs) {
					let defline = def.declare
					const mvarname = sub.varname
					const key = def.key
					if (key == 'update') {
						const newkey = key + mvarname.substr(0, 1).toUpperCase() + mvarname.substr(1)
						defline = defline.replace(key + '():', newkey + '():')
					}
					const paramsline = def.params.join(',')
					const membertype = def.membertype
					const explain = def.explain
					let defcontent = ''
					let returnState = 'undefined'
					if (membertype == 'Promise') {
						returnState = 'this.createNonePromise()'
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
		}
		// let aa = parseModule('GDK', 'IAdvert')
		// console.log('lwkje', moduleList, aa)
		// console.log("lwkejf", exportList)
	}

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
	temp = prettier.format(temp, { parser: "typescript" });
	const output = temp
	fs.writeFileSync(destfile, output, { encoding: 'utf-8' })
})

gulp.task("comp", gulp.series("buildapi", "compile"));

gulp.task("publish", gulp.series("comp", "uploadVersion"));
