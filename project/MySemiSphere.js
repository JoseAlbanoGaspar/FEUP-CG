import { CGFobject } from '../lib/CGF.js';

/**
 * MySemiSphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - radius of the sphere
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 */
export class MySemiSphere extends CGFobject {
    constructor(scene, radius, slices, stacks, inverted=false) {
        super(scene);
        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;
        this.inverted = inverted;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var phi = 0;
        var theta = 0;
        var deltaPhi = Math.PI / (2 * this.stacks);
        var deltaTheta = 2 * Math.PI / this.slices;

        for (var i = 0; i <= this.stacks; i++) {
            phi = i * deltaPhi;
            for (var j = 0; j <= this.slices; j++) {
                theta = j * deltaTheta;

                var x = this.radius * Math.sin(phi) * Math.cos(theta);
                var y = this.radius * Math.sin(phi) * Math.sin(theta);
                var z = this.radius * Math.cos(phi);

                this.vertices.push(x, y, z);
                
                this.inverted? this.normals.push(-x / this.radius, -y / this.radius, -z / this.radius):
                    this.normals.push(x / this.radius, y / this.radius, z / this.radius);

                this.texCoords.push(j / this.slices, i / this.stacks);
            }
        }

        for (var i = 0; i < this.stacks; i++) {
            for (var j = 0; j < this.slices; j++) {
                var first = i * (this.slices + 1) + j;
                var second = first + this.slices + 1;
                if (!this.inverted) {
                    this.indices.push(first + 1, second, first);
                    this.indices.push(first + 1, second + 1, second);
                }
                else {
                    this.indices.push(first, second, first + 1);
                    this.indices.push(second, second + 1, first + 1);
                }

            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}