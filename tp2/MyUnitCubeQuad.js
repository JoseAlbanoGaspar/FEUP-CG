import {CGFobject} from '../lib/CGF.js';
import {MyQuad} from "./MyQuad.js"
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    

	constructor(scene) {
		super(scene);
        this.myquad = new MyQuad(scene);
	}
	
    display(){

        if(this.scene.displayQuad) {
            this.myquad.display();

            this.scene.pushMatrix();          //face superior do cubo
            this.scene.translate(0, 1, 0);
            this.myquad.display();
            this.scene.popMatrix();
    
            this.scene.pushMatrix();                //face lateral do cubo no eixo positivo do x
            this.scene.rotate(Math.PI/2, 0, 0, 1);
            this.myquad.display();
            this.scene.popMatrix();
    
            this.scene.pushMatrix();                  //face lateral do cubo no eixo negativo do x
            this.scene.rotate(-Math.PI/2, 0, 0, 1);
            this.myquad.display();
            this.scene.popMatrix();
    
            this.scene.pushMatrix();                  //face lateral do cubo no eixo negativo do z
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.myquad.display();
            this.scene.popMatrix();
    
            this.scene.pushMatrix();                  //face lateral do cubo no eixo positivo do z
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.myquad.display();
            this.scene.popMatrix();

        }
        
        
    }
}

