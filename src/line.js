'use strict';

const arePointsEqual = function(pointA, pointB) {
  const areXsEqual = pointA.x === pointB.x;
  const areYsEqual = pointA.y === pointB.y;
  return areXsEqual && areYsEqual;
};

const getMidPoint = function(pointA, pointB) {
  const midXCord = (pointA.x + pointB.x) / 2;
  const midYCord = (pointA.y + pointB.y) / 2;
  return { x: midXCord, y: midYCord };
};

const getYIntersect = function(point, slope) {
  return point.y - slope * point.x;
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

  split() {
    const midPoint = getMidPoint(this.endA, this.endB);
    const HalfLine1 = new Line(this.endA, midPoint);
    const HalfLine2 = new Line(midPoint, this.endB);
    return [HalfLine1, HalfLine2];
  }

  findX(yCord) {
    const yIntersect = getYIntersect(this.endA, this.slope);
    return (yCord - yIntersect) / this.slope;
  }

  findY(xCord) {
    const yIntersect = getYIntersect(this.endA, this.slope);
    return this.slope * xCord + yIntersect;
  }

  hasPoint(point) {
    const maxOfXCords = Math.max(this.endA.x, this.endB.x);
    const minOfXCords = Math.min(this.endA.x, this.endB.x);
    const maxOfYCords = Math.max(this.endA.y, this.endB.y);
    const minOfYCords = Math.min(this.endA.y, this.endB.y);
    const isXCordInLine = point.x <= maxOfXCords && point.x >= minOfXCords;
    const isYCordInLine = point.y <= maxOfYCords && point.y >= minOfYCords;
    return isXCordInLine && isYCordInLine;
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
