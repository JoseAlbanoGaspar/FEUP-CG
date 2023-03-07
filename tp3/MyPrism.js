import {CGFobject} from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
	
    constructor(scene, slices, stacks){
        super(scene);
        this.PRISMSIZE = 5; // change the height (distance between 2 bases) of the prism
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();

    }
	normalizeVector(x, y, z) {
        const length = Math.sqrt(x * x + y * y + z * z);
        const normalizedX = x / length;
        const normalizedY = y / length;
        const normalizedZ = z / length;
        return [normalizedX, normalizedY, normalizedZ];
    }

	initBuffers() {
		this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        let stackSize = this.PRISMSIZE / this.stacks;

        //GETT BASE VERTICES AND INDICES
        for(var i = 0; i < this.slices; i++){
            //base 1
            this.vertices.push(Math.cos(ang), Math.sin(ang), 0);
            this.indices.push(this.slices, (i + 1) % this.slices, i);
            this.normals.push(0,0,-1);
            ang+=alphaAng;
        }
        this.vertices.push(0, 0 , 0); // center of base 1
        this.normals.push(0,0,1);
        let stack = stackSize;
        for(var i = 0; i < this.stacks - 1; i++){
            ang = 0;
            for(var i = 0; i < this.slices; i++){

                this.vertices.push(Math.cos(ang), Math.sin(ang), stack);
                this.normals.push(0,0,0);
                ang+=alphaAng;
            }
            this.vertices.push(0, 0 , stack); // center of base 1
            this.normals.push(0,0,0);
            stack += stackSize;
        }

        ang = 0;
        for(var i = 0; i < this.slices; i++){
            //base 2
            this.vertices.push(Math.cos(ang), Math.sin(ang), this.PRISMSIZE);
            this.indices.push(i + (this.slices + 1)*(this.stacks), ((i+1) % this.slices) + (this.slices + 1)*(this.stacks) , (this.slices + 1)*(this.stacks));
            this.normals.push(0,0,1);
            ang+=alphaAng;
        }
        this.vertices.push(0, 0, this.PRISMSIZE); // center of base 2
        this.normals.push(0,0,1);
        
        // DESENHO LATERAIS
        for(let k = 0; k < this.stacks; k++){
            let aux = this.slices + 1;
            for(let i = 0 ; i < this.slices; i++){
                this.indices.push((i + 1) % this.slices + aux*k, i + (1 + this.slices) + aux*k, i + aux*k);
                this.indices.push((i + 1) % this.slices + (1 + this.slices) + aux*k, i + (1 + this.slices) + aux*k, (i + 1) % this.slices + aux*k);
            }
            
        }   
        //UPDATE NORMALS
        stack = 0;
        for(let k = 0; k < this.stacks + 1; k++){    
            ang = 0;
            for(var i = 0; i < this.slices; i++){
                this.vertices.push(Math.cos(ang), Math.sin(ang), stack);
                let norm = this.normalizeVector(1,Math.tan(ang + alphaAng/2),0);
                
                if(ang >= Math.PI / 2 && ang <=  3* Math.PI / 2 ){
                    this.normals.push(-norm[0],-norm[1],norm[2]);
                }
                else{
                    this.normals.push(norm[0],norm[1],norm[2]);
                }
                this.vertices.push(Math.cos(ang), Math.sin(ang), stack);
                let norm2 = this.normalizeVector(1,Math.tan(ang - alphaAng/2),0);
                if(ang >= Math.PI && ang <  2 * Math.PI ){
                    this.normals.push(-norm2[0],-norm2[1],norm2[2]);
                }
                else{
                    this.normals.push(norm2[0],norm2[1],norm2[2]);
                }
                ang+=alphaAng;
            }
            stack += stackSize;
        }
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}