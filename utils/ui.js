// ui.js builds the boxes, injects styles, and stores element references for the features to fill in.

(function() {
    'use strict';

    const LNT = window.LNT || (window.LNT = {});
    LNT.ui = {
        refs: {},

        injectStyles() {
            if (document.getElementById('lnt-styles')) return;
            const style = document.createElement('style');
            style.id = 'lnt-styles';
            style.textContent = `
                .lnt-container { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; align-items: stretch; margin: 12px 0; }
                .lnt-box { border: 1px solid #ddd; border-radius: 4px; padding: 10px 14px; background: #fafafa; }
                .lnt-box-title { font-weight: bold; margin-bottom: 6px; white-space: nowrap; }
                .lnt-box-query { margin-left: 14px; }
                .lnt-line { margin: 0 0 6px; }
                .lnt-check { margin-right: 14px; cursor: pointer; }

                .lnt-lookup { flex: 1 1 0; min-width: 260px; max-width: 1100px; }
                .lnt-lookup a { overflow-wrap: anywhere; }

                /* body: cards share the row evenly, footer takes its own full row */
                .lnt-lookup > div:last-child {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px 16px;
                }
                .lnt-lookup > div:last-child > :not(.lnt-result) { flex: 0 0 100%; }

                .lnt-result { flex: 1 1 240px; min-width: 0; margin-bottom: 0; }
                .lnt-result-title { font-weight: bold; }
                .lnt-result-domain { color: #28a745; font-size: 12px; }
                .lnt-result-snippet {
                    color: #555; font-size: 12px; line-height: 1.35;
                    max-height: 5.4em; /* 4 lines */
                    overflow: hidden;  /* clipped silently, no ellipsis */
                }

                /* honeypot transcripts: shown in full, body scrolls if there are many matches */
                /* contain: size = this box's content doesn't count toward row height, so the
                   row stays as tall as the lookup box and this one stretches to match it */
                .lnt-hp {
                    flex: 1 1 0; min-width: 260px; max-width: 520px; min-height: 6em;
                    contain: size;
                    display: flex; flex-direction: column;
                }
                .lnt-hp > div:last-child { flex: 1 1 0; min-height: 0; overflow-y: auto; }
                .lnt-hp-item { margin-bottom: 8px; }
                .lnt-hp-item:last-child { margin-bottom: 0; }
                .lnt-hp-meta { color: #555; font-size: 12px; }
                .lnt-hp-text { font-size: 13px; line-height: 1.35; overflow-wrap: anywhere; }
            `;
            document.head.appendChild(style);
        },

        makeCheckbox(id, labelText) {
            const label = document.createElement('label');
            label.className = 'lnt-check';
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = id;
            label.append(input, ' ' + labelText);
            return {
                label,
                input
            };
        },

        makeBox(extraClass, title) {
            const box = document.createElement('div');
            box.className = `lnt-box ${extraClass}`;

            const heading = document.createElement('div');
            heading.className = 'lnt-box-title';
            heading.textContent = title;

            const body = document.createElement('div');
            box.append(heading, body);
            return {
                box,
                heading,
                body
            };
        },

        build() {
            if (document.getElementById('lnt-container')) return; // don't build twice
            this.injectStyles();

            const container = document.createElement('div');
            container.id = 'lnt-container';
            container.className = 'lnt-container';

            const phone = this.makeBox('lnt-phone', 'Phone');
            const lookup = this.makeBox('lnt-lookup', 'Number Lookup');

            // "Results for <number>" lives inside the lookup heading, same line as the title
            const lookupQuery = document.createElement('span');
            lookupQuery.className = 'lnt-box-query';
            lookup.heading.append(lookupQuery);

            const line1 = document.createElement('div');
            line1.className = 'lnt-line';
            line1.textContent = 'Phone box';

            const autoCall = this.makeCheckbox('lnt-auto-call', 'Auto Call');
            const noChange = this.makeCheckbox('lnt-no-change', 'No Change');
            const hpTranscript = this.makeCheckbox('lnt-hp-transcript', 'Hp Transcripts');

            autoCall.input.checked = LNT.state.autoCallEnabled;
            noChange.input.checked = LNT.state.autoNoChangeEnabled;
            hpTranscript.input.checked = LNT.state.hpTranscriptEnabled;

            autoCall.input.addEventListener('change', e => LNT.state.setAutoCall(e.target.checked));
            noChange.input.addEventListener('change', e => LNT.state.setAutoNoChange(e.target.checked));
            hpTranscript.input.addEventListener('change', e => LNT.state.setHpTranscript(e.target.checked));

            phone.body.append(line1, autoCall.label, noChange.label, hpTranscript.label);
            container.append(phone.box, lookup.box); // phone first = on the left

            // honeypot box only exists when the toggle was on at page load
            let hp = null;
            if (LNT.state.hpTranscriptEnabled) {
                hp = this.makeBox('lnt-hp', 'Honeypot Transcripts');
                container.append(hp.box);
            }

            const header = LNT.dom.$('h1');
            header.after(container);

            // keep references so features can update things later
            this.refs = {
                container,
                line1,
                phoneBody: phone.body,
                lookupBody: lookup.body,
                lookupQuery,
                hpBody: hp ? hp.body : null,
                autoCall: autoCall.input,
                noChange: noChange.input,
                hpTranscript: hpTranscript.input,
            };
        },

        // setLookupQuery(number) {
        //     this.refs.lookupQuery.textContent = number ? `Results for ${number}` : '';
        // },

        draw() {
            // later: this.refs.line1.textContent = LNT.state.something;
        }
    };
})();