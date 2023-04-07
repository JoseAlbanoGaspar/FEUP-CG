import {CGFobject,  CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTerrain extends CGFobject {
    
	constructor(scene, terrainText, heighText) {
		super(scene);
        this.terrain = new MyPlane(scene,30);

        this.materialPlane = new CGFappearance(scene);

        this.materialPlane.setTexture(terrainText);
		this.materialPlane.setTextureWrap('REPEAT', 'REPEAT');

        this.shader = [
            new CGFshader(this.scene.gl, "shaders/height.vert", "shaders/height.frag"),
        ];

        this.shader.setUniformsValues({ normScale: this.scene.scaleFactor, timeFactor: 0 });
    
        this.initBuffers();
	}

    display() {
		this.scene.pushMatrix();
        this.materialPlane.apply();
		this.scene.translate(0,-100,0);
		this.scene.scale(400,400,400);
		this.scene.rotate(-Math.PI/2.0,1,0,0);
        this.terrain.display();
		this.scene.popMatrix();
    }
    
}

