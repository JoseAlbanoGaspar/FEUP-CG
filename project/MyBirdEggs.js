import {CGFobject,  CGFappearance} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
import { MySemiSphere } from './MySemiSphere.js';

/**
 * MyBirdEggs
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdEggs extends CGFobject {
    

	constructor(scene, scaleYY) {
		super(scene);
        
        this.scaleYY = scaleYY;

        this.egg = new MySphere(scene, 2, 30, 20);

        eggText = new CGFtexture(scene, 'images/eggstexture.jpg');
        this.eggAppearence = new CGFappearance(scene);
        this.eggAppearence.setTexture(eggText);
        this.eggAppearence.setAmbient(1,1,1,0);
        this.eggAppearence.setDiffuse(0.5,0.5,0.5,1);
        this.eggAppearence.setEmission(1,1,1,0.2);
        
        
        this.initBuffers();
	}

    enableNormalViz(){
        this.egg.enableNormalViz();
    }

    disableNormalViz(){
        this.egg.disableNormalViz();
    }

    display(){
        this.scene.pushMatrix();
        this.eggAppearence.apply();
        this.scene.translate(10, 10, 0);
        this.scene.scale(1, this.scaleYY, 1);
        this.egg.display();
        this.scene.popMatrix();
        /*
        this.scene.pushMatrix();
        this.scene.translate(10, 10, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(1, this.scaleYY, 1);
        this.topEgg.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(10, 10, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(1, this.scaleYY, 1);
        this.bottomEgg.display();
        this.bottomEgg.popMatrix();
        */


    }
}

