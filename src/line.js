'use strict';

const Point = require('./point');

const getMidPoint = function(pointA, pointB) {
  const midXCord = (pointA.x + pointB.x) / 2;
  const midYCord = (pointA.y + pointB.y) / 2;
  return { x: midXCord, y: midYCord };
};

const getYIntersect = function(point, slope) {
  return point.y - slope * point.x;
};

const isValueInRange = function(limit1, limit2, value) {
  const minLimit = Math.min(limit1, limit2);
  const maxLimit = Math.max(limit1, limit2);
  return value <= maxLimit && value >= minLimit;
};

const getCoordinate = function(distanceRatio, end1Cord, end2Cord) {
  return (1 - distanceRatio) * end1Cord + distanceRatio * end2Cord;
};

class Line {
  constructor(endA, endB) {
    this.endA = new Point(endA.x, endA.y);
    this.endB = new Point(endB.x, endB.y);
  }

  toString() {
    const endA = `(${this.endA.x},${this.endA.y})`;
    const endB = `(${this.endB.x},${this.endB.y})`;
    return `[Line ${endA} to ${endB}]`;
  }

  isEqualTo(other) {
    if (other instanceof Line) {
      const areEndAEqual = this.endA.isEqualTo(other.endA);
      const areEndBEqual = this.endB.isEqualTo(other.endB);

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
    const halfLine1 = new Line(this.endA, midPoint);
    const halfLine2 = new Line(midPoint, this.endB);
    return [halfLine1, halfLine2];
  }

  findX(yCord) {
    if (isValueInRange(this.endA.y, this.endB.y, yCord)) {
      const yIntersect = getYIntersect(this.endA, this.slope);
      return (yCord - yIntersect) / this.slope;
    }
    return NaN;
  }

  findY(xCord) {
    if (isValueInRange(this.endA.x, this.endB.x, xCord)) {
      const yIntersect = getYIntersect(this.endA, this.slope);
      return this.slope * xCord + yIntersect;
    }
    return NaN;
  }

  hasPoint(point) {
    const yIntersect = getYIntersect(this.endA, this.slope);
    const isPointSatisfiesLineEqn =
      point.y === this.slope * point.x + yIntersect;
    const isXCordInLine = isValueInRange(this.endA.x, this.endB.x, point.x);
    const isYCordInLine = isValueInRange(this.endA.y, this.endB.y, point.y);
    return isXCordInLine && isYCordInLine && isPointSatisfiesLineEqn;
  }

  findPointFromStart(distance) {
    const distanceRatio = distance / this.length;
    const xCord = getCoordinate(distanceRatio, this.endA.x, this.endB.x);
    const yCord = getCoordinate(distanceRatio, this.endA.y, this.endB.y);
    return new Point(xCord, yCord);
  }

  findPointFromEnd(distance) {
    const reversedLine = new Line(this.endB, this.endA);
    return reversedLine.findPointFromStart(distance);
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
