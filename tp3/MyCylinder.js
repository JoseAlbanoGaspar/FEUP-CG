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
 
        this.points = [];
        this.line = [];

        let verticesNum = 0;
        for(let i = 0; i < this.stacks+1; i++){
            let p1 = [Math.cos(ang), Math.sin(ang), i*stackSize]; 
            this.normals.push((p1[0])/2,(p1[1])/2,0);
            verticesNum++;
            ang += alphaAng;
            this.points.push(p1);
        }

        this.line.push(...this.points);
    
        for(let u=0; u<this.slices-1; u++) {
            for(let j = 0; j < this.stacks; j++ ){
                let p2 = [Math.cos(ang + alphaAng), Math.sin(ang + alphaAng), j*stackSize];
                this.normals.push((p2[0])/2,(p2[1])/2,0);
                verticesNum++;
                ang += alphaAng;
                this.points.push(p2);
            }
            this.line.push(...this.points);
        }

        console.log("vertices ", this.line);
            
        for(let k=0; k<verticesNum; k++){
            let indice1 = k;
            let indice2 = k + (this.stacks+1);
            this.indices.push(indice1, indice2, indice2+1);
            this.indices.push(indice1, indice2+1, indice1+1);
        }
    
        console.log("indices ", this.indices);
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}