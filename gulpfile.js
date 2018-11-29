var gulp = require('gulp');
// var uglifyjs = require("gulp-uglify");//压缩混淆js
// var rename = require('gulp-rename')//文件重命名
var fs = require("fs")
var child_process = require("child_process")
const OSS = require("ali-oss");
const path = require("path")

const execon = (dir, fn) => {
	const pwd = path.resolve(process.cwd())
	// try {
	process.chdir(dir)
	fn()
	// } catch (e) {
	// 	console.error(e)
	// } finally {
	process.chdir(pwd)
	// }
}
const exec = (cmd) => {
	console.log(`-[exec] ${process.cwd()}$ ${cmd}`)
	let buf = child_process.spawnSync(cmd)
	console.log(buf.stdout.toString())
	console.log(buf.stderr.toString())
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

gulp.task("updateSLIB", async function () {

	let client = getOssClient();

	await client.get("libs/slib.d.ts", "./libs/slib.d.ts")
	console.log("更新完成 slib.d.ts")

})

gulp.task("comp", async () => {

	execon(".", () => {
		execon("./framework", () => exec("tsc"))
		// let gdk = fs.readFileSync("./dist/gdk.d.ts", "utf8")
		// gdk += "\ndeclare var gdk: GDK.UserAPI;"
		// fs.writeFileSync("./dist/gdk.d.ts", gdk)

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

gulp.task("publish", gulp.series("comp", "uploadVersion"));