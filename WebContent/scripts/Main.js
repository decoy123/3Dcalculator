'use strict';
/**
 * 
 */
var calculator3D = new Calculator3D();

var sceneInit = new SceneInit();
sceneInit.sceneInit();

var calculator = new Calculator();
calculator.calculatorInit();

var listener = new Listener();

var draw = new Draw();
draw.animate();