'use strict';

class Listener{
	constructor() {
		/* 計算履歴ダイアログに設定するid */
		this.HISTORY_DIALOG_ROOT = 'history-dialog-root';
		/* 計算履歴ダイアログに設定するidのセレクタ */
		this.HISTORY_DIALOG_ROOT_SELECTER = '#' + this.HISTORY_DIALOG_ROOT;
		/* 対象エレメントを取得 */
		this.element = document.getElementById('stage');

		/**
		 * イベントのリッスンを開始する
		 */
//		/* マウス移動すると実行されるイベント */
//		this.element.addEventListener('mousemove', this.mouseMove, false);
//		/* マウスのボタンを押すと実行されるイベント */
//		this.element.addEventListener('mousedown', this.mouseDown, false);
		/* キーを押すと実行されるイベント */
		document.addEventListener('keydown', this.KeyDown, false);
	}

	addHistoryMouse() {
		const that = this;
		/* 計算履歴ダイアログにid要素を追加 */
		$('#history-dialog').parent('div').attr('id', that.HISTORY_DIALOG_ROOT);
		/* 計算履歴ダイアログにマウスを移動するときのイベントリスナー */
		that.historyMouseEnter();
		/* 計算履歴ダイアログからマウスを移動するときのイベントリスナー */
		that.historyMouseLeave();
	}

	// ------------------------------------------------------------
	// マウスを移動すると実行される関数
	// ------------------------------------------------------------
	mouseMove(e) {
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
	mouseDown(e) {
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

	/* キーを押すと実行される関数 */
	KeyDown(e) {
		console.log(e.key);
		console.log(e.shiftKey);
		const that = this;
		const NUMBER_REG_EXP = /^[-]?[0-9]+(\.[0-9]+)?$/;
		event.preventDefault();
		if (calculator3D.entryValue === 'ERROR' ||
				calculator3D.formulaArray.indexOf('=') >= 0){
			/* ERRORの場合または計算履歴を表示している場合、削除と計算履歴表示のみを受け付ける */
			if (e.key === 'Delete'){
				inputDelete(e)
			} else if (e.key === 'F1'){
				const history = new History();
				history.getHistory();
			}
		} else {
			inputKey(e)
		}

		/* 以下function */
		function inputDelete(e){
			if (e.shiftKey){
				/* C */
				calculator3D.formulaArray = [];
				calculator.displayArea(calculator.FORMULA_AREA, calculator.formulaMaterial);
				calculator3D.entryValue = '0';
				calculator.displayArea(calculator.VALUE_AREA, calculator.valueMaterial);
			} else{
				/* CE */
				calculator3D.entryValue = '0';
				calculator.displayArea(calculator.VALUE_AREA, calculator.valueMaterial);
			}
		}

		function inputKey(e){
			switch (e.key){
			case "F1":
				/* 計算履歴 */
				const history = new History();
				history.getHistory();
				break;
			case "Delete":
				/* C または CE */
				inputDelete(e)
				break;
			case "Backspace":
				/* Backspace */
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
				/* ± */
				inputPlusMinus();
				break;
			case "=":
			case "Enter":
				/* = */
				if (NUMBER_REG_EXP.test(calculator3D.entryValue) === true &&
						calculator3D.formulaArray.length > 1){
					calculator3D.formulaArray.push(calculator3D.entryValue);
					sendFormula();
				}
				break;
			}

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
				if (NUMBER_REG_EXP.test(calculator3D.entryValue) === true){
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
				if (NUMBER_REG_EXP.test(calculator3D.entryValue) === true){
					if (calculator3D.entryValue > 0){
						calculator3D.entryValue = '-' + calculator3D.entryValue;
						calculator.displayArea(calculator.VALUE_AREA, calculator.valueMaterial);
					} else if (calculator3D.entryValue < 0){
						calculator3D.entryValue = calculator3D.entryValue.slice(1);
						calculator.displayArea(calculator.VALUE_AREA, calculator.valueMaterial);
					}
				}
			}

			/* サーブレットへ計算式を送信 */
			function sendFormula() {
				const URL = 'Calculate';
				const METHOD_TYPE = 'POST';
				const DATA_TYPE = 'text';
				$.ajax({
					url: URL,
					type: METHOD_TYPE,
					dataType: DATA_TYPE,
					data : {
						'KEY': e.key,
						'SHIFT_KEY': e.shiftKey,
						'FORMULA_ARRAY': calculator3D.formulaArray
					}
				}).then(
					function(result){
						doneSendFormula(result);
					},
					function(){
						failSendFormula();
					}
				);
				/* 通信が正常の場合の処理 */
				function doneSendFormula(result){
					console.log(result);
					calculator3D.formulaArray = [];
					calculator.displayArea(calculator.FORMULA_AREA, calculator.formulaMaterial);
					calculator3D.entryValue = result;
					calculator.displayArea(calculator.VALUE_AREA, calculator.valueMaterial);
				}
				/* 通信がエラーの場合の処理 */
				function failSendFormula(){
					calculator3D.formulaArray.pop();
					console.log('計算を行うことができません。')
				}
			}
		}
	}

	historyMouseEnter() {
		const that = this;
		/* 計算履歴ダイアログにマウスを移動するときのイベントリスナー */
		const rootElement = document.getElementById(that.HISTORY_DIALOG_ROOT)
		rootElement.removeEventListener('mouseenter', trackballControlsFalse, false);
		rootElement.addEventListener('mouseenter', trackballControlsFalse, false);

		function trackballControlsFalse() {
			/* TrackballControlsを無効化 */
			calculator3D.controls.enabled = false;
		}
	}
	historyMouseLeave() {
		const that = this;
		/* 計算履歴ダイアログからマウスを移動するときのイベントリスナー */
		const rootElement = document.getElementById(that.HISTORY_DIALOG_ROOT)
		rootElement.removeEventListener('mouseleave', trackballControlsTrue, false);
		rootElement.addEventListener('mouseleave', trackballControlsTrue, false);

		function trackballControlsTrue() {
			/* TrackballControlsを有効化 */
			calculator3D.controls.enabled = true;
		}
	}
}
