(function() {
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
        'utils/ui.js',

        'features/form.js',
        'features/hotkey.js',
        'features/autoCall.js',
        'features/numberLookup.js',



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
            // build the UI first so the toggles are always reachable
            LNT.ui.build();

            // auto no-change: only when toggled on AND the number was verified recently
            if (LNT.state.autoNoChangeEnabled && LNT.autoNoChange.hasRecentVerification()) {
                setTimeout(() => {
                    // re-check in case it was switched off during the delay
                    if (LNT.state.autoNoChangeEnabled) {
                        LNT.dom.getNoChangeButton().click();
                    } else {
                        this.startNormalFlow();
                    }
                }, 1000);
                return;
            }

            this.startNormalFlow();
        },

        startNormalFlow() {
            if (LNT.state.autoCallEnabled) LNT.autoCall.dial();
            LNT.hotkey?.bind();
            LNT.numberLookup.run(LNT.dom.getPhoneNumber());
        },
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