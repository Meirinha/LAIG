class CircularAnimation extends Animation{

  constructor(scene, id, duration, center, radius, initang, rotang) {
		super(scene);
    this.id = id;
		this.center = center;
		this.duration = duration;
    this.radius = radius;
    this.initang = initang*DEGREE_TO_RAD;
    this.rotang = rotang*DEGREE_TO_RAD;
    this.time = 0.0;
	};

};
