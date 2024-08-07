import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			1, 1, 0,	//1
			2, 0, 0,	//2
            3, 1, 0,    //3

			0, 0, 0,	//0
			1, 1, 0,	//1
			2, 0, 0,	//2
            3, 1, 0     //3
		];

		this.normals = [];
		for (var i = 0; i < this.vertices.length / 6; i++) {
            this.normals.push(0, 0, -1);
        }
		for (var i = 0; i < this.vertices.length / 6; i++) {
            this.normals.push(0, 0, 1);
        }
		
		//Counter-clockwise reference of vertices
		this.indices = [
			0, 3, 1,
			1, 3, 0,
			0, 2, 3,
			3, 2, 0

		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
