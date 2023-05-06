import { CGFobject, CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyBillboard } from "./MyBillboard.js";

/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTreeGroupPatch extends CGFobject {
    

	constructor(scene, shader) {
		super(scene); 
        this.trees = []; 
        this.distance = 10;
        this.randomX =  [];
        this.randomZ = [];
        this.textures = [
                        new CGFtexture(scene, "images/billboardtree.png"),
                        new CGFtexture(scene, "images/billboardtree2.png"),
                        new CGFtexture(scene, "images/billboardtree3.png"),
                        new CGFtexture(scene, "images/heightmap.jpg")
                        ];
        
        this.shader = shader;
        this.shader.setUniformsValues({uSampler2 : 1});

    	for(let i = 0; i < 9; i++){
            this.trees.push(new MyBillboard(scene, this.textures[this.getRandomNumber(0,2)], this.textures[3], this.getRandomNumber(12, 20)));
            this.randomX.push(this.getRandomNumber(- this.distance / 6, this.distance / 6));
            this.randomZ.push(this.getRandomNumber(- this.distance / 6, this.distance / 6));
        }
        
	}

    getRandomNumber(a, b) {
        return Math.floor(Math.random() * (b - a + 1) + a);
      }

    enableNormalViz(){
        this.quad.enableNormalViz();
    }

    disableNormalViz(){
        this.quad.disableNormalViz();
    }

    display(initPos, cameraPos) {
        this.scene.pushMatrix();
        this.textures[3].bind(1);

        let distance = 10;
        let posX = initPos[0];
        let posY = initPos[1];
        let posZ = initPos[2];
        for (let i = 0; i < 3; i++) {
            posZ = initPos[2];
            for (let j = 0; j < 3; j++) {
                let idx = 3 * i + j;
                let newPos = vec3.fromValues(posX + this.randomX[idx], posY, posZ + this.randomZ[idx]);
                this.trees[idx].display(newPos, cameraPos);
                posZ += distance;
            }
            posX += distance;
        }
        
        this.scene.popMatrix();
      }
      
}
