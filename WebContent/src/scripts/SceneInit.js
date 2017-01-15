'use strict';

class SceneInit{
	constructor() {

	}

	// 初期処理
	sceneInit() {
		// scene
		this.initScene();

		// camera
		this.initCamera();

		// controls
		this.initControls();

		// light
		this.initLight();

		// helper
		this.initHelper();
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
		calculator3D.controls = new THREE.OrbitControls(calculator3D.camera);
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
		calculator3D.axisHelper = new THREE.AxisHelper(1000); // x:赤 y:緑 z:青
		calculator3D.scene.add(calculator3D.axisHelper);
		calculator3D.lightHelper = new THREE.DirectionalLightHelper(calculator3D.light, 20);
		calculator3D.scene.add(calculator3D.lightHelper);
	}
}
