'use strict';
/**
 *
 */

const calculator3D = new Calculator3D();

const sceneInit = new SceneInit();
sceneInit.sceneInit();

const calculator = new Calculator();
calculator.calculatorInit();

const listener = new Listener();

const draw = new Draw();
draw.animate();
