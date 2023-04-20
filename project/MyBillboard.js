import {CGFobject, CGFtexture, CGFappearance } from '../lib/CGF.js';
import { MyPlane } from "./MyPlane.js";

/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBillboard extends CGFobject {
    

	constructor(scene, texture, heigthMap, shader) {
		super(scene);
        this.quad = new MyPlane(scene,30);
    
        this.texture = texture;
        this.texture2 = new CGFtexture(scene, "images/heightmap.jpg");
        this.texture2 = heigthMap;
    	
        this.materialPlane = new CGFappearance(scene);
        this.materialPlane.setTexture(this.texture);
        this.shader = shader;
        this.initBuffers();
	}

    enableNormalViz(){
        this.quad.enableNormalViz();
    }

    disableNormalViz(){
        this.quad.disableNormalViz();
    }

    display(quadPos, cameraPos) {
        this.scene.pushMatrix();
        this.materialPlane.apply();
        this.texture2.bind(1);

        let aux = vec3.create();
        vec3.subtract(aux, cameraPos, quadPos);
        aux[1] = 0;
        vec3.normalize(aux, aux);
      
        let dotProduct = vec3.dot(aux, vec3.fromValues(0, 0, 1));
        let alpha = Math.acos(dotProduct);
      
        let rotationAxis = vec3.create();
        vec3.cross(rotationAxis, vec3.fromValues(0, 0, 1), aux);
        
        this.scene.translate(quadPos[0], quadPos[1], quadPos[2]);  // position of tree
        this.scene.rotate(alpha, rotationAxis[0], rotationAxis[1],rotationAxis[2]);
        this.scene.scale(10, 10, 10);  // y gets tree height
        this.scene.translate(0,0.5,0);  //base of the tree hits the ground
        this.shader.setUniformsValues({height : quadPos[2]});
        this.quad.display();
        
        this.scene.popMatrix();
      }
      
}

