class CircularAnimation extends Animation {

  constructor(scene, id, duration, center, radius, startang, rotang) {
    super(scene, id, duration);
    this.id = id;
    this.center = center;
    this.radius = radius;
    this.startang = startang * DEGREE_TO_RAD;
    this.rotang = rotang * DEGREE_TO_RAD;
    this.angSpeed = this.rotang / this.duration;

    this.time = 0.0;

    this.transformMatrix = mat4.create();
    };

  getTransformationMatrix(delta) {
    this.time = delta;
    if (this.time >= this.duration)
      this.animationEnd = true;
    else {
      mat4.identity(this.transformMatrix);
      let dAlfa = this.startang + this.angSpeed * this.time;
      mat4.translate(this.transformMatrix, this.transformMatrix, [this.center[0], this.center[1], this.center[2]]);
      mat4.rotate(this.transformMatrix, this.transformMatrix, dAlfa, [0, 1, 0]);
      mat4.translate(this.transformMatrix, this.transformMatrix, [this.radius, 0, 0]);
      mat4.rotate(this.transformMatrix, this.transformMatrix, Math.PI/2, [0, 1, 0]);
    }
    return this.transformMatrix;
  };
};
