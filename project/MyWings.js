import {CGFobject,  CGFappearance} from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';
import { MyDiamond } from './MyDiamond.js';

/**
 * MyWings
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWings extends CGFobject {
    

	constructor(scene, isLeft) {
		super(scene);
        
        this.quad = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.flag = isLeft;

        let color = scene.hexToRgbA('#FFA500');
        let red = new CGFappearance(this.scene);
        red.setAmbient(color[0], color[1], color[2], 1.0);
        red.setSpecular(1, 1, 1, 1.0);
        red.setDiffuse(color[0], color[1], color[2], 1.0);
        red.setShininess(10.0);
        
        this.color = red;
        this.initBuffers();
	}

    display(){
        this.color.apply();
        this.scene.pushMatrix();
        this.scene.scale(1.3,1,1);
        this.scene.rotate(Math.PI, 0,1,0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.scale(Math.SQRT2,Math.SQRT2,0);
        this.quad.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(1, 0, 0);

        this.flag ? this.scene.rotate(-Math.PI / 10, 0, 0, 1): this.scene.rotate(Math.PI / 10, 0, 0, 1);
        this.scene.rotate(3 * Math.PI / 2, 1, 0, 0);
        this.scene.translate(1.2, 0, 0);
        this.triangle.display();
        this.scene.popMatrix();
        
    }
}

