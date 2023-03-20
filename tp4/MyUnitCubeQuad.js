import {CGFobject} from '../lib/CGF.js';
import {MyQuad} from "./MyQuad.js"
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    

	constructor(scene, top, front, right, back, left, bottom) {
		super(scene);
        this.myquad = new MyQuad(scene);
        this.textureTop = top;
        this.textureFront = front;
        this.textureRight = right;
        this.textureBack = back;
        this.textureLeft = left;
        this.textureBottom = bottom;
	}
	
    display(){

        if(this.scene.displayCubeQuad) {
            this.textureBack.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.myquad.display();

            this.scene.pushMatrix();          //face lateral do cubo
            this.scene.translate(0, 0, 1);
            this.textureFront.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.myquad.display();
            this.scene.popMatrix();
            
            this.scene.pushMatrix();                //face lateral do cubo no eixo positivo do x
            this.scene.translate(-0.5, 0, 0.5);
            this.scene.rotate(Math.PI/2, 0, 1, 0);
            this.textureLeft.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.myquad.display();
            this.scene.popMatrix();
            
            this.scene.pushMatrix();                  //face lateral do cubo no eixo negativo do x
            this.scene.translate(0.5, 0, 0.5);
            this.scene.rotate(Math.PI/2, 0, 1, 0);
            this.textureRight.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.myquad.display();
            this.scene.popMatrix();
            
            this.scene.pushMatrix();                  //face lateral do cubo no eixo negativo do z
            this.scene.translate(0, -0.5, 0.5);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.textureBottom.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.myquad.display();
            this.scene.popMatrix();
            
            this.scene.pushMatrix();                  //face lateral do cubo no eixo positivo do z
            this.scene.translate(0, 0.5, 0.5);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.textureTop.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.myquad.display();
            this.scene.popMatrix();
            
        }
        
        
    }
}

