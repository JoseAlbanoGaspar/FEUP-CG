import { CGFobject } from "../lib/CGF.js";

/**
 * MyTriangleBig
 * @construtor
 * @param scene - Reference to MyScene
 */

export class MyTriangleBig extends CGFobject {
    constructor(scene, isOrange){
        super(scene);
        this.initBuffers(isOrange);
    }

    initBuffers(isOrange) {
        this.vertices = [
            -2, 0, 0,
            2, 0, 0,
            0, 2, 0,
        ];
        this.normals = [];
		for (var i = 0; i < this.vertices.length / 3; i++) {
            this.normals.push(0, 0, 1);
        }
        this.indices = [
            0, 1, 2,
        ];
        if(isOrange){
            this.texCoords = [
                1, 1,
                1, 0,
                0.5, 0.5,
            ];
        }
        else{
            this.texCoords = [
                0, 0,
                1, 0,
                0.5, 0.5,
            ];
        }

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}