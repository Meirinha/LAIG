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
        this.distances = new Array();
        this.sectionTime = new Array();


    for (let i = 0; i < points.length-1; i++){
      let values = new Array();
      let distance = vec3.distance(points[i], points[i+1]);
      this.distances.push(distance);
      this.totalDistance += distance;
}
    this.animationVelocity = this.totalDistance/this.duration;
    for (let i = 0; i < points.length-1; i++){
      let cosAlfa = (points[i+1][0] - points[i][0])/this.distances[i];
      let senAlfa = (points[i+1][2] - points[i][2])/this.distances[i];
      let dy = points[i+1][1] - points[i][1];
      if(dy !== 0){
        dy /= Math.abs(points[i+1][1] - points[i][1]);
      }

      let alfa = Math.acos(cosAlfa);

      let vx = this.animationVelocity * cosAlfa;
      let vz = this.animationVelocity * senAlfa;
      let vy = Math.sqrt(Math.round((this.animationVelocity * this.animationVelocity - vx*vx - vz*vz)*1000)/1000)*dy;
      this.sectionTime.push(this.distances[i]/this.animationVelocity);
      values.push(vx, vy, vz, alfa);
      this.initValues.push(values);
    }
    this.transformMatrix = mat4.create();
    };

    getTransformationMatrix(time, currentSection){
      let sectionTime = time;
    for(let i = 0; i < currentSection; i++)
      sectionTime -= this.sectionTime[i];


    if(currentSection < this.points.length - 1){
      mat4.identity(this.transformMatrix);
      let dx = sectionTime * this.initValues[currentSection][0];
      let dy = sectionTime * this.initValues[currentSection][1];
      let dz = sectionTime * this.initValues[currentSection][2];

      mat4.translate(this.transformMatrix, this.transformMatrix, [dx, dy, dz]);
      mat4.translate(this.transformMatrix, this.transformMatrix,
         [this.points[currentSection][0],
         this.points[currentSection][1],
         this.points[currentSection][2]]);

      mat4.rotate(this.transformMatrix, this.transformMatrix, this.initValues[currentSection][3], [0, 1, 0]);
    }
    else
      this.animationEnd = true;

    return this.transformMatrix;

    };
};
