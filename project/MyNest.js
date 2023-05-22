import {CGFobject,  CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MySemiSphere } from './MySemiSphere.js';

/**
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyNest extends CGFobject {
    

	constructor(scene) {
		super(scene);
        this.eggsInNest = [];
        this.outNest = new MySemiSphere(scene, 3, 30, 20);
        this.inNest = new MySemiSphere(scene, 3, 30, 20, true);

        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(1,1,1,0);
        this.material.setDiffuse(0.5,0.5,0.5,1);
        this.material.setEmission(0.8,0.8,0.8,0.7);
        this.material.setTexture(new CGFtexture(scene, 'images/nest.png'));

        this.initBuffers();
	}

    checkEgg() {
        
        for(let i=0; i<this.scene.allEggs.length; i++){
            if(this.allEgg[i].x <-55 && this.allEgg[i].x < -35 && tthis.allEgg[i].z < -35 && this.allEgg[i].z > -55 && this.allEgg[i].y==50) {
                this.eggsInNest.push(this.allEgg[i]);
            }
        }
        return null;
    }

    enableNormalViz(){
        this.head.enableNormalViz();
        this.eye.enableNormalViz();     
    }

    disableNormalViz(){
        this.head.disableNormalViz();
        this.eye.disableNormalViz();
    }

    display(){
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2,1, 0, 0);
        this.scene.translate(-46,-48,50);
        this.scene.scale(3, 4, 3)
        this.material.apply();
        this.outNest.display();
        this.inNest.display();
        
        this.scene.popMatrix();
    }
}

