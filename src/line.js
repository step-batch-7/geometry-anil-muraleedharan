'use strict';

const arePointsEqual = function(pointA, pointB) {
  const areXsEqual = pointA.x === pointB.x;
  const areYsEqual = pointA.y === pointB.y;
  return areXsEqual && areYsEqual;
};

class Line {
  constructor(endA, endB) {
    this.endA = { x: endA.x, y: endA.y };
    this.endB = { x: endB.x, y: endB.y };
  }

  toString() {
    const endA = `(${this.endA.x}, ${this.endA.y})`;
    const endB = `(${this.endB.x}, ${this.endB.y})`;
    return `Line ${endA}-------------${endB}`;
  }

  isEqualTo(other) {
    if (other instanceof Line) {
      const areEndAEqual = arePointsEqual(this.endA, other.endA);
      const areEndBEqual = arePointsEqual(this.endB, other.endB);
      return areEndAEqual && areEndBEqual;
    }
    return false;
  }
}

module.exports = Line;
