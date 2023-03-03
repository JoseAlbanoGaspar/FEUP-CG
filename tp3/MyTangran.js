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
        this.triangleSmall = new MyTriangleSmall(scene);
        this.triangleBig = new MyTriangleBig(scene);

        let color = this.scene.hexToRgbA('#FFFF00');
        this.yellow = new CGFappearance(this.scene);
        this.yellow.setAmbient(color[0], color[1], color[2], 1.0);
        this.yellow.setSpecular(1, 1, 1, 1.0);
        this.yellow.setDiffuse(color[0], color[1], color[2], 1.0);
        this.yellow.setShininess(10.0);

        color = this.scene.hexToRgbA('#E899C5');
        this.pink = new CGFappearance(this.scene);
        this.pink.setAmbient(color[0], color[1], color[2], 1.0);
        this.pink.setSpecular(1, 1, 1, 1.0);
        this.pink.setDiffuse(color[0], color[1], color[2], 1.0);
        this.pink.setShininess(10.0);

        color = this.scene.hexToRgbA('#A020F0');
        this.purple = new CGFappearance(this.scene);
        this.purple.setAmbient(color[0], color[1], color[2], 1.0);
        this.purple.setSpecular(1, 1, 1, 1.0);
        this.purple.setDiffuse(color[0], color[1], color[2], 1.0);
        this.purple.setShininess(10.0);

        color = this.scene.hexToRgbA('#00FF00');
        this.green = new CGFappearance(this.scene);
        this.green.setAmbient(color[0], color[1], color[2], 1.0);
        this.green.setSpecular(1, 1, 1, 1.0);
        this.green.setDiffuse(color[0], color[1], color[2], 1.0);
        this.green.setShininess(10.0);

        color = this.scene.hexToRgbA('#00BFFF');
        this.blue = new CGFappearance(this.scene);
        this.blue.setAmbient(color[0], color[1], color[2], 1.0);
        this.blue.setSpecular(1, 1, 1, 1.0);
        this.blue.setDiffuse(color[0], color[1], color[2], 1.0);
        this.blue.setShininess(10.0);

        color = this.scene.hexToRgbA('#FF0000');
        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(color[0], color[1], color[2], 1.0);
        this.red.setSpecular(1, 1, 1, 1.0);
        this.red.setDiffuse(color[0], color[1], color[2], 1.0);
        this.red.setShininess(10.0);

        color = this.scene.hexToRgbA('#FFA500');
        this.orange = new CGFappearance(this.scene);
        this.orange.setAmbient(color[0], color[1], color[2], 1.0);
        this.orange.setSpecular(1, 1, 1, 1.0);
        this.orange.setDiffuse(color[0], color[1], color[2], 1.0);
        this.orange.setShininess(10.0);

        this.custom = scene.customMaterial;

        this.colors = [this.yellow, this.pink, this.purple, this.green, this.blue, this.red, this.orange, this.custom];

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
        this.colors[7].apply();
        this.diamond.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0,Math.SQRT2,0);
        this.scene.rotate(- 3 * Math.PI / 4, 0, 0, 1);
        this.colors[1].apply();
        this.triangle.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-Math.SQRT2,0,0);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.scene.rotate( Math.PI , 1, 0, 0 );
        this.colors[0].apply();
        this.parallellogram.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix(); 
        this.scene.translate(-Math.SQRT2/2,-3 * Math.SQRT2 / 2,0);
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.colors[5].apply();
        this.triangleSmall.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(Math.SQRT2/2,3 * Math.SQRT2 / 2,0);
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.colors[2].apply();
        this.triangleSmall.display();
        this.scene.popMatrix();
        
        
        //INSERT HERE TRIANGLE BIG TRANSFORMATIONS
        this.scene.pushMatrix();
        this.scene.translate(2, 0, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.colors[4].apply();
        this.triangleBig.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(Math.SQRT2, -Math.SQRT2,0);
        this.scene.rotate(3 * Math.PI / 4, 0, 0, 1);
        this.colors[6].apply();
        this.triangleBig.display();
        this.scene.popMatrix();
        
    }
}

