(function() {
    'use strict';

    const LNT = window.LNT || (window.LNT = {});

    const API_BASE = 'http://127.0.0.1:5555/api/honeypot';
    const TIMEOUT_MS = 8000;

    function createEl(tag, className, text) {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (text) el.textContent = text;
        return el;
    }

    // "8775223777" -> "877-522-3777" (leaves anything else untouched)
    function formatNumber(raw) {
        const digits = String(raw || '').replace(/\D/g, '').slice(-10);
        if (digits.length !== 10) return String(raw || '');
        return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }

    function render(body, data) {
        body.replaceChildren();

        if (!data || !data.found || !data.matches || data.matches.length === 0) {
            body.append(createEl('div', 'lnt-hp-meta', 'No honeypot transcript is available.'));
            return;
        }

        for (const match of data.matches) {
            const item = createEl('div', 'lnt-hp-item');
            item.append(
                createEl('div', 'lnt-hp-meta', `${match.callTimestamp} · call from ${formatNumber(match.aNumber)}`),
                createEl('div', 'lnt-hp-text', match.transcript)
            );
            body.append(item);
        }
    }

    LNT.hpTranscript = {

        // Throws on any failure so run() can tell "server error" apart from "found: false".
        async lookup(number) {
            const cleanNumber = String(number || '').replace(/\D/g, '');
            if (!cleanNumber) throw new Error("couldn't read a phone number");

            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

            try {
                const response = await fetch(`${API_BASE}/${cleanNumber}`, {
                    signal: controller.signal
                });
                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const data = await response.json();
                console.log('[YALnT][Honeypot] Lookup result:', data);
                return data;
            } catch (error) {
                if (error.name === 'AbortError') throw new Error('request timed out');
                throw error;
            } finally {
                clearTimeout(timer);
            }
        },

        // Same shape as LNT.numberLookup.run: fetch + fill our box.
        async run(number) {
            const body = LNT.ui.refs.hpBody;
            if (!body) return; // box doesn't exist when the toggle is off

            body.textContent = 'Loading transcripts...';
            try {
                render(body, await this.lookup(number));
            } catch (error) {
                console.error('[YALnT][Honeypot] Lookup failed:', error);
                body.textContent = `Server error: ${error.message}`;
            }
        },

        // Temporary test using our known-good callback number.
        async test() {
            return this.lookup('8887555506');
        }
    };

})();