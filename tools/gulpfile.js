var gulp = require('gulp');
var uglifyjs = require("gulp-uglify"); //压缩混淆js
var rename = require('gulp-rename') //文件重命名
var fs = require("fs")
var child_process = require("child_process")
const OSS = require("ali-oss");
const path = require("path")
const gdkapi = require('./gdkapi')
const buildApi = gdkapi.buildApi
const genDoc = gdkapi.genDoc
const injectVersion = gdkapi.injectVersion

const tempDir = './temp'

const ossFolderLibTest = 'libs-test'
const ossFolderLibNext = 'libs-next'
const ossFolderLibPub = 'libs'
const ossFolderGDKDocs = 'gdk'

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
	child_process.execSync(cmd, {
		stdio: [0, process.stdout, process.stderr]
	})
}

function getOssClient() {
	let accessKeyId = "LTAIkAAYUCjCkAzb"
	let accessKeySecret = "fAmMWBJ85tt2DoWpIfuovPLQj8ZIGJ"
	let bucket = "mrglee-it"
	let region = "oss-cn-hangzhou"

	console.log(OSS)
	let client = new OSS({
		region: region, //https://help.aliyun.com/document_detail/31837.html?spm=a2c4g.11186623.2.9.vbe29U
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

		const result = await client.list({
			prefix: `${ossSrcDir}/`
		})
		await Promise.all(result.objects.map(info => {
			console.log(`${ossDestDir}/${path.basename(info.name)}`, '<-', `${info.name}`)
			return client.copy(`${ossDestDir}/${path.basename(info.name)}`, `${info.name}`)
		}))
		console.log(tip)
	}
}

gulp.task("pubNext", copyLibsTask(ossFolderLibTest, ossFolderLibNext, "发布next版完成"))
gulp.task("pubPub", copyLibsTask(ossFolderLibNext, ossFolderLibPub, "发布public版完成"))

gulp.task("verifyUpload", async () => {
	let client = getOssClient();

	const sourcefiles = glob.sync(`../dist/*`).filter(filepath => {
		return !fs.statSync(filepath).isDirectory()
	}).map(filepath => path.basename(filepath))

	if (!fs.existsSync(tempDir)) {
		fs.mkdirSync(tempDir)
	}

	console.log("clean before verify")
	glob.sync(tempDir).forEach(filepath => {
		if (!fs.statSync(filepath).isDirectory) {
			fs.unlinkSync(`${filepath}`)
		}
	})

	console.log("downloading uploaded files")
	await Promise.all(sourcefiles.map(name => {
		console.log(`${tempDir}/${path.basename(name)}`, '<-', `${ossFolderLibPub}/${name}`)
		return client.get(`${ossFolderLibPub}/${name}`, `${tempDir}/${path.basename(name)}`)
	}))

	console.log("compare uploaded files")
	const unmatchedFiles = []
	sourcefiles.forEach((filepath) => {
		let name = path.basename(filepath)
		let c1 = fs.readFileSync(`${tempDir}/${name}`, {
			encoding: 'UTF-8'
		})
		let c2 = fs.readFileSync(`../dist/${name}`, {
			encoding: 'UTF-8'
		})
		if (c1 != c2) {
			unmatchedFiles.push(name)
			console.error(`file unmatched: ${name}`, c1.length, c2.length)
		}
	})
	if (unmatchedFiles.length > 0) {
		console.error("some file unmatched")
	} else {
		console.error('all file uploaded verified')
	}
})


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
		execon("./plugins/bytedance", () => exec("tsc"))
		execon("./plugins/qqminiapp", () => exec("tsc"))
		execon("./plugins/wechat", () => exec("tsc"))
		// execon("./plugins/unityapp", () => exec("tsc"))
		execon("./plugins/app", () => exec("tsc"))
		execon("./plugins/baidu", () => exec("tsc"))
		execon("./plugins/develop", () => exec("tsc"))
		execon("./plugins/gamepind", () => exec("tsc"))
		execon("./plugins/web", () => exec("tsc"))
		execon("./plugins/oppo", () => exec("tsc"))
		execon("./plugins/vivo", () => exec("tsc"))
		execon("./plugins/webview", () => exec("tsc"))

		// execon("./test", () => exec("tsc"))
	})

})

var glob = require("glob")
gulp.task("makeVersion", async () => {
	execon("../dist", () => {
		glob.sync("./*.js").concat(glob.sync('./*.ts')).forEach(filename => {
			injectVersion(filename)
		})
	})
})


gulp.task("uploadVersion", async () => {
	let client = getOssClient();

	let list = fs.readdirSync("../dist").filter(n => {
		return !fs.statSync("../dist/" + n).isDirectory()
	})
	await Promise.all(list.map(n => {
		console.log(`${ossFolderLibTest}/` + n, "<-", "../dist/" + n)
		return client.put(`${ossFolderLibTest}/` + n, "../dist/" + n)
	}))
	console.log("上传完成", "../dist/", list)
})

gulp.task("uploadDocs", async () => {
	let client = getOssClient();

	let docdir = "../docs/_book/"
	let list = glob.sync(docdir + '**/*')
	await Promise.all(list.map(n => {
		n = n.substring(docdir.length)
		if (fs.statSync(docdir + n).isDirectory()) {
			return
		}
		console.log(`${ossFolderGDKDocs}/` + n, "<-", docdir + n)
		return client.put(`${ossFolderGDKDocs}/` + n, docdir + n)
	}))
	console.log("上传完成", docdir, list)
})

gulp.task('buildapi', buildApi)
gulp.task('gendoc', genDoc)

gulp.task("build", gulp.series("buildapi", "compile", "mini", "makeVersion"));
gulp.task("convdoc", async () => {
	execon("../docs/", () => exec("gitbook build"))
});
gulp.task('builddoc', gulp.series("gendoc", "convdoc"))

gulp.task("publish", gulp.series("build", "uploadVersion"));
gulp.task("pubOne", gulp.series("publish", "pubNext", "pubPub", "verifyUpload"))
gulp.task("pubDocs", gulp.series("builddoc", "uploadDocs"))