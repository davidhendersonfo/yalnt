(function () {
    'use strict';

    const LNT = window.LNT || (window.LNT = {});
    unsafeWindow.LNT = LNT;

    const BASE_URL = 'http://127.0.0.1:5555/';

    const MODULES = [
        'core/config.js',
        'core/storage.js',
        'core/state.js'
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
            console.log(`📦 Loading ${file}`);

            await fetchAndEval(
                `${BASE_URL}${file}?v=${Date.now()}`
            );

            console.log(`✅ Loaded ${file}`);
        }
    }

    LNT.bootstrap = {
        async init() {
            console.log('🚀 LNT starting');

            await loadModulesSequential();

            console.log('Config:', LNT.config);
            console.log('Storage:', LNT.storage);
            console.log('State:', LNT.state);

            this.initializeFeatures();

            console.log('✅ LNT ready');
        },

        initializeFeatures() {
            // LNT.noChange?.init();
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