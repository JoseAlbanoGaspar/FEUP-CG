import {CGFobject,  CGFappearance, CGFshader} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
import { MyCone } from './MyCone.js';
import { MyWings } from './MyWings.js';
import { MyPaw } from './MyPaw.js';

/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBird extends CGFobject {
    

	constructor(scene) {
		super(scene);
        
        this.body = new MySphere(scene, 3, 30, 30);
        this.eye = new MySphere(scene, 0.5, 15, 15);
        this.beak = new MyCone(scene,30,10);
        this.wingLeft = new MyWings(scene, true);
        this.wingRight = new MyWings(scene, false);
        this.paw = new MyPaw(scene);

        this.shader = new CGFshader(scene.gl, "shaders/birdAnimation.vert", "shaders/birdAnimation.frag")
        this.shader.setUniformsValues({ normScale: 1, timeFactor: 0 });

        let color = this.scene.hexToRgbA('#FF0000');
        let red = new CGFappearance(this.scene);
        red.setAmbient(color[0], color[1], color[2], 1.0);
        red.setSpecular(1, 1, 1, 1.0);
        red.setDiffuse(color[0], color[1], color[2], 1.0);
        red.setShininess(10.0);

        color = this.scene.hexToRgbA('#000000');
        let black = new CGFappearance(this.scene);
        black.setAmbient(color[0], color[1], color[2], 1.0);
        black.setSpecular(1, 1, 1, 1.0);
        black.setDiffuse(color[0], color[1], color[2], 1.0);
        black.setShininess(10.0);

        color = this.scene.hexToRgbA('#FFFF00');
        let yellow = new CGFappearance(this.scene);
        yellow.setAmbient(color[0], color[1], color[2], 1.0);
        yellow.setSpecular(1, 1, 1, 1.0);
        yellow.setDiffuse(color[0], color[1], color[2], 1.0);
        yellow.setShininess(10.0);

        this.colors = {
            "BODY" : red,
            "EYES" : black,
            "BEAK" : yellow
        };
        
        this.heigth = 0;
        this.velocity = 10;
        this.wingRotation = 0;
        this.initBuffers();
        scene.setUpdatePeriod(50);
	}

    enableNormalViz(){
        this.head.enableNormalViz();
        this.eye.enableNormalViz();     
    }

    disableNormalViz(){
        this.head.disableNormalViz();
        this.eye.disableNormalViz();
    }

    update(t){
        this.heigth = Math.sin(2 * Math.PI / 10 * (t / 100 % 10));

        //this.wingRotation = (Math.PI / 6) * Math.sin((2 * Math.PI / this.velocity) * (t / 500 % this.velocity));
        this.wingRotation = Math.sin((Math.PI / 6) * (t / (1000 / this.velocity))) * (Math.PI / 6);

    }

    display(){
        this.scene.translate(0, this.heigth, 0);
        this.colors["BODY"].apply();
        this.scene.pushMatrix();
        this.body.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-4.5, -3, 0);
        this.scene.rotate(Math.PI / 9, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(1, 1, 1.5);
        this.body.display();
        this.scene.popMatrix();
        
        this.colors["EYES"].apply();
        this.scene.pushMatrix();
        this.scene.translate(2.2, 1.5, 1);
        this.eye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.2, 1.5, -1);
        this.eye.display();
        this.scene.popMatrix();

        this.colors["BEAK"].apply();
        this.scene.pushMatrix();
        this.scene.rotate(3 * Math.PI / 2, 0, 0, 1);
        this.scene.translate(0, 2.9, 0);
        this.scene.scale(0.5, 1, 0.5);
        this.beak.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.rotate(this.wingRotation, 1, 0, 0);
        this.scene.translate(-4.5,-1,-3);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(1.5, 1.5, 1.5);
        this.wingLeft.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-this.wingRotation, 1, 0, 0);
        this.scene.translate(-4.5,-1,3);
        this.scene.rotate(Math.PI, 1,0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(1.5, 1.5, 1.5);
        this.wingRight.display();
        this.paw.display();
        this.scene.popMatrix();
    }
}

