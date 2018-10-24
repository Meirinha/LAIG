class LinearAnimation extends Animation{
  constructor(scene, points, duration) {
		super(scene);
		this.points = points;
		this.duration = duration;
    this.time = 0.0;
	};

  update(time){
    this.time += time;
    for(let i = 0; i<timePerPoint.length; i++){
      if(this.time <= this.sumTime[i]){
        //aplica transformaçao entre 2 pontos distintos
      }
    }
  };

  defineTimePoint()
  {
    this.distances[]=0.0;
    let totalDistance = 0.0;
    this.timePerPoint[] = 0.0;
    this.vectors[] = vec3.create();

    this.sumTime[] = 0.0;
    for(let i = 0; i < this.points.length - 1; i++)
    {
      vec3.subtract(this.vectors[i], this.points[i+1], this.points[i]);
      this.distances[i] = vec3.dist(this.points[i], this.points[i+1]);
      totalDistance += this.distances[i];
    }
    for(let i = 0; i < this.points.length - 1; i++)
    {
      this.timePerPoint[i] = this.duration * this.distances[i]/totalDistance;
      if(i>0)
        this.sumTime[i] = this.timePerPoint[i] + this.sumTime[i-1];
      else {
        this.sumTime[i] = this.timePerPoint[i];
      }
      this.vectors[i] /= this.timePerPoint;
    }
  }
}
