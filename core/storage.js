(function(){

  'use strict';
	const LNT = window.LNT || (window.LNT = {});

  LNT.storage = {
    get(key) {
        return localStorage.getItem(key);
    },

    set(key, value) {
        localStorage.setItem(key, value);
    },
    
	};
})();