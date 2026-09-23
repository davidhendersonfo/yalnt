(function () {
	'use strict';
	const LNT = window.LNT || (window.LNT = {});
	console.log('autoCall.js loaded')
	LNT.autoCall = {
		dial() {
			console.log("auto dial firing")
			const number = LNT.dom.getPhoneNumber()
			window.location.href = `tel:${number}`
		},
	}

})()