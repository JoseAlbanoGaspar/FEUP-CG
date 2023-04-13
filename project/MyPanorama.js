import {CGFobject,  CGFappearance} from '../lib/CGF.js';
import { MySphere } from "./MySphere.js";

/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPanorama extends CGFobject {
    

	constructor(scene, texture) {
		super(scene);
        this.invertSphere = new MySphere(scene, 1, 30, 30, true);
        this.panoramaAppearence = new CGFappearance(scene);
        this.panoramaAppearence.setTexture(texture);
        this.panoramaAppearence.setAmbient(1,1,1,0);
        this.panoramaAppearence.setDiffuse(0.5,0.5,0.5,1);
        this.panoramaAppearence.setEmission(1,1,1,0.2);

        this.initBuffers();
	}

    enableNormalViz(){
        this.invertSphere.enableNormalViz();
    }

    disableNormalViz(){
        this.invertSphere.disableNormalViz();
    }

    display(){
        this.scene.pushMatrix();
        this.panoramaAppearence.apply();
        this.scene.scale(200,200,200);
        this.invertSphere.display();
        this.scene.popMatrix();
         
    }
}

