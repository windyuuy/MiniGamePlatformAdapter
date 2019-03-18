var gulp = require('gulp');
var uglifyjs = require("gulp-uglify");//压缩混淆js
var rename = require('gulp-rename')//文件重命名
var fs = require("fs")
var child_process = require("child_process")
const OSS = require("ali-oss");
const path = require("path")
const gdkapi = require('./gdkapi')
const buildApi = gdkapi.buildApi
const genDoc = gdkapi.genDoc
const injectVersion = gdkapi.injectVersion

const ossFolderLibTest = 'libs-test'
const ossFolderLibNext = 'libs-next'
const ossFolderLibPub = 'libs'

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

	await client.get(`${ossFolderLibTest}/slib.d.ts`, `../src/libs/slib.d.ts`)
	console.log("更新完成 slib.d.ts")

})

function copyLibsTask(ossSrcDir, ossDestDir, tip) {
	return async function () {
		let client = getOssClient();

		const result = await client.list({ prefix: `${ossSrcDir}/` })
		for await (let info of result.objects) {
			console.log(`${ossDestDir}/${path.basename(info.name)}`, '<-', `${info.name}`)
			client.copy(`${ossDestDir}/${path.basename(info.name)}`, `${info.name}`)
		}
		console.log(tip)
	}
}

gulp.task("pubNext", copyLibsTask(ossFolderLibTest, ossFolderLibNext, "发布next版完成"))
gulp.task("pubPub", copyLibsTask(ossFolderLibNext, ossFolderLibPub, "发布public版完成"))


gulp.task("mini", () => {

	let fileList = fs.readdirSync("../dist")
	for (let f of fileList) {
		if (f.endsWith(".mini.js")) {
			fs.unlinkSync(path.join("../dist", f));
		}
	}

	return gulp.src("../dist/*.js") //JS文件地址
		.pipe(uglifyjs())
		.pipe(rename((path) => {
			path.basename = path.basename + ".mini";
		}))
		.pipe(gulp.dest("../dist")) //混淆后文件输出地址
})

gulp.task("compile", async () => {

	execon("../src", () => {
		execon("./framework", () => exec("tsc"))
		execon("./plugins/wechat", () => exec("tsc"))
		execon("./plugins/qqplay", () => exec("tsc"))
		execon("./plugins/app", () => exec("tsc"))
		execon("./plugins/develop", () => exec("tsc"))
		// execon("./plugins/oppo", () => exec("tsc"))
	})

})

var glob = require("glob")
gulp.task("makeVersion",async()=>{
	execon("../dist",()=>{
		glob.sync("./*.js").concat(glob.sync('./*.ts')).forEach(filename=>{
			injectVersion(filename)
		})
	})
})


gulp.task("uploadVersion", async () => {
	let client = getOssClient();

	let list = fs.readdirSync("../dist")
	for await (let n of list) {
		client.put(`${ossFolderLibTest}/` + n, "../dist/" + n)
		console.log("上传完成", "../dist/" + n)
	}

})

gulp.task('buildapi', buildApi)
gulp.task('gendoc', genDoc)

gulp.task("build", gulp.series("buildapi", "compile", "mini", "makeVersion"));
gulp.task("convdoc", async () => {
	execon("../docs/", () => exec("gitbook build"))
});
gulp.task('builddoc', gulp.series("gendoc", "convdoc"))

gulp.task("publish", gulp.series("build", "uploadVersion"));
gulp.task("pubOne", gulp.series("publish", "pubNext", "pubPub"))
