(function () {
	'use strict';
	const LNT = window.LNT || (window.LNT = {});

	LNT.autoCall = {
		dial() {
			const number = LNT.dom.getPhoneNumber()
			window.location.href = `tel:${number}`
		},
	}

})()