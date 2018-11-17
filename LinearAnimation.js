class LinearAnimation extends Animation {
    constructor(scene, id, duration, points) {
        super(scene);
        this.id = id;
        this.points = points;
        this.duration = duration;
        this.time = 0.0;
        this.initValues = new Array();
        this.totalDistance = 0;
        this.animationVelocity = 0;


    for (let i = 0; i < points.length-1; i++){
      let values = new Array();
      let distance = vec3.distance(points[i], points[i+1]);

      this.totalDistance += distance;

      let cosAlfa = (points[i+1][0] - points[i][0])/distance;
      let senAlfa = (points[i+1][2] - points[i][2])/distance;
      let dy = points[i+1][1] - points[i][1];
      if(dy !== 0){
        dy /= Math.abs(points[i+1][1] - points[i][1]);
      }

      let alfa = Math.acos(cosAlfa);

      let vx = animationVelocity * cosAlfa;
      let vz = animationVelocity * senAlfa;
      let vy = Math.sqrt(Math.round((this.animationVelocity * this.animationVelocity - vx*vx - vz*vz)*1000)/1000)*dy;
      this.secTimes.push(dist/this.animationVelocity);
      values.push(vx, vy, vz, alfa);
      this.initValues.push(values);
    }
    this.totalTime = this.totalDistance / this.animationVelocity;
    this.transformMatrix = mat4.create();


    };
    getTransformationMatrix(time, currentSection){};

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
    };
};
