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
    const endA = `(${this.endA.x},${this.endA.y})`;
    const endB = `(${this.endB.x},${this.endB.y})`;
    return `[Line ${endA} to ${endB}]`;
  }

  isEqualTo(other) {
    if (other instanceof Line) {
      const areEndAEqual = arePointsEqual(this.endA, other.endA);
      const areEndBEqual = arePointsEqual(this.endB, other.endB);
      return areEndAEqual && areEndBEqual;
    }
    return false;
  }

  isParallelTo(other) {
    if (other instanceof Line) {
      return this.slope === other.slope;
    }
    return false;
  }

  get length() {
    const xCordDifference = this.endA.x - this.endB.x;
    const yCordDifference = this.endA.y - this.endB.y;
    const xCordDifferenceSquare = xCordDifference * xCordDifference;
    const yCordDifferenceSquare = yCordDifference * yCordDifference;
    return Math.sqrt(xCordDifferenceSquare + yCordDifferenceSquare);
  }

  get slope() {
    const xCordDifference = this.endA.x - this.endB.x;
    const yCordDifference = this.endA.y - this.endB.y;
    return yCordDifference / xCordDifference;
  }
}

module.exports = Line;
