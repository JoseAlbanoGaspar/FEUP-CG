import {CGFobject,  CGFappearance} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js"
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
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
        this.triangleSmall = new MyTriangleSmall(scene, true);
        this.MyTriangleSmallPurple = new MyTriangleSmall(scene, false);
        this.triangleBig = new MyTriangleBig(scene, false);
        this.triangleBigOrange = new MyTriangleBig(scene, true);


        let color = this.scene.hexToRgbA('#FFFFFF');
        this.green = new CGFappearance(this.scene);
        this.green.setAmbient(color[0], color[1], color[2], 1.0);
        this.green.setSpecular(1, 1, 1, 1.0);
        this.green.setDiffuse(color[0], color[1], color[2], 1.0);
        this.green.setShininess(10.0);

        

        this.green.loadTexture('images/tangram.png');
        
        this.initBuffers();
	}
	

    enableNormalViz(){
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.parallellogram.enableNormalViz();
        this.triangleSmall.enableNormalViz();
        this.triangleBig.enableNormalViz();
    }

    disableNormalViz(){
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.parallellogram.disableNormalViz();
        this.triangleSmall.disableNormalViz();
        this.triangleBig.disableNormalViz();
    }

    display(){
        this.green.apply();
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
        this.MyTriangleSmallPurple.display();
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
        this.triangleBigOrange.display();
        this.scene.popMatrix();
        
    }
}

