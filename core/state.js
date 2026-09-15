(function(){
	//DEPENDANCIES: CONFIG.JS

	'use strict';
	const LNT = window.LNT || (window.LNT={});

	LNT.state = {
		currentNumber: null,
		autoCallEnabled: 
			LNT.storage.get(
					LNT.config.storageKeys.autoCall
				) === 'true',
		autoNoChangeEnabled: 
			LNT.storage.get(
					LNT.config.storageKeys.autoNoChange
				) === 'true',
		observer: null,
		hotkeysBound: false,
		queue: localStorage.getItem(LNT.config.storageKeys.queue) || 'general',
	};

})();