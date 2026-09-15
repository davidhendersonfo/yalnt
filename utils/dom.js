// dom.js finds and stores element references and captures page data and stores into state. 

(function () {
    'use strict';

    const LNT = window.LNT || (window.LNT = {});

    LNT.dom = {
        $(selector, root = document) {
            return root.querySelector(selector);
        },

        $$(selector, root = document) {
            return Array.from(
                root.querySelectorAll(selector)
            );
        },

        getPhoneInput() {
            return this.$(
                LNT.config.selectors.phoneInput
            );
        },

        getPhoneNumber() {
            return this.getPhoneInput()?.value || null;
        },

        updateStateFromPage() {
            LNT.state.currentNumber =
                this.getPhoneNumber();
        },

        getVerificationForm() {
            return this.$(
                LNT.config.selectors.verificationForm
            );
        },

        getNoChangeButton() {
            return this.$('#noChangeBtn');
        },

        getSubmitButton() {
            return this.$(
                '#verificationForm button[type="submit"][name="submit"]'
            );
        },

        getSkipButton() {
            return this.$('#skipBtn');
        },

        getSelectize(id) {
            return this.$(`#${id}`)?.selectize || null;
        },

        getNotesTextarea() {
            return this.$(
                '#verificationForm textarea[name="notes"]'
            );
        }
    };
})();