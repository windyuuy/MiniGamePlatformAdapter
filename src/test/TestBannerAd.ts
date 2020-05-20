{
	let ad = gdk.createBannerAd({
		style: {
			// top: 300,
			// 如果同时又top和y，会优先使用y
			y: 100,
			height: 150,
			// width: 200,
		},
	});
	ad.onLoad(function () {
		ad.show();
	});

}