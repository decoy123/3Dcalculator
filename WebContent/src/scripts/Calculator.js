'use strict';

class Calculator{
	constructor() {
		/* 電卓 */
		this.calculator;
		this.FORMULA_AREA = 'formula';
		this.VALUE_AREA = 'value';
		this.mainKeyGeometry = new THREE.BoxGeometry(27, 5, 20);
		this.subKeyGeometry = new THREE.BoxGeometry(15, 5, 10);
		this.initSubKeyPosition = {x: -52.5, y: 0, z: 25};
		this.initMainKeyPosition = {x: -46.5, y: 0, z: 45};
		this.subKeySpanX = 21;
		this.mainKeySpanX = 31;
		this.mainKeySpanZ = 25;
		this.formulaMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff});
		this.valueMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
		this.keyMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
		this.SRC_FONT_JSON = './src/fonts/droid_sans_mono_regular.typeface.json';
		this.SRC_IMAGE_PATH = './src/img/';
	}

	/* 初期処理 */
	calculatorInit() {
		/* mesh */
		this.initMesh();
	}

	initMesh() {
		const that = this;
		let position;

		/* 電卓 */
		that.calculator = new THREE.Group();

		/* 入力値表示部分 */
		that.displayArea(that.VALUE_AREA, that.valueMaterial);

		/* MCボタン */
		position = $.extend(true, {}, that.initSubKeyPosition);
		that.createKey('none.png', that.subKeyGeometry, position);

		/* MRボタン */
		position.x = position.x + that.subKeySpanX;
		that.createKey('none.png', that.subKeyGeometry, position);

		/* M+ボタン */
		position.x = position.x + that.subKeySpanX;
		that.createKey('none.png', that.subKeyGeometry, position);

		/* M-ボタン */
		position.x = position.x + that.subKeySpanX;
		that.createKey('none.png', that.subKeyGeometry, position);

		/* MSボタン */
		position.x = position.x + that.subKeySpanX;
		that.createKey('none.png', that.subKeyGeometry, position);

		/* 計算履歴ボタン */
		position.x = position.x + that.subKeySpanX;
		that.createKey('history.png', that.subKeyGeometry, position);

		/* CEボタン */
		position = $.extend(true, {}, that.initMainKeyPosition);
		that.createKey('clear_entry.png', that.mainKeyGeometry, position);

		/* Cボタン */
		position.x = position.x + that.mainKeySpanX;
		that.createKey('clear.png', that.mainKeyGeometry, position);

		/* BackSpaceボタン */
		position.x = position.x + that.mainKeySpanX;
		that.createKey('back_space.png', that.mainKeyGeometry, position);

		/* ÷ボタン */
		position.x = position.x + that.mainKeySpanX;
		that.createKey('divide.png', that.mainKeyGeometry, position);

		/* 7ボタン */
		position = $.extend(true, {}, that.initMainKeyPosition);
		position.z = position.z + that.mainKeySpanZ;
		that.createKey('7.png', that.mainKeyGeometry, position);

		/* 8ボタン */
		position.x = position.x + that.mainKeySpanX;
		that.createKey('8.png', that.mainKeyGeometry, position);

		/* 9ボタン */
		position.x = position.x + that.mainKeySpanX;
		that.createKey('9.png', that.mainKeyGeometry, position);

		/* ×ボタン */
		position.x = position.x + that.mainKeySpanX;
		that.createKey('multiply.png', that.mainKeyGeometry, position);

		/* 4ボタン */
		position = $.extend(true, {}, that.initMainKeyPosition);
		position.z = position.z + that.mainKeySpanZ * 2;
		that.createKey('4.png', that.mainKeyGeometry, position);

		/* 5ボタン */
		position.x = position.x + that.mainKeySpanX;
		that.createKey('5.png', that.mainKeyGeometry, position);

		/* 6ボタン */
		position.x = position.x + that.mainKeySpanX;
		that.createKey('6.png', that.mainKeyGeometry, position);

		/* -ボタン */
		position.x = position.x + that.mainKeySpanX;
		that.createKey('minus.png', that.mainKeyGeometry, position);

		/* 1ボタン */
		position = $.extend(true, {}, that.initMainKeyPosition);
		position.z = position.z + that.mainKeySpanZ * 3;
		that.createKey('1.png', that.mainKeyGeometry, position);

		/* 2ボタン */
		position.x = position.x + that.mainKeySpanX;
		that.createKey('2.png', that.mainKeyGeometry, position);

		/* 3ボタン */
		position.x = position.x + that.mainKeySpanX;
		that.createKey('3.png', that.mainKeyGeometry, position);

		/* +ボタン */
		position.x = position.x + that.mainKeySpanX;
		that.createKey('plus.png', that.mainKeyGeometry, position);

		/* ±ボタン */
		position = $.extend(true, {}, that.initMainKeyPosition);
		position.z = position.z + that.mainKeySpanZ * 4;
		that.createKey('plus_minus.png', that.mainKeyGeometry, position);

		/* 0ボタン */
		position.x = position.x + that.mainKeySpanX;
		that.createKey('0.png', that.mainKeyGeometry, position);

		/* .ボタン */
		position.x = position.x + that.mainKeySpanX;
		that.createKey('point.png', that.mainKeyGeometry, position);

		/* =ボタン */
		position.x = position.x + that.mainKeySpanX;
		that.createKey('equal.png', that.mainKeyGeometry, position);

		/* 電卓をsceneへ追加 */
		calculator3D.scene.add(that.calculator);
	}

	createKey(image, geometry, position){
		const that = this;
		/* キーに貼る透過画像を用意 */
		const textureMaterial = new THREE.MeshLambertMaterial({
			map: new THREE.TextureLoader().load(that.SRC_IMAGE_PATH + image),
			transparent: true
		});
		const material1 = new THREE.MultiMaterial([
			that.keyMaterial, /* right */
			that.keyMaterial, /* left */
			textureMaterial, /* top */
			that.keyMaterial, /* bottom */
			that.keyMaterial, /* back */
			that.keyMaterial /* front */
		]);
		const material2 = new THREE.MultiMaterial([
			that.keyMaterial, /* right */
			that.keyMaterial, /* left */
			that.keyMaterial, /* top */
			that.keyMaterial, /* bottom */
			that.keyMaterial, /* back */
			that.keyMaterial /* front */
		]);

		/* 透過画像の透過部分に色を付けるには、Meshを重複させる */
		/* Meshが重複している場合は先に作成した方が前面に描画されるため先に文字のMeshを作成 */
		const mesh1 = new THREE.Mesh(geometry, material1);
		const mesh2 = new THREE.Mesh(geometry, material2);
		mesh1.position.set(position.x, position.y, position.z);
		mesh2.position.set(position.x, position.y, position.z);
		that.calculator.add(mesh1);
		that.calculator.add(mesh2);
	}

	/* 数式エリア・数値エリア表示 */
	displayArea(area, material) {
		const that = this;
		let text;
		let size;
		/* エリアに応じて表示する文字列とその大きさを決める */
		switch (area){
		case that.FORMULA_AREA:
			/* 数式エリア文字列 */
			that.calculator.remove(that.formula);
			calculator3D.entryFormula = '';
			for (let i = 0; i < calculator3D.formulaArray.length; i++){
				const numberRegExp = /^[-]?[0-9]+(\.[0-9]+)?$/;
				let formula = calculator3D.formulaArray[i];
				if (numberRegExp.test(calculator3D.entryValue) === true &&
						formula < 0){
					formula = '(' + formula + ')';
				}
				calculator3D.entryFormula = calculator3D.entryFormula + formula;
			}
			text = calculator3D.entryFormula;
			size = 10;
			break;
		case that.VALUE_AREA:
			/* 数値エリア文字列 */
			that.calculator.remove(that.value);
			text = calculator3D.entryValue;
			size = 20;
			break;
		}

		/* フォントをロードして数式または数値を表示 */
		const loader = new THREE.FontLoader();
		loader.load(that.SRC_FONT_JSON, function(font) {
			const textGeometry = new THREE.TextGeometry(text, {
				font: font,
				size: size,
				height: 5,
				curveSegments: 20
			});

			switch (area){
			case that.FORMULA_AREA:
				/* 数式エリアMesh */
				formulaAreaAdd(textGeometry, material);
				break;
			case that.VALUE_AREA:
				/* 数値エリアMesh */
				valueAreaAdd(textGeometry, material);
				break;
			}
		});

		function formulaAreaAdd(textGeometry, material){
			that.formula = new THREE.Mesh(textGeometry, material);
			const positionX = 58 - 8.35 * calculator3D.entryFormula.length;
			that.formula.position.set(positionX, 0, -12);
			that.formula.rotation.set(- Math.PI/2, 0, 0);
			that.calculator.add(that.formula);
		}
		function valueAreaAdd(textGeometry, material){
			that.value = new THREE.Mesh(textGeometry, material);
			const positionX = 62 - 16.7 * calculator3D.entryValue.length;
			that.value.position.set(positionX, 0, 15);
			that.value.rotation.set(- Math.PI/2, 0, 0);
			that.calculator.add(that.value);
		}
	}
}
