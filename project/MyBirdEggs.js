import {CGFobject,  CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
import { MySemiSphere } from './MySemiSphere.js';

/**
 * MyBirdEggs
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdEggs extends CGFobject {
    

	constructor(scene, scaleYYPlus, scaleYYMinor, x, y, z) {
		super(scene);

        this.egg = new MySphere(scene, 2, 30, 20, false, scaleYYPlus, scaleYYMinor);

        let color = this.scene.hexToRgbA('#FFFFFF');
        this.eggAppearence = new CGFappearance(this.scene);
        this.eggAppearence.setAmbient(color[0], color[1], color[2], 1.0);
        this.eggAppearence.setSpecular(1, 1, 1, 1.0);
        this.eggAppearence.setDiffuse(color[0], color[1], color[2], 1.0);
        this.eggAppearence.setShininess(10.0);
        this.eggAppearence.setTexture(new CGFtexture(scene, 'images/eggstexture.jpg'));
        this.x = x;
        this.y = y;
        this.z = z;
        this.ang = 0;
        this.isPicked = false;
        
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
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.ang, 0, 1, 0);
        if (this.isPicked) this.scene.translate(-4.5,0.5,0);
        this.egg.display();
        this.scene.popMatrix();
        
    }
}

