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
 
        let points1 = [];

        let verticesNum = 0;
        let normal1 = [Math.cos(ang), Math.sin(ang), 0];
        for(let i = 0; i < this.stacks+1; i++){
            let p1 = [Math.cos(ang), Math.sin(ang), i*stackSize]; 
            this.normals.push(...normal1);
            verticesNum++;
            points1.push(...p1);
        }

        this.vertices.push(...points1);
    
        for(let l=0; l<this.slices-1; l++) {
            points1 = [];
            let normal = [Math.cos(ang + alphaAng), Math.sin(ang + alphaAng), 0];
            for(let j = 0; j < this.stacks+1; j++ ){
                let p2 = [Math.cos(ang + alphaAng), Math.sin(ang + alphaAng), j*stackSize];
                this.normals.push(...normal);
                verticesNum++;
                points1.push(...p2);
            }
        
            this.vertices.push(...points1);

            for(let k=0; k<this.stacks; k++){
                let indice1 = verticesNum - 2*(this.stacks+1) + k;
                let indice2 = verticesNum - (this.stacks+1) + k;
                this.indices.push(indice1, indice2, indice2+1);
                this.indices.push(indice1, indice2+1, indice1+1);
            }

            ang += alphaAng;
        }

        for(let k=0; k<this.stacks; k++){
            let indice1 = verticesNum - (this.stacks+1) + k;
            let indice2 = k;
            this.indices.push(indice1, indice2, indice2+1);
            this.indices.push(indice1, indice2+1, indice1+1);
        }
        console.log("array vertices ", this.vertices);
        console.log("number vertices ", verticesNum);
        console.log("normals ", this.normals);
    
    
        console.log("indices ", this.indices);
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}