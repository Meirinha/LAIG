class LinearAnimation extends Animation {
  constructor(scene, id, duration, points) {
    super(scene);
    this.id = id;
    this.points = points;
    this.duration = duration;
    this.time = 0.0;
  };

  update(time) {
    this.time += time;
    this.matrix = mat4.create();
    for (let i = 0; i < timePerPoint.length; i++) {
      if (this.time <= this.sumTime[i]) {
        //aplica transformaçao entre 2 pontos distintos
        //aplicar sempre angulo
        if (i != 0) {
          vector = this.vectors[i].scale(this.sumTime[i - 1] - this.time);
        } else {
          vector = this.vectors[i].scale(this.time);
        }
        mat4.translate(matrix, matrix, vector);
        break;
        vector = vec3.fromValues(0, 1, 0);
        this.innerAngle = vec3.angle(this.vectors[i], this.vectors[i + 1]);
        angle = (360 * DEGREE_TO_RAD) - this.innerAngle;
        mat4.rotate(matrix, matrix, angle, vector);
      }
    }
  };

  defineTimePoint() {
    this.distances = [0.0];
    let totalDistance = 0.0;
    this.timePerPoint = [0.0];
    this.vectors = [];

    this.sumTime = [0.0];
    for (let i = 0; i < this.points.length - 1; i++) {
      vec3.subtract(this.vectors[i], this.points[i + 1], this.points[i]);
      this.distances[i] = vec3.dist(this.points[i], this.points[i + 1]);
      totalDistance += this.distances[i];
    }
    for (let i = 0; i < this.points.length - 1; i++) {
      this.timePerPoint[i] = this.duration * this.distances[i] / totalDistance;
      if (i > 0)
        this.sumTime[i] = this.timePerPoint[i] + this.sumTime[i - 1];
      else {
        this.sumTime[i] = this.timePerPoint[i];
      }
      this.vectors[i] /= this.timePerPoint;
    }
  }
}