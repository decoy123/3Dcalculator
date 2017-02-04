'use strict';

class History{
	constructor() {
		this.METHOD_TYPE = 'post';
		this.DATA_TYPE = 'json';
		this.ONLY = 'only';
		this.ALL = 'all';
		this.HISTORY_BODY_SELECTOR = '#history-body';
		this.HISTORY_DIALOG_SELECTOR = '#history-dialog';
		this.RADIO_SELECTOR = 'input[name="history_select"]';
		this.DELETE_SELECTOR = 'input[name="history_delete"]';
		this.HISTORY_ID = 'HISTORY_ID';
		this.FORMULA = 'FORMULA';
		this.RESULT = 'RESULT';
		this.NUMBER_REG_EXP = /^[-]?[0-9]+(\.[0-9]+)?$/;
	}

	/* 計算履歴取得 */
	getHistory() {
		const that = this;
		const URL = 'GetHistory';
		/* ajaxでPOST送信 */
		$.ajax({
			url: URL,
			type: that.METHOD_TYPE,
			dataType: that.DATA_TYPE,
			data : {
				WHERE: that.ALL
			}
		}).then(
			/* 通信が正常の場合の処理 */
			function(result){
				doneGetHistory(result);
			},
			/* 通信がエラーの場合の処理 */
			function(){
				failGetHistory();
			}
		);
		function doneGetHistory(result){
			/* 計算履歴ダイアログを開く */
		    $(that.HISTORY_DIALOG_SELECTOR).dialog('open');
			/* 計算履歴データを計算履歴ダイアログに描画する */
			that.displayHistory(result);
		}
		function failGetHistory(){
			alert('計算履歴一覧を表示できません。');
		}
	}

	/* 計算履歴描画 */
	displayHistory(result) {
		const that = this;

		/* 計算履歴データを削除 */
		$(that.HISTORY_BODY_SELECTOR).empty();
		/* 計算履歴データを描画 */
		for (const record of result){
			const historyId = record[that.HISTORY_ID];
			const recordFormula = record[that.FORMULA];
			const calculationResult = record[that.RESULT];
			let calculationFormula = '';
			for (const formulaElement of recordFormula){
				if (that.NUMBER_REG_EXP.test(formulaElement) === true &&
						formulaElement < 0){
					/* マイナス値の場合'()'を追加する */
					formulaElement = '(' + formulaElement + ')';
				}
				calculationFormula = calculationFormula + formulaElement + ' ';
			}
			/* 行を描画する */
			$(that.HISTORY_BODY_SELECTOR).append(
					'<tr>' +
					'<td class="radio-select-history">' +
					'<input type="radio" name="history_select" value="' + historyId + '"></input>' +
					'</td>' +
					'<td>' + calculationFormula + '</td>' +
					'<td>' + calculationResult + '</td>' +
					'<td class="radio-delete-history">' +
					'<input type="radio" name="history_delete" value="' + historyId + '"></input>' +
					'</td>' +
					'</tr>'
		    );
		}

		/* 選択ボタンのリスナーを設定する */
		$(that.RADIO_SELECTOR).on('click', function() {
			const historyId = $(that.RADIO_SELECTOR + ':checked').val();
			const URL = 'GetHistory';
			/* 選択した計算履歴データを取得する */
			$.ajax({
				url: URL,
				type: that.METHOD_TYPE,
				dataType: that.DATA_TYPE,
				data : {
					WHERE: that.ONLY,
					HISTORY_ID: historyId
				}
			}).then(
				function(result){
					/* 通信が正常の場合の処理 */
					doneSelectHistory(result);
				},
				function(){
					/* 通信がエラーの場合の処理 */
					failSelectHistory();
				}
			);
			function doneSelectHistory(result){
				const record = result[0];
				calculator3D.formulaArray = record[that.FORMULA];
				calculator3D.formulaArray.push('=');
				calculator.displayArea(calculator.FORMULA_AREA, calculator.formulaMaterial);
				calculator3D.entryValue = record[that.RESULT];
				calculator.displayArea(calculator.VALUE_AREA, calculator.valueMaterial);
			}
			function failSelectHistory(){
				alert('計算履歴を電卓に表示できません。');
			}
		});

		/* 削除ボタンのリスナーを設定する */
		$(that.DELETE_SELECTOR).on('click', function() {
			const historyId = $(that.DELETE_SELECTOR + ':checked').val();
			const URL = 'DeleteHistory';
			/* 選択した計算履歴データを取得する */
			$.ajax({
				url: URL,
				type: that.METHOD_TYPE,
				dataType: that.DATA_TYPE,
				data : {
					WHERE: that.ONLY,
					HISTORY_ID: historyId
				}
			}).then(
				function(data) {
					/* 通信が正常の場合の処理 */
					doneDeleteHistory(data);
				},
				function() {
					/* 通信がエラーの場合の処理 */
					failDeleteHistory();
				}
			);
			function doneDeleteHistory(data){
				$(that.HISTORY_BODY_SELECTOR).empty();
				that.getHistory();
			}
			function failDeleteHistory(){
				alert('計算履歴を削除できません。');
			}
		});

		/* 計算履歴ダイアログ上にマウスカーソルがある場合、Three.jsのドラッグを抑止 */
		listener.addHistoryMouse();
	}
}
