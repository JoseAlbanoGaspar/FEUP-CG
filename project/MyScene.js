import { CGFscene, CGFcamera, CGFaxis, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyBird } from "./MyBird.js";
import { MyNest } from "./MyNest.js";
import { MyBirdEggs } from "./MyBirdEggs.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./MyTreeRowPatch.js"; 

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {

  constructor() {
    super();
  }

  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.selectedShader = 0;
    this.speedFactor = 0;
    this.otherScaleFactor = 1;
    this.toggleShader = false;

    //loading textures
    this.panoramaText = new CGFtexture(this, 'images/panorama4.jpg');
    
    //Initialize scene objects
    this.axis = new CGFaxis(this);
    
    this.panoramaSphere = new MyPanorama(this, this.panoramaText);
    this.terrain = new MyTerrain(this, this.texture, this.texture2);
    this.panoramaSphere = new MyPanorama(this, this.panoramaText);
    this.nest = new MyNest(this, 3, 30, 30);

    this.allEggs = [];
    for(let i = 1; i < 6; i++){
      this.allEggs.push(new MyBirdEggs(this, 1.4, 1.2, -60 + i*4, -58, 65));
    }
  
    this.bird = new MyBird(this, 0, this.speedFactor, 0, 0, 0, this.allEggs);
    this.billboardShader = new CGFshader(this.gl, "shaders/bilboardtree.vert", "shaders/bilboardtree.frag");
    this.patch = new MyTreeGroupPatch(this, this.billboardShader);
    this.row = new MyTreeRowPatch(this, this.billboardShader); 
    this.enableTextures(true);

  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  hexToRgbA(hex) {
    var ret;
    //either we receive a html/css color or a RGB vector
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        ret=[
            parseInt(hex.substring(1,3),16).toPrecision()/255.0,
            parseInt(hex.substring(3,5),16).toPrecision()/255.0,
            parseInt(hex.substring(5,7),16).toPrecision()/255.0,
            1.0
        ];
    }
    else
        ret=[
            hex[0].toPrecision()/255.0,
            hex[1].toPrecision()/255.0,
            hex[2].toPrecision()/255.0,
            1.0
        ];
    return ret;

  }
    
  checkKeys() {
    var text = "Key pressed: ";
    var keyPressed = false;
    
    if (this.gui.isKeyPressed("KeyW")) {
      text += " W ";
      keyPressed = true;
      this.bird.accelerate("W");
    }

    if (this.gui.isKeyPressed("KeyS")) {
      text += " S ";
      keyPressed = true;
      this.bird.accelerate("S");
    }

    if (this.gui.isKeyPressed("KeyA")) {
      text += " A ";
      keyPressed = true;
      this.bird.turn("A");
    }

    if (this.gui.isKeyPressed("KeyD")) {
      text += " D ";
      keyPressed = true;
      this.bird.turn("D");
    }

    if (this.gui.isKeyPressed("KeyR")) {
      text += " R ";
      keyPressed = true;
      this.bird.reset("R");
    }
    
    if (!this.bird.isGoingDown() && !this.bird.isGoingUp()) {
      if (this.gui.isKeyPressed("KeyP")){
        text += "P";
        keyPressed = true;
        this.bird.down();
      }
    } else {
        this.bird.upDownMovement();     
    }

    if(this.bird.hasCatchedEgg()){

      if(this.gui.isKeyPressed("KeyO") && this.bird.getPosX() > -55 && this.bird.getPosX() < -35 && this.bird.getPosZ() < -35 && this.bird.getPosZ() > -55){
        text += " O ";
        keyPressed = true;
        this.bird.initEggDrop();
  
      }

    }

    if(this.bird.droppingEgg){
      this.bird.dropEgg();
      //this.nest.checkEggInNest();
    }
    

    if (keyPressed){
      console.log(text);
    }
  }  

  // called periodically (as per setUpdatePeriod() in init())
	update(t) {
    this.bird.update(t);
    this.checkKeys();
	}

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section
    
    this.terrain.display();    
    this.panoramaSphere.display(this.camera.position);

    this.pushMatrix();
    this.scale(this.otherScaleFactor,this.otherScaleFactor,this.otherScaleFactor);
    this.bird.display(this.toggleShader, this.speedFactor);
    this.popMatrix();
    this.pushMatrix();
    this.nest.display();
    this.popMatrix();
    
    for(let i = 0; i < this.allEggs.length; i++){
      this.pushMatrix();
      this.allEggs[i].display();
      this.popMatrix();
    }
  
    this.setActiveShader(this.billboardShader);
    let treePos = vec3.fromValues(-100,-62 ,-65);
    this.patch.display(treePos, this.camera.position);
    treePos = vec3.fromValues(-110,-62 ,-25);
    this.patch.display(treePos, this.camera.position);

    treePos = vec3.fromValues(-90,-62 ,-70);
    this.pushMatrix();
    this.rotate(Math.PI / 2, 0, 1, 0);
    this.row.display(treePos, this.camera.position);
    this.popMatrix();
    this.setActiveShader(this.defaultShader);
    // ---- END Primitive drawing section
  }
}
