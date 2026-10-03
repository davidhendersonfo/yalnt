// dom.js finds and stores element references and captures page data and stores into state. 

(function() {
    'use strict';

    const LNT = window.LNT || (window.LNT = {});
    LNT.ui = {
        refs: {},

        injectStyles() {
            if (document.getElementById('lnt-styles')) return;
            const style = document.createElement('style');
            style.id = 'lnt-styles';
            // in injectStyles(), replace the CSS text with:
            style.textContent = `
                .lnt-container { display: flex; gap: 12px; justify-content: center; align-items: flex-start; margin: 12px 0; }
                .lnt-box { border: 1px solid #ddd; border-radius: 4px; padding: 10px 14px; background: #fafafa; }
                .lnt-lookup { flex: 1 1 0; min-width: 260px; max-width: 520px; }
                .lnt-box-title { font-weight: bold; margin-bottom: 6px; }
                .lnt-line { margin: 0 0 6px; }
                .lnt-check { margin-right: 14px; cursor: pointer; }

                .lnt-lookup a { overflow-wrap: anywhere; }
                .lnt-result { margin-bottom: 10px; }
                .lnt-result-title { font-weight: bold; }
                .lnt-result-domain { color: #28a745; font-size: 12px; }
                .lnt-result-snippet { color: #555; font-size: 12px; }
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
        // new helper, next to makeCheckbox
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
                body
            };
        },

        build() {
            if (document.getElementById('lnt-container')) return; // don't build twice
            this.injectStyles();

            const container = document.createElement('div');
            container.id = 'lnt-container';
            container.className = 'lnt-container';

            // in build(): swap the phoneBox setup for makeBox, and add the lookup box
            const phone = this.makeBox('lnt-phone', 'Phone');
            const lookup = this.makeBox('lnt-lookup', 'Number Lookup');

            const line1 = document.createElement('div');
            line1.className = 'lnt-line';
            line1.textContent = 'Phone box';

            const autoCall = this.makeCheckbox('lnt-auto-call', 'Auto Call');
            const noChange = this.makeCheckbox('lnt-no-change', 'No Change');

            phone.body.append(line1, autoCall.label, noChange.label);
            container.append(phone.box, lookup.box); // phone first = on the left
            
            const header = LNT.dom.$('h1');
            header.after(container);

            // keep references so draw() can update things later
            this.refs = {
                container,
                line1,
                phoneBody: phone.body,
                lookupBody: lookup.body,
                autoCall: autoCall.input,
                noChange: noChange.input,
            };
        },

        draw() {
            // later: this.refs.line1.textContent = LNT.state.something;
        }
    };
})();