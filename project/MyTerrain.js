import {CGFobject,  CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTerrain extends CGFobject {
    
	constructor(scene) {
		super(scene);
        this.terrain = new MyPlane(scene,30);

		this.texture = new CGFtexture(scene, "images/terrain.jpg");
    	this.texture2 = new CGFtexture(scene, "images/heightmap.jpg");
		this.texture3 = new CGFtexture(scene, "images/altimetry.png");

        this.materialPlane = new CGFappearance(scene);

        this.materialPlane.setTexture(this.texture);
		this.materialPlane.setTextureWrap('REPEAT', 'REPEAT');

		this.shader = new CGFshader(this.scene.gl, "shaders/height.vert", "shaders/height.frag")
		this.shader.setUniformsValues({uSampler2 : 1, uSampler3 : 2});

        this.initBuffers();
	}

    display() {
		this.scene.pushMatrix();
        this.materialPlane.apply();
		this.scene.translate(0,-100,0);
		this.scene.scale(400,400,400);
		this.scene.rotate(-Math.PI/2.0,1,0,0);
		//this.scene.setActiveShader(this.shader);
    	this.texture2.bind(1);
		this.texture3.bind(2);
        this.terrain.display();
		this.scene.popMatrix();
		this.scene.setActiveShader(this.scene.defaultShader);
    }
    
}

