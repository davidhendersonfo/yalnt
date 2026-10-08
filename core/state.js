(function() {
	//DEPENDANCIES: CONFIG.JS

	'use strict';
	const LNT = window.LNT || (window.LNT = {});

	LNT.state = {
		currentNumber: null,
		autoCallEnabled: LNT.storage.get(
			LNT.config.storageKeys.autoCall
		) === 'true',
		autoNoChangeEnabled: LNT.storage.get(
			LNT.config.storageKeys.autoNoChange
		) === 'true',
		hpTranscriptEnabled: LNT.storage.get(
			LNT.config.storageKeys.hpTranscript
		) === 'true',
		observer: null,
		hotkeysBound: false,
		queue: localStorage.getItem(LNT.config.storageKeys.queue) || 'general',

		setQueue(queue) {
			this.queue = queue;
			LNT.storage.set(LNT.config.storageKeys.queue, queue)
		},
		setAutoCall(enabled) {
			this.autoCallEnabled = enabled;
			LNT.storage.set(LNT.config.storageKeys.autoCall, String(enabled));
		},

		setAutoNoChange(enabled) {
			this.autoNoChangeEnabled = enabled;
			LNT.storage.set(LNT.config.storageKeys.autoNoChange, String(enabled));
		},
		setHpTranscript(enabled) {
			this.hpTranscriptEnabled = enabled;
			LNT.storage.set(LNT.config.storageKeys.hpTranscript, String(enabled));
		},
	};

})();