(function () {
    'use strict';

    const LNT = window.LNT || (window.LNT = {});
    unsafeWindow.LNT = LNT;

    const BASE_URL = 'http://127.0.0.1:5555/';

    const MODULES = [
        'features/autoNoChange.js',
        'core/config.js',
        'core/storage.js',
        'core/state.js',

        'utils/dom.js',
        
        'features/form.js',
        'features/hotkey.js',
        'features/autocall.js',
        

        'data/presets.js',
    ];

    function fetchAndEval(url) {
        return new Promise((resolve, reject) => {
            if (typeof GM_xmlhttpRequest !== 'function') {
                reject(
                    new Error(
                        'GM_xmlhttpRequest is not available'
                    )
                );
                return;
            }

            GM_xmlhttpRequest({
                method: 'GET',
                url,

                onload(res) {
                    try {
                        eval(res.responseText);
                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                },

                onerror(err) {
                    reject(err);
                }
            });
        });
    }

    async function loadModulesSequential() {
        for (const file of MODULES) {

            await fetchAndEval(
                `${BASE_URL}${file}?v=${Date.now()}`
            );
        }
    }

    LNT.bootstrap = {
        async init() {

            await loadModulesSequential();

            LNT.dom.updateStateFromPage();

            this.initializeFeatures();

            console.log('✅ LNT ready');
        },

        initializeFeatures() {
            //check if nochange before any other features
            if (LNT.autoNoChange.hasRecentVerification()) {
                setTimeout(()=> {
                    console.log('clicking')
                    LNT.dom.getNoChangeButton().click()
                },1000)
                return
            }
            LNT.autoCall?.dial();
            LNT.hotkey?.bind();
            // LNT.autoCall?.init();
            // LNT.hotkeys?.init();
        }
    };

    async function start() {
        try {
            await LNT.bootstrap.init();
        } catch (err) {
            console.error(
                '❌ Bootstrap failed:',
                err
            );
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            start
        );
    } else {
        start();
    }
})();