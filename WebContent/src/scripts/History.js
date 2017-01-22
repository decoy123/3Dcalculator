'use strict';

class History{
	constructor() {

	}

	/* 計算履歴描画 */
	displayHistory(result) {
		const that = this;
		const HISTORY_ID = 'HISTORY_ID';
		const FORMULA = 'FORMULA';
		const RESULT = 'RESULT';
		const NUMBER_REG_EXP = /^[-]?[0-9]+(\.[0-9]+)?$/;
		/* 計算履歴データを削除 */
		$('#history-body').empty();
		/* 計算履歴データを描画 */
		for (const record of result){
			const historyId = record[HISTORY_ID];
			const recordFormula = record[FORMULA];
			const calculationResult = record[RESULT];
			let calculationFormula = '';
			for (const formulaElement of recordFormula){
				if (NUMBER_REG_EXP.test(formulaElement) === true &&
						formulaElement < 0){
					/* マイナス値の場合'()'を追加する */
					formulaElement = '(' + formulaElement + ')';
				}
				calculationFormula = calculationFormula + formulaElement + ' ';
			}
			/* 行を描画する */
			$('#history-body').append(
					'<tr>' +
					'<td><input type="radio" name="history_select" value="' + historyId + '"></input></td>' +
					'<td>' + calculationFormula + '</td>' +
					'<td>' + calculationResult + '</td>' +
					/* TODO 削除ボタン */
					'<td></td>' +
					'</tr>'
		    );
		}

		/* ラジオボタンのリスナーを設定する */
		const RADIO_SELECTER = 'input[name="history_select"]';
		$(RADIO_SELECTER).on('click', function() {
			const historyId = $(RADIO_SELECTER + ':checked').val();
			const URL = 'GetHistory';
			const METHOD_TYPE = 'post';
			const DATA_TYPE = 'json';
			const ONLY = 'only';
			/* 選択した計算履歴データを取得する */
			$.ajax({
				url: URL,
				type: METHOD_TYPE,
				dataType: DATA_TYPE,
				data : {
					WHERE: ONLY,
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
				calculator3D.formulaArray = record[FORMULA];
				calculator3D.formulaArray.push('=');
				calculator.displayArea(calculator.FORMULA_AREA, calculator.formulaMaterial);
				calculator3D.entryValue = record[RESULT];
				calculator.displayArea(calculator.VALUE_AREA, calculator.valueMaterial);
			}
			function failSelectHistory(){
				alert('計算履歴を電卓に表示できません。');
			}
		});

		/* 削除ボタンのリスナーを設定する */
		/* TODO ボタンのセレクタ */
		const DELETE_SELECTER = 'input[name="history_delete"]';
		$(DELETE_SELECTER).on('click', function() {
			/* TODO historyIdの値取得 */
			const historyId = $(DELETE_SELECTER + ':checked').val();
			const URL = 'DeleteHistory';
			const METHOD_TYPE = 'post';
			const DATA_TYPE = 'json';
			const ONLY = 'only';
			/* 選択した計算履歴データを取得する */
			$.ajax({
				url: URL,
				type: METHOD_TYPE,
				dataType: DATA_TYPE,
				data : {
					WHERE: ONLY,
					HISTORY_ID: historyId
				}
			}).then(
				function(data) {
					/* 通信が正常の場合の処理 */
					console.log('done!');
					doneDeleteHistory(data);
				},
				function() {
					/* 通信がエラーの場合の処理 */
					console.log('failed!');
					failDeleteHistory();
				}
			);
			function doneDeleteHistory(data){
				that.displayHistory(data);
			}
			function failDeleteHistory(){
				alert('計算履歴を削除できません。');
			}
		});

		listener.addHistoryMouse();
	}
}
