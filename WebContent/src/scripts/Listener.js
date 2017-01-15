'use strict';

class Listener{
	constructor() {
		/* 対象エレメントを取得 */
		this.element = document.getElementById('stage');

		// ------------------------------------------------------------
		// イベントのリッスンを開始する
		// ------------------------------------------------------------
		// マウス移動すると実行されるイベント
		this.element.addEventListener('mousemove', this.MouseMoveFunc, false);
		// マウスのボタンを押すと実行されるイベント
		this.element.addEventListener('mousedown', this.MouseDownFunc, false);
		// マウスのボタンを離すと実行されるイベント
		this.element.addEventListener('mouseup', this.MouseUpFunc, false);
		// クリックすると実行されるイベント
		this.element.addEventListener('click', this.MouseClickFunc, false);
		// ダブルクリックすると実行されるイベント
		this.element.addEventListener('dblclick', this.MouseDoubleClickFunc, false);
		// キーを押すと実行されるイベント
		document.addEventListener('keydown', this.KeyDownFunc, false);
	}

	// ------------------------------------------------------------
	// マウスを移動すると実行される関数
	// ------------------------------------------------------------
	MouseMoveFunc(e) {
		if (e.target == calculator3D.renderer.domElement) {
			// マウス座標2D変換
			var rect = e.target.getBoundingClientRect();
			calculator3D.mouse.x = e.clientX - rect.left;
			calculator3D.mouse.y = e.clientY - rect.top;

			// マウス座標3D変換 width（横）やheight（縦）は画面サイズ
			calculator3D.mouse.x =  (calculator3D.mouse.x / calculator3D.width) * 2 - 1;
			calculator3D.mouse.y = -(calculator3D.mouse.y / calculator3D.height) * 2 + 1;

			// マウスベクトル
			calculator3D.vector = new THREE.Vector3(
					calculator3D.mouse.x,
					calculator3D.mouse.y,
					1
			);

			// vector はスクリーン座標系なので, オブジェクトの座標系に変換
			calculator3D.vector.unproject(calculator3D.camera);

			// 始点, 向きベクトルを渡してレイを作成
			calculator3D.ray = new THREE.Raycaster(
					calculator3D.camera.position,
					calculator3D.vector.sub(calculator3D.camera.position).normalize()
			);
		}
	}

	// ------------------------------------------------------------
	// マウスのボタンを押すと実行される関数
	// ------------------------------------------------------------
	MouseDownFunc(e) {
		if (e.target == calculator3D.renderer.domElement) {
			let objs = [];

			// クリック対象取得
			objs = calculator3D.ray.intersectObjects(calculator3D.scene.children);

			// クリックしていたら処理を行う
			if (objs.length > 0){
// console.log(mouse);
			}
		}
	}

	// ------------------------------------------------------------
	// マウスのボタンを離すと実行される関数
	// ------------------------------------------------------------
	MouseUpFunc(e) {

	}

	// ------------------------------------------------------------
	// クリックすると実行される関数
	// ------------------------------------------------------------
	MouseClickFunc(e) {

	}

	// ------------------------------------------------------------
	// ダブルクリックすると実行される関数
	// ------------------------------------------------------------
	MouseDoubleClickFunc(e) {

	}

