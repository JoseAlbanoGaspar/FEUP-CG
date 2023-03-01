import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0.5, -0.5, 0.5,		//base triangles //0
			0.5, -0.5, -0.5,		//1
			-0.5, -0.5, -0.5,		//2
			-0.5, -0.5, 0.5,		//3
			-0.5, 0.5, 0.5,		//lateral paralela a xOy //4
			0.5, 0.5, 0.5,		//5
			0.5, 0.5, -0.5,		//lateral paralela a yOz //6
			-0.5, 0.5, -0.5,	//lateral paralela a xOz //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,	//base do cubo
			0, 2, 1,
			0, 2, 3,
			0, 3, 2,
			3, 0, 5,
			3, 5, 0,
			3, 5, 4,	//face lateral no eixo positivo paralela a xOy
			3, 4, 5,
			0, 1, 6,
			0, 6, 1,
			0, 6, 5,	//face lateral no eixo positivo paralela a xOz
			0, 5, 6,
			1, 7, 6,
			1, 6, 7,
			1, 2, 7,	//face lateral no eixo negativo paralela a xOy
			1, 7, 2,
			2, 4, 7,	//face lateral no eixo negativo paralela a xOz
			2, 7, 4,
			2, 3, 4,
			2, 4, 3,
			4, 5, 7,
			4, 7, 5,
			5, 6, 7,
			5, 7, 6,

		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}