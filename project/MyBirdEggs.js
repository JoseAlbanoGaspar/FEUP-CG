import {CGFobject,  CGFappearance, CGFtexture} from '../lib/CGF.js';
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

        let color = this.scene.hexToRgbA('#FFFFFF');
        this.eggAppearence = new CGFappearance(this.scene);
        this.eggAppearence.setAmbient(color[0], color[1], color[2], 1.0);
        this.eggAppearence.setSpecular(1, 1, 1, 1.0);
        this.eggAppearence.setDiffuse(color[0], color[1], color[2], 1.0);
        this.eggAppearence.setShininess(10.0);
        this.eggAppearence.setTexture(new CGFtexture(scene, 'images/eggstexture.jpg'));
    
        
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

