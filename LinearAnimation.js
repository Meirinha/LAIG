class LinearAnimation extends Animation {
    /** * @constructor */
    constructor(scene, id, duration, points) {
        super(scene, id, duration);
        this.points = points;
         this.transformationMat = mat4.create();
    }
    getTransformationMatrix(time) {
        //Scale time
        let scaledT = time % this.duration;

        //Time per transition
        let transitionT = (this.duration / (this.points.length - 1));

        //Next control point
        let nextPoint = Math.ceil(scaledT / transitionT);
        if (nextPoint == 0 || nextPoint > this.points.length - 1) {
            nextPoint = 1;
        }

        //Previous control point
        let previousPoint = nextPoint - 1;

        //console.log("===================");
        //console.log("Scalled time: " + scaledT);
        //console.log("Previous point: " + previousPoint);
        //console.log("Next point: " + nextPoint);

        //Vector from previous to next 
        let vec = {
            x: this.points[nextPoint][0] - this.points[previousPoint][0],
            y: this.points[nextPoint][1] - this.points[previousPoint][1],
            z: this.points[nextPoint][2] - this.points[previousPoint][2]
        }

        //Magnitude 
        let mag = Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);

        //If magnitude is 0 what to do?
        //Just use magnitude 1 for simplicity, still shouldn't happen 
        if (mag == 0)
            mag = 1;

        //Normalize 
        vec.x /= mag;
        vec.y /= mag;
        vec.z /= mag;

        //Time at next control point 
        let timeNext = transitionT * nextPoint;

        //Time at previous control point 
        let timePrevious = transitionT * previousPoint;

        //Current time percentage of time difference between control points 
        scaledT -= timePrevious;
        timeNext -= timePrevious;
        let percentageT = scaledT / timeNext;

        //Desired magnitude 
        let desiredMag = mag * percentageT;

        //Apply magnitude
        vec.x *= desiredMag;
        vec.y *= desiredMag;
        vec.z *= desiredMag;

        //http://glmatrix.net/docs/

        //Final position 
        let pos = vec3.fromValues(this.points[previousPoint][0] + vec.x, this.points[previousPoint][1] + vec.y, this.points[previousPoint][2] + vec.z);

        //Reset matrix 
        mat4.identity(this.transformationMat);

        //Apply to matrix;
        mat4.translate(this.transformationMat, this.transformationMat, pos);
        return this.transformationMat;
    }
}
