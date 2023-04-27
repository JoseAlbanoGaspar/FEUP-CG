import {CGFobject,  CGFappearance} from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';
import { MyCylinder } from './MyCylinder.js';

/**
 * MyWings
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPaw extends CGFobject {
    

	constructor(scene) {
		super(scene);
        
        this.leg = new MyCylinder(scene, 30, 30);
        this.finger = new MyTriangle(scene);

        let color = scene.hexToRgbA('#000000');
        let black = new CGFappearance(this.scene);
        black.setAmbient(color[0], color[1], color[2], 1.0);
        black.setSpecular(1, 1, 1, 1.0);
        black.setDiffuse(color[0], color[1], color[2], 1.0);
        black.setShininess(10.0);
        
        this.color = black;
        this.initBuffers();
	}

    display(){
        this.color.apply();
        this.scene.pushMatrix();
        
        this.scene.translate(-1.2,4,0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.2,0.2,2);
        this.leg.display();
        this.scene.translate(-8,0,0);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1, 4, 0);
        this.scene.rotate(Math.PI / 6, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.finger.display();

        this.scene.translate(-3, -1.5 ,0);
        this.finger.display();
        this.scene.popMatrix();
        
    }
}

