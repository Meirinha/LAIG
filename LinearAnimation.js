class LinearAnimation extends Animation{
  constructor(scene, points, duration) {
		super(scene);
		this.points = points;
		this.duration = duration;
    this.time = 0.0;
	};

  update(time, this.timePerPoint, this.vectors){
    this.time += time;


  };

  defineTimePoint()
  {
    this.distances[]=0.0;
    let totalDistance = 0.0;
    this.timePerPoint[] = 0.0;
    this.vectors[] = vec3.create();
    for(let i = 0; i < this.points.length - 1; i++)
    {
      vec3.subtract(this.vectors[i], this.points[i+1], this.points[i]);
      this.distances[i] = vec3.dist(this.points[i], this.points[i+1]);
      totalDistance += this.distances[i];
    }
    for(let i = 0; i < this.points.length - 1; i++)
    {
      this.timePerPoint[i] = this.distances[i]/totalDistance;
      this.vectors[i] /= this.timePerPoint;
    }
  }
}
