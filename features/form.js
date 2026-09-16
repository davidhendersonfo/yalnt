(function(){
	'use strict';
	const LNT = window.LNT || (window.LNT = {});
	
	LNT.form = {
		setSelectizeByValue(selectize, value) {
			if (!selectize) return;
			setTimeout(() => selectize.setValue(value), 10)
		},
		reset() {
			const selectFields = [
				'call_status',
				'call_connection',

				'select-purpose',
				'select-caller',
				'select-industry',

				'select-notes',
			]
			//fields that need to be set to NA
			const defaultFields = [
				'call_status',
				'call_connection',
				'select-notes',
			]
			// deal with drop downs
			selectFields.forEach(id => {
				const selectize = 
					LNT.dom.getSelectize(id);
				defaultFields.includes(id)
					? this.setSelectizeByValue(
							selectize,
							'NA'
					)
					: selectize?.clear()
			})
			//deal with text area
			LNT.dom.getNotesTextarea().value = ''
		},
		submit() {
			LNT.dom.getSubmitButton().click()
		},
		skip() {
			LNT.dom.getSkipButton().click()
		},
		noChange() {
			LNT.dom.getNoChangeButton().click()
		},
		applyPreset(presetName) {
			const preset = 
				LNT.presets[
					LNT.state.queue
				]?.[presetName];

			if (!preset) {
				console.warn(`${presetName} not found`);
				return;
			}

			this.reset()
			//translate for selectize names
			const fields = {
				'call_status': preset.status,
				'call_connection': preset.connection,
				'select-purpose': preset.purpose,
				'select-notes': preset.notes,
			}

			for (const field in fields) {
				if (fields[field] !== undefined) {
					this.setSelectizeByValue(
						LNT.dom.getSelectize(field),
						fields[field]
					)
				}
			}
			if (preset.textNotes) {
				LNT.dom.getNotesTextarea().value = preset.textNotes
			}
		},
	}

})()