import { CGFscene, CGFcamera, CGFaxis, CGFtexture, CGFappearance } from "../lib/CGF.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyBird } from "./MyBird.js";
import { MyNest } from "./MyNest.js";
import { MyBirdEggs } from "./MyBirdEggs.js";

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

    //loading textures
    this.panoramaText = new CGFtexture(this, 'images/panorama4.jpg');
    
    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.bird = new MyBird(this, 0, 3, 0, 0, 0);
    this.panoramaSphere = new MyPanorama(this, this.panoramaText);
    this.terrain = new MyTerrain(this, this.texture, this.texture2);
    this.bird = new MyBird(this);
    this.panoramaSphere = new MyPanorama(this, this.panoramaText);
    this.nest = new MyNest(this, 3, 30, 30);

    this.eggs = new MyBirdEggs(this, 1.3);
    

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
    }

    if (this.gui.isKeyPressed("KeyS")) {
      text += " S ";
      keyPressed = true;
    }

    if (this.gui.isKeyPressed("KeyA")) {
      text += " A ";
      keyPressed = true;
    }

    if (this.gui.isKeyPressed("KeyD")) {
      text += " D ";
      keyPressed = true;
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
    this.bird.display();
    this.popMatrix();
    this.pushMatrix();
    this.nest.display();
    this.popMatrix();
    this.pushMatrix();
    this.eggs.display();
    this.popMatrix();

    // ---- END Primitive drawing section
  }
}
