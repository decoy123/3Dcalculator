'use strict';

class Calculator{
	constructor() {
		/* 電卓 */
		this.formula;
		this.value;
		this.mclear;
		this.mrecall;
		this.mplus;
		this.mminus;
		this.mstore;
		this.mdata;
		this.clearentry;
		this.clear;
		this.backspace;
		this.divide;
		this.seven;
		this.eight;
		this.nine;
		this.multiply;
		this.four;
		this.five;
		this.six;
		this.minus;
		this.one;
		this.two;
		this.three;
		this.plus;
		this.plusminus;
		this.zero;
		this.point;
		this.equal;
		this.calculator;
		this.FORMULA_AREA = 'formula';
		this.VALUE_AREA = 'value';
		this.formulaMaterial = new THREE.MeshLambertMaterial({color : 0x0000ff});
		this.valueMaterial = new THREE.MeshLambertMaterial({color : 0xff0000});
		this.keyMaterial = new THREE.MeshLambertMaterial({color : 0xff0000});
		this.FONT_JSON = './src/fonts/droid_sans_mono_regular.typeface.json';
	}

	// 初期処理
	calculatorInit() {
		// mesh
		this.initMesh();

		// renderer
		this.initRenderer();
	}

	initMesh() {
		const that = this;

		// 電卓
		that.calculator = new THREE.Group();

		// 入力値表示部分
//		calculator3D.formulaArray.push(calculator3D.entryValue);
		that.displayArea(that.VALUE_AREA, that.valueMaterial);

		// MCボタン
		that.mclear = new THREE.Mesh(new THREE.BoxGeometry(15, 5, 10), that.keyMaterial);
		that.mclear.position.set(-52.5, 0, 25);
		that.calculator.add(that.mclear);

		// MRボタン
		that.mrecall = new THREE.Mesh(new THREE.BoxGeometry(15, 5, 10), that.keyMaterial);
		that.mrecall.position.set(-31.5, 0, 25);
		that.calculator.add(that.mrecall);

		// M+ボタン
		that.mplus = new THREE.Mesh(new THREE.BoxGeometry(15, 5, 10), that.keyMaterial);
		that.mplus.position.set(-10.5, 0, 25);
		that.calculator.add(that.mplus);

		// M-ボタン
		that.mminus = new THREE.Mesh(new THREE.BoxGeometry(15, 5, 10), that.keyMaterial);
		that.mminus.position.set(10.5, 0, 25);
		that.calculator.add(that.mminus);

		// MSボタン
		that.mstore = new THREE.Mesh(new THREE.BoxGeometry(15, 5, 10), that.keyMaterial);
		that.mstore.position.set(31.5, 0, 25);
		that.calculator.add(that.mstore);

		// Mボタン
		that.mdata = new THREE.Mesh(new THREE.BoxGeometry(15, 5, 10), that.keyMaterial);
		that.mdata.position.set(52.5, 0, 25);
		that.calculator.add(that.mdata);

		// CEボタン
		that.clearentry = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.keyMaterial);
		that.clearentry.position.set(-46.5, 0, 45);
		that.calculator.add(that.clearentry);

		// Cボタン
		that.clear = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.keyMaterial);
		that.clear.position.set(-15.5, 0, 45);
		that.calculator.add(that.clear);

		// <×ボタン
		that.backspace = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.keyMaterial);
		that.backspace.position.set(15.5, 0, 45);
		that.calculator.add(that.backspace);

		// ÷ボタン
		that.divide = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.keyMaterial);
		that.divide.position.set(46.5, 0, 45);
		that.calculator.add(that.divide);

		// 7ボタン
		that.seven = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.keyMaterial);
		that.seven.position.set(-46.5, 0, 70);
		that.calculator.add(that.seven);

		// 8ボタン
		that.eight = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.keyMaterial);
		that.eight.position.set(-15.5, 0, 70);
		that.calculator.add(that.eight);

		// 9ボタン
		that.nine = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.keyMaterial);
		that.nine.position.set(15.5, 0, 70);
		that.calculator.add(that.nine);

		// ×ボタン
		that.multiply = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.keyMaterial);
		that.multiply.position.set(46.5, 0, 70);
		that.calculator.add(that.multiply);

		// 4ボタン
		that.four = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.keyMaterial);
		that.four.position.set(-46.5, 0, 95);
		that.calculator.add(that.four);

		// 5ボタン
		that.five = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.keyMaterial);
		that.five.position.set(-15.5, 0, 95);
		that.calculator.add(that.five);

		// 6ボタン
		that.six = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.keyMaterial);
		that.six.position.set(15.5, 0, 95);
		that.calculator.add(that.six);

		// -ボタン
		that.minus = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.keyMaterial);
		that.minus.position.set(46.5, 0, 95);
		that.calculator.add(that.minus);

		// 1ボタン
		that.one = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.keyMaterial);
		that.one.position.set(-46.5, 0, 120);
		that.calculator.add(that.one);

		// 2ボタン
		that.two = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.keyMaterial);
		that.two.position.set(-15.5, 0, 120);
		that.calculator.add(that.two);

		// 3ボタン
		that.three = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.keyMaterial);
		that.three.position.set(15.5, 0, 120);
		that.calculator.add(that.three);

		// +ボタン
		that.plus = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.keyMaterial);
		that.plus.position.set(46.5, 0, 120);
		that.calculator.add(that.plus);

		// ±ボタン
		that.plusminus = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.keyMaterial);
		that.plusminus.position.set(-46.5, 0, 145);
		that.calculator.add(that.plusminus);

		// 0ボタン
		that.zero = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.keyMaterial);
		that.zero.position.set(-15.5, 0, 145);
		that.calculator.add(that.zero);

		// .ボタン
		that.point = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.keyMaterial);
		that.point.position.set(15.5, 0, 145);
		that.calculator.add(that.point);

		// =ボタン
		that.equal = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.keyMaterial);
		that.equal.position.set(46.5, 0, 145);
		that.calculator.add(that.equal);

		// 電卓をsceneへ追加
		calculator3D.scene.add(that.calculator);
	}

	displayArea(area, material) {
		const that = this;
		let text;
		let size;
		switch (area){
		case that.FORMULA_AREA:
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
			that.calculator.remove(that.value);
			text = calculator3D.entryValue;
			size = 20;
			break;
		}

		const loader = new THREE.FontLoader();
		loader.load(that.FONT_JSON, function(font) {
			const textGeometry = new THREE.TextGeometry(text, {
				font: font,
				size: size,
				height: 5,
				curveSegments: 20
			});

			switch (area){
			case that.FORMULA_AREA:
				formulaAreaAdd(textGeometry, material);
				break;
			case that.VALUE_AREA:
				valueAreaAdd(textGeometry, material);
				break;
			}

//			valueAreaAdd = new THREE.Mesh(textGeometry, material);
//			var positionX = 62 - 16.7 * calculator3D.entryValue.length;
//			valueAreaAdd.position.set(positionX, 0, 15);
//			valueAreaAdd.rotation.set(- Math.PI/2, 0, 0);
//			that.calculator.add(valueAreaAdd);
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

	initRenderer() {
		calculator3D.renderer = new THREE.WebGLRenderer({
			antialias : true
		});
		calculator3D.renderer.setSize(calculator3D.width, calculator3D.height);
		calculator3D.renderer.setClearColor(0xefefef);
		calculator3D.renderer.setPixelRatio(window.devicePixelRatio);
		document.getElementById('stage').appendChild(calculator3D.renderer.domElement);
	}
}
