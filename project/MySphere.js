import { CGFobject } from '../lib/CGF.js';

export class MySphere extends CGFobject {
  constructor(scene, radius, slices, stacks, inverted) {
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
    
    for (let i = 0; i <= this.stacks; i++) {
      let theta = i * Math.PI / this.stacks;
      let sinTheta = Math.sin(theta);
      let cosTheta = Math.cos(theta);

      for (let j = 0; j <= this.slices; j++) {
        let phi = j * 2 * Math.PI / this.slices;
        let sinPhi = Math.sin(phi);
        let cosPhi = Math.cos(phi);

        let x = cosPhi * sinTheta;
        let y = cosTheta;
        let z = sinPhi * sinTheta;

        let u = j / this.slices;
        let v = i / this.stacks;

        this.vertices.push(this.radius * x, this.radius * y, this.radius * z);
        
        this.inverted ? this.normals.push(-x, -y, -z) : this.normals.push(x, y, z);
        this.texCoords.push(u, v);
      }
    }

    for (let i = 0; i < this.stacks; i++) {
      for (let j = 0; j < this.slices; j++) {
        let a = i * (this.slices + 1) + j;
        let b = a + this.slices + 1;
        if(this.inverted){
          this.indices.push(a, b, a + 1);
          this.indices.push(b, b + 1, a + 1);
        }
        else{
          this.indices.push(a + 1, b , a);
          this.indices.push(a + 1, b + 1, b);
        }
      }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
