'use strict';

class SceneInit{
	constructor() {

	}

	/* 初期処理 */
	sceneInit() {
		/* scene */
		this.initScene();

		/* camera */
		this.initCamera();

		/* controls */
		this.initControls();

		/* light */
		this.initLight();

		/* helper */
		this.initHelper();

		/* renderer */
		this.initRenderer();

		/* 計算履歴ダイアログ設定 */
		const HISTOY_DIALOG = '#history-dialog';
		$(function() {
			$(HISTOY_DIALOG).dialog({
				 autoOpen: false,
				 width: 'auto',
				 height: 'auto'
//				 postition: {
//					 my: 'center top',
//					 at: 'right top',
//					 of: '#stage'
//				 }
			});
		});
	}

	initScene() {
		calculator3D.scene = new THREE.Scene();
	}


	initCamera() {
		calculator3D.camera = new THREE.PerspectiveCamera(
				45,
				calculator3D.width / calculator3D.height,
				1,
				1000
		);
		calculator3D.camera.position.set(0, 350, 300);
		calculator3D.camera.lookAt(calculator3D.scene.position);
	}

	initControls() {
		calculator3D.controls = new THREE.TrackballControls(calculator3D.camera);
		calculator3D.controls.panSpeed = 0.7;
		calculator3D.controls.rotateSpeed = 3;
		calculator3D.controls.zoomSpeed = 0.02;
		calculator3D.controls.staticMoving = true;
	}

	initLight() {
		calculator3D.light = new THREE.DirectionalLight(0xffffff, 1);
		calculator3D.light.position.set(0, 500, 300);
		calculator3D.scene.add(calculator3D.light);
		calculator3D.ambient = new THREE.AmbientLight(0x404040);
		calculator3D.scene.add(calculator3D.ambient);
	}

	initHelper() {
		calculator3D.gridHelper = new THREE.GridHelper(200, 40);
		calculator3D.scene.add(calculator3D.gridHelper);
		calculator3D.axisHelper = new THREE.AxisHelper(1000); /* x:赤 y:緑 z:青 */
		calculator3D.scene.add(calculator3D.axisHelper);
		calculator3D.lightHelper = new THREE.DirectionalLightHelper(calculator3D.light, 20);
		calculator3D.scene.add(calculator3D.lightHelper);
	}

	initRenderer() {
		calculator3D.renderer = new THREE.WebGLRenderer({
//			antialias: true,
			alpha: true
		});
		calculator3D.renderer.setSize(calculator3D.width, calculator3D.height);
		calculator3D.renderer.setClearColor(0xefefef);
		calculator3D.renderer.setPixelRatio(window.devicePixelRatio);
		document.getElementById('stage').appendChild(calculator3D.renderer.domElement);
	}
}
