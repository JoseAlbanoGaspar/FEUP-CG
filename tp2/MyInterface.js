import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Checkbox diamond controller
        this.gui.add(this.scene, 'displayDiamond').name('Diamond');

        //Checkbox triangle controller
        this.gui.add(this.scene, 'displayTriangle').name('Triangle');

        //Checkbox parallelogram controller
        this.gui.add(this.scene, 'displayParallelogram').name('Parallelogram');

        //Checkbox small triangle controller
        this.gui.add(this.scene, 'displayTriangleSmall').name('TriangleSmall');

        //Checkbox big triangle controller
        this.gui.add(this.scene, 'displayTriangleBig').name('TriangleBig');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        //tangran checkbox
        this.gui.add(this.scene, 'displayTangran').name('Tangran');

        return true;
    }
}