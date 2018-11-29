var gulp = require('gulp');
// var uglifyjs = require("gulp-uglify");//压缩混淆js
// var rename = require('gulp-rename')//文件重命名
var fs = require("fs")
var child_process = require("child_process")
const OSS = require("ali-oss");

gulp.task("updateSLIB", function () {
	//将刚刚发布的版本上传到oss
	let accessKeyId = "LTAIkAAYUCjCkAzb"
	let accessKeySecret = "fAmMWBJ85tt2DoWpIfuovPLQj8ZIGJ"
	let bucket = "mrglee-it"
	let region = "oss-cn-hangzhou"
	let osspath = "libs/"

	console.log(OSS)
	let client = new OSS({
		region: region,//https://help.aliyun.com/document_detail/31837.html?spm=a2c4g.11186623.2.9.vbe29U
		//云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
		accessKeyId: accessKeyId,
		accessKeySecret: accessKeySecret,
		bucket: bucket
	})

	client.get(osspath + "slib.d.ts")

	client.put(osspath + "slib.d.ts", "./libs/slib.d.ts").then(() => {
		console.log("更新完成 slib.d.ts")
	}).catch((err) => {
		console.error(err)
	})

})

