import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js"
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyUnitCubeQuad } from './MyUnitCubeQuad.js';

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangran extends CGFobject {
    

	constructor(scene) {
		super(scene);
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallellogram = new MyParallelogram(scene);
        this.triangleSmall = new MyTriangleSmall(scene);
        this.triangleBig = new MyTriangleBig(scene);
        this.unitCube = new MyUnitCube(scene);
        //this.unitCubeQuad = new MyUnitCubeQuad(scene);
	}
	
	

    display(){
        if(this.scene.displayTangran){ 
            this.scene.pushMatrix();
            
            let matrixRotate = [
              Math.cos(Math.PI/4), Math.sin(Math.PI/4), 0, 0,
              -Math.sin(Math.PI/4), Math.cos(Math.PI/4), 0, 0,
              0, 0, 1, 0,
              0, 0, 0, 1
            ];
            let tr = [ // translação (-1,-1,0)
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
             -Math.SQRT2/2 , -Math.SQRT2/2 , 0, 1
            ];
            
      
            this.scene.multMatrix(tr);
            this.scene.multMatrix(matrixRotate);
            
      
            this.diamond.display();
            
            this.scene.popMatrix();
            
                 
            this.scene.pushMatrix();
            this.scene.translate(0,Math.SQRT2,0);
            this.scene.rotate(- 3 * Math.PI / 4, 0, 0, 1);
            this.triangle.display();
            this.scene.popMatrix();
          
            this.scene.pushMatrix();
            this.scene.translate(-Math.SQRT2,0,0);
            this.scene.rotate(Math.PI / 4, 0, 0, 1);
            this.scene.rotate( Math.PI , 1, 0, 0 );
            this.parallellogram.display();
            this.scene.popMatrix();
          
            this.scene.pushMatrix(); 
            this.scene.translate(-Math.SQRT2/2,-3 * Math.SQRT2 / 2,0);
            this.scene.rotate(-Math.PI/4, 0, 0, 1);
            this.triangleSmall.display();
            this.scene.popMatrix();
            this.scene.pushMatrix();
            this.scene.translate(Math.SQRT2/2,3 * Math.SQRT2 / 2,0);
            this.scene.rotate(-Math.PI/4, 0, 0, 1);
            this.triangleSmall.display();
            this.scene.popMatrix();
            
            
            //INSERT HERE TRIANGLE BIG TRANSFORMATIONS
            this.scene.pushMatrix();
            this.scene.translate(2, 0, 0);
            this.scene.rotate(Math.PI, 0, 0, 1);
            this.triangleBig.display();
            this.scene.popMatrix();
            
            this.scene.pushMatrix();
            this.scene.translate(Math.SQRT2, -Math.SQRT2,0);
            this.scene.rotate(3 * Math.PI / 4, 0, 0, 1);
            this.triangleBig.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0.5, 0.5, -0.5);
            this.unitCube.display();
            this.scene.popMatrix();

            /*
            this.scene.pushMatrix();
            this.scene.translate(0.5, 0.5, -0.5);
            this.unitCubeQuad.display();
            this.scene.popMatrix();
            */
        }
    }
}

