'use strict';

class Calculator{
	constructor() {
		// 電卓
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
		this.material = new THREE.MeshLambertMaterial({color : 0xff0000});
	}

	// 初期処理
	calculatorInit() {
		// mesh
		this.initMesh();

		// renderer
		this.initRenderer();
	}

	initMesh() {
		var that = this;

		// 電卓
		that.calculator = new THREE.Group();

		// 入力値表示部分
		that.displayValue();

		// MCボタン
		that.mclear = new THREE.Mesh(new THREE.BoxGeometry(15, 5, 10), that.material);
		that.mclear.position.set(-52.5, 0, 25);
		that.calculator.add(that.mclear);

		// MRボタン
		that.mrecall = new THREE.Mesh(new THREE.BoxGeometry(15, 5, 10), that.material);
		that.mrecall.position.set(-31.5, 0, 25);
		that.calculator.add(that.mrecall);

		// M+ボタン
		that.mplus = new THREE.Mesh(new THREE.BoxGeometry(15, 5, 10), that.material);
		that.mplus.position.set(-10.5, 0, 25);
		that.calculator.add(that.mplus);

		// M-ボタン
		that.mminus = new THREE.Mesh(new THREE.BoxGeometry(15, 5, 10), that.material);
		that.mminus.position.set(10.5, 0, 25);
		that.calculator.add(that.mminus);

		// MSボタン
		that.mstore = new THREE.Mesh(new THREE.BoxGeometry(15, 5, 10), that.material);
		that.mstore.position.set(31.5, 0, 25);
		that.calculator.add(that.mstore);

		// Mボタン
		that.mdata = new THREE.Mesh(new THREE.BoxGeometry(15, 5, 10), that.material);
		that.mdata.position.set(52.5, 0, 25);
		that.calculator.add(that.mdata);

		// CEボタン
		that.clearentry = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.material);
		that.clearentry.position.set(-46.5, 0, 45);
		that.calculator.add(that.clearentry);

		// Cボタン
		that.clear = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.material);
		that.clear.position.set(-15.5, 0, 45);
		that.calculator.add(that.clear);

		// <×ボタン
		that.backspace = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.material);
		that.backspace.position.set(15.5, 0, 45);
		that.calculator.add(that.backspace);

		// ÷ボタン
		that.divide = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.material);
		that.divide.position.set(46.5, 0, 45);
		that.calculator.add(that.divide);

		// 7ボタン
		that.seven = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.material);
		that.seven.position.set(-46.5, 0, 70);
		that.calculator.add(that.seven);

		// 8ボタン
		that.eight = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.material);
		that.eight.position.set(-15.5, 0, 70);
		that.calculator.add(that.eight);

		// 9ボタン
		that.nine = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.material);
		that.nine.position.set(15.5, 0, 70);
		that.calculator.add(that.nine);

		// ×ボタン
		that.multiply = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.material);
		that.multiply.position.set(46.5, 0, 70);
		that.calculator.add(that.multiply);

		// 4ボタン
		that.four = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.material);
		that.four.position.set(-46.5, 0, 95);
		that.calculator.add(that.four);

		// 5ボタン
		that.five = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.material);
		that.five.position.set(-15.5, 0, 95);
		that.calculator.add(that.five);

		// 6ボタン
		that.six = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.material);
		that.six.position.set(15.5, 0, 95);
		that.calculator.add(that.six);

		// -ボタン
		that.minus = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.material);
		that.minus.position.set(46.5, 0, 95);
		that.calculator.add(that.minus);

		// 1ボタン
		that.one = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.material);
		that.one.position.set(-46.5, 0, 120);
		that.calculator.add(that.one);

		// 2ボタン
		that.two = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.material);
		that.two.position.set(-15.5, 0, 120);
		that.calculator.add(that.two);

		// 3ボタン
		that.three = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.material);
		that.three.position.set(15.5, 0, 120);
		that.calculator.add(that.three);

		// +ボタン
		that.plus = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.material);
		that.plus.position.set(46.5, 0, 120);
		that.calculator.add(that.plus);

		// ±ボタン
		that.plusminus = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.material);
		that.plusminus.position.set(-46.5, 0, 145);
		that.calculator.add(that.plusminus);

		// 0ボタン
		that.zero = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.material);
		that.zero.position.set(-15.5, 0, 145);
		that.calculator.add(that.zero);

		// .ボタン
		that.point = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.material);
		that.point.position.set(15.5, 0, 145);
		that.calculator.add(that.point);

		// =ボタン
		that.equal = new THREE.Mesh(new THREE.BoxGeometry(27, 5, 20), that.material);
		that.equal.position.set(46.5, 0, 145);
		that.calculator.add(that.equal);

		// 電卓をsceneへ追加
		calculator3D.scene.add(that.calculator);
	}

	displayValue() {
		var that = this;
		that.calculator.remove(that.value);
		var loader = new THREE.FontLoader();
		loader.load( './fonts/droid_sans_mono_regular.typeface.json', function(font) {
			var textGeometry = new THREE.TextGeometry(calculator3D.entryValue, {
				font: font,
				size: 20,
				height: 5,
				curveSegments: 20,
			});

			var textMaterial = new THREE.MeshPhongMaterial(
			{ color: 0xff0000, specular: 0xffffff }
			);

			that.value = new THREE.Mesh(textGeometry, that.material);
			that.value.position.set(0, 0, 15);
			that.value.rotation.set(- Math.PI/2, 0, 0);
			that.calculator.add(that.value);
		});
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
