import {CGFobject,  CGFappearance, CGFshader, CGFtexture} from '../lib/CGF.js';
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

	constructor(scene, ang, velocity, pos_x, pos_y, pos_z, allEggs) {
		super(scene);
        this.body = new MySphere(scene, 3, 30, 30);
        this.eye = new MySphere(scene, 0.5, 15, 15);
        this.beak = new MyCone(scene,30,10);
        this.wingLeft = new MyWings(scene, true);
        this.wingRight = new MyWings(scene, false);
        this.paw = new MyPaw(scene);
        
        // egg movement
        this.inicial_posy = pos_y;
        this.eggVelocity = 0;
        this.eggAng = 0;

        this.shader = new CGFshader(scene.gl, "shaders/birdAnimation.vert", "shaders/birdAnimation.frag")
        this.shader.setUniformsValues({ normScale: 1, timeFactor: 0 });

        let color = this.scene.hexToRgbA('#FFFFFF');
        let red = new CGFappearance(this.scene);
        red.setAmbient(color[0], color[1], color[2], 1.0);
        red.setSpecular(1, 1, 1, 1.0);
        red.setDiffuse(color[0], color[1], color[2], 1.0);
        red.setShininess(10.0);
        red.setTexture(new CGFtexture(scene, 'images/bird-body-texture.jpg'));

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
        this.ang = ang;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.pos_z = pos_z;
        this.velocity = velocity;
        this.wingRotation;
        this.initBuffers();
        scene.setUpdatePeriod(50);

        this.gettingDown = false;
        this.gettingUp = false;
        this.droppingEgg = false;

        this.allEggs = allEggs;
        this.catchedEgg = null;
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
        this.heigth = Math.sin(2 * Math.PI / 10 * (t / 100 % 10 + 5) );
        //maybe the 1000/10 change with the velocity
        let velInc = this.velocity == 0 ? 1 :  (this.velocity / 0.2 + 1) * 0.5;
        this.wingRotation = Math.sin((2 * Math.PI) / (10 * velInc) * (t * velInc / 100 % 10) * velInc) * (Math.PI / 6) ;  // roda entre [ - Math.PI / 6, Math.PI / 6]
        

        this.pos_x += this.velocity * Math.sin(this.ang) * 1.2;
        this.pos_z += this.velocity * Math.cos(this.ang) * 1.2;
       
        if (this.catchedEgg != null) {
            if (!this.droppingEgg) { // egg with the bird
                this.catchedEgg.x = this.pos_x+0.9;
                this.catchedEgg.y = this.pos_y-8;
                this.catchedEgg.z = this.pos_z-3.6;
            } else {
                //this.droppingEgg = true; // drop the egg
                
            }
        }
    }

    checkEgg() {
        
        for(let i=0; i<this.allEggs.length; i++){
            if(this.pos_x >= (this.allEggs[i].x - 5) && this.pos_x <= (this.allEggs[i].x + 5) && this.pos_z >= (this.allEggs[i].z - 5) && this.pos_z <= (this.allEggs[i].z + 5)) {
                console.log("TOCOU NO OVO");
                console.log(this.catchedEgg);
                return this.allEggs[i];
            }
        }
        return null;
    }

    dropEgg(){
        if(this.catchedEgg.y > -58){
            this.catchedEgg.y -= (58 - (-this.inicial_posy))/30;
            this.catchedEgg.z += this.eggVelocity * Math.cos(this.eggAng) * 1.2;
            this.catchedEgg.x += this.eggVelocity * Math.sin(this.eggAng) * 1.2;
            this.catchedEgg.display();
        }

        else {
            this.droppingEgg = false;
            this.catchedEgg = null;
        }
            

    }
    
    turn(key){
        if(key=="D"){
            this.ang -= 0.1;
        }

        else if(key=="A"){
            this.ang += 0.1;
        }
    }

    accelerate(key) {
        if(key=="W"){
            this.velocity += 0.2;
        }

        else if(key=="S"){
            this.velocity = Math.max(0, this.velocity - 0.2);
        }
    }

    down(){
        this.pos_y -= (58 - (-this.inicial_posy))/30;
        this.checkEgg();
    }

    up(){
        this.pos_y += (58 - (-this.inicial_posy))/30;
    }

    reset() {
        this.pos_x = 0;
        this.pos_y = 0;
        this.pos_z = 0;
        this.velocity = 0;
        this.ang = 0;
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.pos_x, this.pos_y + this.heigth, this.pos_z);
        this.scene.rotate(this.ang - Math.PI/2, 0, 1, 0);
        this.colors["BODY"].apply();
        this.body.display();
  
        this.scene.pushMatrix();
        this.scene.translate(-4.5, -3, 0);
        this.scene.rotate(Math.PI /1.7, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(1, 1.5, 1);
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
        this.scene.translate(-4.5,-2,-1);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(2.1, 1.9, 1.5);
        this.scene.rotate(this.wingRotation, 0, 0, 1);
        this.scene.translate(1 ,0, 0);
        this.wingLeft.display();
        this.scene.popMatrix();

        
        this.scene.pushMatrix();
        this.scene.translate(-4.5,-2,1);
        this.scene.rotate(Math.PI, 1,0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(2.1, 1.9, 1.5);
        this.scene.rotate(-this.wingRotation, 0, 0, 1);
        this.scene.translate(1 ,0, 0);
        this.wingRight.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(-4.5,-3,2);
        this.scene.rotate(Math.PI, 1,0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.paw.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}

