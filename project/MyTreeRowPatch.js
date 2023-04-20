import {CGFobject, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyBillboard } from "./MyBillboard.js";

/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTreeRowPatch extends CGFobject {
    

	constructor(scene) {
		super(scene); 
        this.trees = []; 
        this.distance = 10;
        this.randomX =  [];
        this.randomZ = [];    
    	this.textures = [new CGFtexture(scene, "images/billboardtree.png"),
                        new CGFtexture(scene, "images/billboardtree2.png"),
                        new CGFtexture(scene, "images/billboardtree3.png"),
                        new CGFtexture(scene, "images/heightmap.jpg")
                        ];
        
        this.shader = new CGFshader(this.scene.gl, "shaders/bilboardtree.vert", "shaders/bilboardtree.frag")
        this.shader.setUniformsValues({uSampler2 : 1});

    	for(let i = 0; i < 6; i++){
            this.trees.push(new MyBillboard(scene, this.textures[this.getRandomNumber(0,2)], this.textures[3], this.shader));
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
        this.scene.setActiveShader(this.shader);
        this.textures[3].bind(1);
        let distance = 10;
        let posX = initPos[0];
        let posY = initPos[1];
        let posZ = initPos[2];
        for(let i = 0; i < 6; i++){
            let newPos = vec3.fromValues(posX + this.randomX[i], posY, posZ + this.randomZ[i]);
            this.trees[i].display(newPos, cameraPos);
            posZ += distance;
        }
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
      }
      
}
