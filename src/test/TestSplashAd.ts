
{
	let ad = gdk.createSplashAd({
	});
	ad.onClose(function (ret) {
		console.log(ret);
	})
	ad.load().then(() => {
		console.log("loaded")
		ad.show().then(() => {
			console.log("shown")
		}).catch((reason) => {
			console.error(reason);
		})
	}).catch((reason) => {
		console.error(reason)
	})
}