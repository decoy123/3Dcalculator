'use strict';

class Listener{
	constructor() {
		// 対象エレメントを取得
		this.element = document.getElementById("stage");

		// ------------------------------------------------------------
		// イベントのリッスンを開始する
		// ------------------------------------------------------------
		// マウス移動すると実行されるイベント
		this.element.addEventListener("mousemove", this.MouseMoveFunc, false);
		// マウスのボタンを押すと実行されるイベント
		this.element.addEventListener("mousedown", this.MouseDownFunc, false);
		// マウスのボタンを離すと実行されるイベント
		this.element.addEventListener("mouseup", this.MouseUpFunc, false);
		// クリックすると実行されるイベント
		this.element.addEventListener("click", this.MouseClickFunc, false);
		// ダブルクリックすると実行されるイベント
		this.element.addEventListener("dblclick", this.MouseDoubleClickFunc, false);
		// キーを押すと実行されるイベント
		document.addEventListener("keydown", this.KeyDownFunc, false);
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
			var objs = [];

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
		var keyDownUrl = "Calculate";
		var methodType = "post";
		switch (e.key){
		case "F1":
			// MC
			event.preventDefault();
			sendPost();
			break;
		case "F2":
			// MR
			event.preventDefault();
			sendPost();
			break;
		case "F3":
			// M+
			event.preventDefault();
			sendPost();
			break;
		case "F4":
			// M-
			event.preventDefault();
			sendPost();
			break;
		case "F5":
			// MS
			event.preventDefault();
			sendPost();
			break;
		case "F6":
			// M▽
			event.preventDefault();
			sendPost();
			break;
		case "Delete":
			event.preventDefault();
			sendPost();
			if (e.shiftKey){
				// CE
				event.preventDefault();
				calculator.displayValue();
			} else{
				// C
				event.preventDefault();
				calculator.displayValue();
			}
			break;
		case "Backspace":
			// Backspace
			event.preventDefault();
			calculator.displayValue();
			break;
		case "/":
			// ÷
			event.preventDefault();
			sendPost();
			break;
		case "7":
			// 7
			event.preventDefault();
			calculator3D.entryValue = inputNumber(calculator3D.entryValue, e.key);
			calculator.displayValue();
			break;
		case "8":
			// 8
			event.preventDefault();
			calculator3D.entryValue = inputNumber(calculator3D.entryValue, e.key);
			calculator.displayValue();
			break;
		case "9":
			// 9
			event.preventDefault();
			calculator3D.entryValue = inputNumber(calculator3D.entryValue, e.key);
			calculator.displayValue();
			break;
		case "*":
			// ×
			event.preventDefault();
			sendPost();
			break;
		case "4":
			// 4
			event.preventDefault();
			calculator3D.entryValue = inputNumber(calculator3D.entryValue, e.key);
			calculator.displayValue();
			break;
		case "5":
			// 5
			event.preventDefault();
			calculator3D.entryValue = inputNumber(calculator3D.entryValue, e.key);
			calculator.displayValue();
			break;
		case "6":
			// 6
			event.preventDefault();
			calculator3D.entryValue = inputNumber(calculator3D.entryValue, e.key);
			calculator.displayValue();
			break;
		case "-":
			// -
			event.preventDefault();
			sendPost();
			break;
		case "1":
			// 1
			event.preventDefault();
			calculator3D.entryValue = inputNumber(calculator3D.entryValue, e.key);
			calculator.displayValue();
			break;
		case "2":
			// 2
			event.preventDefault();
			calculator3D.entryValue = inputNumber(calculator3D.entryValue, e.key);
			calculator.displayValue();
			break;
		case "3":
			// 3
			event.preventDefault();
			calculator3D.entryValue = inputNumber(calculator3D.entryValue, e.key);
			calculator.displayValue();
			break;
		case "+":
			// +
			event.preventDefault();
			sendPost();
			break;
		case "@":
			// ±
			event.preventDefault();
			sendPost();
			break;
		case "0":
			// 0
			event.preventDefault();
			calculator3D.entryValue = inputNumber(calculator3D.entryValue, e.key);
			calculator.displayValue();
			break;
		case ".":
			// .
			event.preventDefault();
			if (calculator3D.entryValue.indexOf('.') === -1){
				calculator3D.entryValue = inputNumber(calculator3D.entryValue, e.key);
				calculator.displayValue();
			}
			break;
		case "=":
		case "Enter":
			// =
			event.preventDefault();
			sendPost();
			break;
		}
		console.log(e.key);
		console.log(e.shiftKey);

		/* 表示するデータ作成 */
		function inputNumber(entryValue, number) {
			var resultNumber;
			if (String(number) === "0"){
				if (String(entryValue) === "0"){
					resultNumber = String(number);
				} else {
					resultNumber = String(entryValue) + String(number);
				}
			} else {
				if (String(entryValue) === "0"){
					resultNumber = String(number);
				} else {
					resultNumber = String(entryValue) + String(number);
				}
			}
			return resultNumber;
		}

		/* サーブレットへPOST送信 */
		function sendPost() {
			/* ajaxでPOST送信 */
			$.ajax({
				url: keyDownUrl,
				type: methodType,
// dataType: 'json',
				data : {
					"KEY": e.key,
					"SHIFT_KEY": e.shiftKey,
					"FORMULA_ARRAY": calculator3D.formulaArray
				}
			}).then(doneAjax(data),
					failAjax(jqXHR, textStatus, errorThrown)
			);
		}
		/* ajaxがdoneの時の処理 */
		function doneAjax(data){
			console.log("success");
		}
		/* ajaxがfailの時の処理 */
		function failAjax(jqXHR, textStatus, errorThrown){
			console.log("error");
		}
	}
}