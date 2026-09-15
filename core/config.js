(function(){

	'use strict';
	const LNT = window.LNT || (window.LNT={});

	LNT.config = {
    selectors: {
        phoneInput: 'input[name="phone"]',
        headerDisplay: '.header-display',
        verificationForm: '#verificationForm',
        submitButtons:
            'button[type="submit"], input[type="submit"]',
    },

    storageKeys: {
        autoCall: 'lnt_autocall',
        autoNoChange: 'lnt_auto_nochange',
        queue: 'lnt_queue',
    },
};
})();