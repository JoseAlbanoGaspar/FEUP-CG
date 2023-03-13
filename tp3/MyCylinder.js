import {CGFobject} from '../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
	
    constructor(scene, slices, stacks){
        super(scene);
        this.CYLINDERSIZE = 1; // change the height (distance between 2 bases) of the prism
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();

    }

	initBuffers() {
		this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        let stackSize = this.CYLINDERSIZE / this.stacks;
 
        let stack = 0;
        for(let k = 0; k < this.stacks; k++){
            ang = 0;
            for(let i = 0; i < this.slices; i++){
                
                let p1 = vec3.fromValues(Math.cos(ang), Math.sin(ang), stack);   
                this.normals.push((p1[0])/2,(p1[1])/2,0);                                   // 0
                let p2 = vec3.fromValues(Math.cos(ang + alphaAng), Math.sin(ang + alphaAng), stack);                // 1
                this.normals.push((p2[0])/2,(p2[1])/2,0);
                let p3 = vec3.fromValues(Math.cos(ang + alphaAng), Math.sin(ang + alphaAng), stack + stackSize);    // 2
                this.normals.push((p3[0])/2,(p3[1])/2,0);
                let p4 = vec3.fromValues(Math.cos(ang), Math.sin(ang), stack + stackSize);                          // 3
                this.normals.push((p4[0])/2,(p4[1])/2,0);

                this.vertices.push(p1[0],p1[1],p1[2]);
                this.vertices.push(p2[0],p2[1],p2[2]);
                this.vertices.push(p3[0],p3[1],p3[2]);
                this.vertices.push(p4[0],p4[1],p4[2]);

                /*
                for(let i = 0; i < this.slices; i++){
                    this.normals.push((p1[0] + p2[0])/2,(p1[1] + p2[1])/2,0);
                    this.normals.push((p3[0] + p4[0])/2,(p3[1] + p4[1])/2,0);
                }*/
                
                let skip = 4*i + 4*this.slices*k;
                this.indices.push(0 + skip, 1 + skip, 2 + skip);
                this.indices.push(0 + skip, 2 + skip , 3 + skip);

                ang+=alphaAng
            }
            stack += stackSize;
        }

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}