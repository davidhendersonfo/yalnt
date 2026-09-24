(function() {
	'use strict';
	const LNT = window.LNT || (window.LNT = {});

	LNT.form = {
		setSelectizeByValue(selectize, value) {
			if (!selectize) return;
			setTimeout(() => selectize.setValue(value), 10)
		},
		searchAndSelect(name) {
			return new Promise((resolve) => {
				const el = LNT.dom.getSelectize('select-caller')
				const industryEl = LNT.dom.getSelectize('select-industry') // adjust id if different
				el.focus()
				el.$control_input[0].value = name

				const onLoad = () => {
					el.off('load', onLoad)
					const item = el.search(name).items[0]
					if (item) {
						el.setValue(item.id)
					}

					// wait for the site's own auto-populate to actually land
					const onIndustryChange = () => {
						industryEl.off('change', onIndustryChange)
						setTimeout(() => {
							el.close()
							el.blur()
							resolve()
						}, 0)
					}
					industryEl.on('change', onIndustryChange)

					// fallback in case industry never changes for this caller
					setTimeout(() => {
						industryEl.off('change', onIndustryChange)
						el.close()
						el.blur()
						resolve()
					}, 5000)
				}
				el.on('load', onLoad)

				el.onSearchChange(name)
			})
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
				defaultFields.includes(id) ?
					this.setSelectizeByValue(
						selectize,
						'NA'
					) :
					selectize?.clear()
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
		async applyPreset(presetName) {
			const preset =
				LNT.presets[
					LNT.state.queue
				]?.[presetName];

			if (!preset) {
				console.warn(`${presetName} not found`);
				return;
			}

			this.reset()
			console.log('reset')
			//translate for selectize names
			const fields = {
				'call_status': preset.status,
				'call_connection': preset.connection,
				'select-purpose': preset.purpose,
				'select-notes': preset.notes,
			}
			if (preset.name) {
				console.log('starting searchAndSelect')
				await this.searchAndSelect(preset.name)
			}
			console.log('finished searchAndSelect')
			for (const field in fields) {
				console.log('starting fields loop')
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