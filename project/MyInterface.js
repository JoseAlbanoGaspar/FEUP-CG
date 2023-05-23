import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function(){};
        this.activeKeys = {};       //array with keys pressed
    }

    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    }

    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    }

    isKeyPressed(keyCode){
        return this.activeKeys[keyCode] || false;
    }



    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, "toggleShader").name("Toggle Shader");

        
        //Slider speed Factor and scale Factor
        this.gui.add(this.scene, 'speedFactor', 0, 3, 0.2).name('Speed Factor');
        this.gui.add(this.scene, 'otherScaleFactor', 0.5, 3).name('Scale Factor');

        this.initKeys();

        return true;
    }
}