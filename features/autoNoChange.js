(function() {
	'use strict';
	const LNT = window.LNT || (window.LNT = {});
	LNT.autoNoChange = {
		hasRecentVerification() {
			const dateCell = LNT.dom.getDateCell()
			if (!dateCell) {
				return false
			}
			const dateText = dateCell.textContent.trim()
			if (!dateText) {
				return false
			}
			const createdDate = new Date(dateText)
			const ageDays =
				(Date.now() - createdDate.getTime()) /
				(1000 * 60 * 60 * 24);

			if (ageDays <= 1) {
				return true;
			}
		}
	}

})()