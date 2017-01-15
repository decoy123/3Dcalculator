'use strict';

class Draw{
	constructor() {

	}

	// 描画処理
	animate() {
		// 表示処理実行
		this.render();
	}

	// 表示処理
	render() {
		requestAnimationFrame(this.render.bind(this));

		calculator3D.controls.update();
		calculator3D.renderer.render(calculator3D.scene, calculator3D.camera);
	}
}
