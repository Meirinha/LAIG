class CircularAnimation extends Animation{

  constructor(scene, id, duration, center, radius, initang, rotang) {
		super(scene);
    this.id = id;
		this.center = center;
		this.duration = duration;
    this.radius = radius;
    this.initang = initang*DEGREE_TO_RAD;
    this.rotang = rotang*DEGREE_TO_RAD;
    this.velocity = this.duration/this.radius;

    this.transMatrix = mat4.create();
    this.totTime = this.rotang / this.velocity;
    this.secTimes.push(this.totTime);
	};

  getTransformMatrix(node, time, section) {
    if(time * this.velocity >=  this.rotang)
       this.animationEnd = true;
    else {
      mat4.identity(this.transMatrix);
      let dAlfa = this.initang + this.velocity* time;
      mat4.translate(this.transMatrix, this.transMatrix, [this.center[0], this.center[1], this.center[2] ]);
      mat4.rotate(this.transMatrix, this.transMatrix, dAlfa, [0, 1, 0]);
      mat4.translate(this.transMatrix, this.transMatrix, [this.radius, 0, 0]);
      mat4.rotate(this.transMatrix, this.transMatrix, Math.PI/2, [0, 1, 0]);
    }
    return this.transMatrix;
  };

};
