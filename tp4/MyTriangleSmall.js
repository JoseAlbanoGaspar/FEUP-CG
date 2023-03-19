import { CGFobject } from "../lib/CGF.js";
/**
 * MyTriangleSmall
 * @construtor
 * @param scene - Reference to MyScene
 */

export class MyTriangleSmall extends CGFobject {
    constructor(scene, isRed){
        super(scene);
        this.initBuffers(isRed);
    }

    initBuffers(isRed) {
        this.vertices = [
           -1, 0, 0,
           1, 0, 0,
           0, 1, 0
        ];
        
        this.normals = [];
		for (var i = 0; i < this.vertices.length / 3; i++) {
            this.normals.push(0, 0, 1);
        }

        this.indices = [
            0, 1, 2
        ];

        if(isRed)
            this.texCoords = [
                0.25, 0.75,
                0.5, 0.5,
                0.75, 0.75,
            ]
        else
            this.texCoords = [
                0, 0,
                0.25, 0.25,
                0, 0.5,
            ]

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}