	// ------------------------------------------------------------
	// キーを押すと実行される関数
	// ------------------------------------------------------------
	KeyDownFunc(e) {
		const that = this;
		const numberRegExp = /^[-]?[0-9]+(\.[0-9]+)?$/;
		event.preventDefault();
		if (calculator3D.entryValue === 'ERROR'){
			/* ERRORの場合削除だけを受け付ける */
			if (e.key === "Delete"){
				inputDelete(e)
			}
		} else {
			inputKey(e)
		}

		/* 以下function */
		function inputDelete(e){
			if (e.shiftKey){
				// CE
				calculator3D.entryValue = '0';
				calculator.displayArea(calculator.VALUE_AREA, calculator.valueMaterial);
			} else{
				// C
				calculator3D.entryValue = '0';
				calculator.displayArea(calculator.VALUE_AREA, calculator.valueMaterial);
			}
		}

		function inputKey(e){
			switch (e.key){
			case "F1":
				// MC
				getHistory();
				break;
			case "F2":
				// MR
				break;
			case "F3":
				// M+
				break;
			case "F4":
				// M-

				break;
			case "F5":
				// MS
				break;
			case "F6":
				// M▽
				break;
			case "Delete":
				inputDelete(e)
				break;
			case "Backspace":
				// Backspace
				calculator3D.entryValue =
					calculator3D.entryValue.substring(0, calculator3D.entryValue.length - 1);
				calculator.displayArea(calculator.VALUE_AREA, calculator.valueMaterial);
				break;
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
			case ".":
				inputNumber(e.key);
				break;
			case "/":
			case "*":
			case "-":
			case "+":
				inputOperator(e.key);
				break;
			case "@":
				// ±
				inputPlusMinus();
				break;
			case "=":
			case "Enter":
				// =
				if (numberRegExp.test(calculator3D.entryValue) === true &&
						calculator3D.formulaArray.length > 1){
					calculator3D.formulaArray.push(calculator3D.entryValue);
					sendFormula();
				}
				break;
			}
			console.log(e.key);
			console.log(e.shiftKey);

			/* 数字入力 */
			function inputNumber(key) {
				if (calculator3D.entryValue === '0'){
					if (key === '0'){
						/* 処理無し */
					} else if (key === '.'){
						calculator3D.entryValue = calculator3D.entryValue + key;
					} else {
						calculator3D.entryValue = key;
					}
				} else if (calculator3D.entryValue === ''){
					if (key === '.'){
						calculator3D.entryValue = '0.';
					} else {
						calculator3D.entryValue = calculator3D.entryValue + key;
					}
				} else {
					if (key === '.'){
						if (calculator3D.entryValue.indexOf('.') === -1){
							calculator3D.entryValue = calculator3D.entryValue + key;
						} else {
							/* 処理無し */
						}
					} else {
						calculator3D.entryValue = calculator3D.entryValue + key;
					}
				}
				calculator.displayArea(calculator.VALUE_AREA, calculator.valueMaterial);
			}

			/* 算術演算子入力 */
			function inputOperator(key){
				if (numberRegExp.test(calculator3D.entryValue) === true){
					calculator3D.formulaArray.push(calculator3D.entryValue);
					calculator3D.formulaArray.push(key);
					calculator.displayArea(calculator.FORMULA_AREA, calculator.formulaMaterial);
					calculator3D.entryValue = '';
					calculator.displayArea(calculator.VALUE_AREA, calculator.valueMaterial);
				} else {
					if (calculator3D.entryValue === '' &&
							calculator3D.formulaArray.length > 0){
						calculator3D.formulaArray[calculator3D.formulaArray.length - 1] = key;
						calculator.displayArea(calculator.FORMULA_AREA, calculator.formulaMaterial);
					}
				}
			}

			/* ±入力 */
			function inputPlusMinus(){
				if (numberRegExp.test(calculator3D.entryValue) === true){
					if (calculator3D.entryValue > 0){
						calculator3D.entryValue = '-' + calculator3D.entryValue;
						calculator.displayArea(calculator.VALUE_AREA, calculator.valueMaterial);
					} else if (calculator3D.entryValue < 0){
						calculator3D.entryValue = calculator3D.entryValue.slice(1);
						calculator.displayArea(calculator.VALUE_AREA, calculator.valueMaterial);
					}
				}
			}

			/* サーブレットへ計算式をPOST送信 */
			function sendFormula() {
				const url = 'Calculate';
				const methodType = 'POST';
				/* ajaxでPOST送信 */
				$.ajax({
					url: url,
					type: methodType,
					dataType: 'text',
					data : {
						'KEY': e.key,
						'SHIFT_KEY': e.shiftKey,
						'FORMULA_ARRAY': calculator3D.formulaArray
					}
				}).then(
					function(result){
						doneFormula(result);
					},
					function(){
						failFormula();
					}
				);
				/* sendFormulaがdoneの時の処理 */
				function doneFormula(result){
					console.log(result);
					calculator3D.formulaArray = [];
					calculator.displayArea(calculator.FORMULA_AREA, calculator.formulaMaterial);
					calculator3D.entryValue = result;
					calculator.displayArea(calculator.VALUE_AREA, calculator.valueMaterial);
				}
				/* sendFormulaがfailの時の処理 */
				function failFormula(){
					calculator3D.formulaArray.pop();
				}
			}

			/* サーブレットから計算履歴を取得 */
			function getHistory() {
				const url = 'GetHistory';
				const methodType = 'POST';
				/* ajaxでPOST送信 */
				$.ajax({
					url: url,
					type: methodType,
					dataType: 'json',
					data : {
					}
				}).then(
					function(result){
						doneHistory(result);
					},
					function(){
						failHistory();
					}
				);
				/* getHistoryがdoneの時の処理 */
				function doneHistory(result){
					console.log('done');
					window.open('./src/html/History.html',
							'History',
							'width=500,height=500');
					const history = new History();
					history.displayHistory(result);
				}
				/* getHistoryがfailの時の処理 */
				function failHistory(){
					console.log('fail');
				}
			}
		}
	}
}
