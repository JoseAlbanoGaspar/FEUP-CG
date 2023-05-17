import {CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyPlane } from "./MyPlane.js";

/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBillboard extends CGFobject {
    

	constructor(scene, texture, heigthMap, heigth) {
		super(scene);
        this.quad = new MyPlane(scene,30);
    
        this.texture = texture;
        this.texture2 = heigthMap;
    	
        this.materialPlane = new CGFappearance(scene);
        this.materialPlane.setTexture(this.texture);
        this.treeHeight = heigth;
        this.treeWidth = 10;
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
        //this.texture2.bind(1);

        let aux = vec3.create();
        vec3.subtract(aux, cameraPos, quadPos);
        aux[1] = 0;
        vec3.normalize(aux, aux);
      
        let dotProduct = vec3.dot(aux, vec3.fromValues(0, 0, 1));
        let alpha = Math.acos(dotProduct);
      
        let rotationAxis = vec3.create();
        vec3.cross(rotationAxis, vec3.fromValues(0, 0, 1), aux);
        
        this.scene.translate(quadPos[0] + 5, quadPos[1], quadPos[2]);  // position of tree
        this.scene.scale(this.treeWidth, this.treeHeight, this.treeWidth);  // y gets tree height
        this.scene.translate(0,0.5,0);  //base of the tree hits the ground
        this.scene.rotate(alpha, rotationAxis[0], rotationAxis[1],rotationAxis[2]);

        //this.shader.setUniformsValues({x : (quadPos[0] + this.treeWidth / 2 + 200.0) / 400.0, z: (quadPos[2] + this.treeWidth / 2 + 200.0) / 400.0, height : this.treeHeight});
        this.quad.display();
        
        this.scene.popMatrix();
      }
      
}

