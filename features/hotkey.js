(function () {
	'use strict';
	const LNT = window.LNT || (window.LNT = {});

	LNT.hotkey = {

		bind() {
			if (LNT.state.hotKeysBound) return;

			const hotkeyPresets = {
	      general: {
	        F13: 'miscLoanScamRecording',
	        F14: 'nextAvailableAgentScam',
	        F15: 'ringForever',
	        F16: 'disconnected',
	        F17: 'busy',
	        F18: 'genericVoicemail',
	        F19: 'miscPromScamRecording',
	        F20 : 'americanTaxAdvisors',
	        F21: 'localHomeBuyer',
	        F22: 'destinationDialedDisabled',
	      },
	      tmo: {
	        F13: 'personalNumberVM',
	        F14: 'personalNumberGV',
	        F15: 'personalNumberAnswered',
	        F16: 'phoneScreening',
	        F17: 'busy'
	      },
	    };
	    document.addEventListener(
	      'keydown',
	      function (event) {
	        // queue switches
	        if (
	          event.ctrlKey &&
	          event.shiftKey
	          ) {
	          switch (event.key) {
	          case 'F13':
	            event.preventDefault()
	            event.stopPropagation()
	            LNT.state.setQueue('general')
	            return;
	          case 'F14':
	            event.preventDefault()
	            event.stopPropagation()
	            LNT.state.setQueue('tmo')
	            return;
	          }
	        }

	        if (event.key === 'F24') {
	          event.preventDefault();
	          event.stopPropagation();
	          LNT.form.submit()
	          return;
	        }
	        if (event.key === 'F23') {
	          event.preventDefault();
	          event.stopPropagation();
	          LNT.form.skip()
	          return;
	        }

	        const presetName = hotkeyPresets[LNT.state.queue]?.[event.key];

	        if (!presetName) return;

	        event.preventDefault();
	        event.stopPropagation();

	        console.log('🎯 Running preset:', presetName);

	       	LNT.form.applyPreset(presetName)
	      },
	      true
	    );
		},
	}

})()