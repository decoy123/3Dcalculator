'use strict';
/**
 *
 */
class Calculator3D{
	constructor() {
		this.scene;
		this.camera;
		this.controls;
		this.renderer;
		this.light;
		this.ambient;
		this.gridHelper;
		this.axisHelper;
		this.lightHelper;
		this.width = 1200;
		this.height = 800;
		this.mouse = { "x": 0, "y": 0 };
		this.vector;
		this.ray;
		this.entryValue = "0";
		this.entryFormula = "";
		this.formulaArray = [];
	}
}