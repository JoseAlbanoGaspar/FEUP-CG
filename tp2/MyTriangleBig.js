import { CGFobject } from "../lib/CGF.js";

/**
 * MyTriangleBig
 * @construtor
 * @param scene - Reference to MyScene
 */

export class MyTriangleBig extends CGFobject {
    constructor(scene){
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -2, 0, 0,
            2, 0, 0,
            0, 2, 0,
        ];

        this.indices = [
            0, 1, 2,
        ];


        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}