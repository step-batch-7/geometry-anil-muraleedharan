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

const areCollinear = function(pointA, pointB, pointC) {
  const [x1, y1] = [pointA.x, pointA.y];
  const [x2, y2] = [pointB.x, pointB.y];
  const [x3, y3] = [pointC.x, pointC.y];
  return x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2) == 0;
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
    if (!other instanceof Line) return false;
    return (
      (this.endA.isEqualTo(other.endA) && this.endB.isEqualTo(other.endB)) ||
      (this.endA.isEqualTo(other.endB) && this.endB.isEqualTo(other.endA))
    );
  }

  isParallelTo(other) {
    if (!other instanceof Line) return false;
    return (
      this.slope === other.slope &&
      !areCollinear(this.endA, this.endB, other.endA)
    );
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
    const areXInLine = isValueInRange(this.endA.x, this.endB.x, point.x);
    const areYInLine = isValueInRange(this.endA.y, this.endB.y, point.y);
    return (
      areXInLine && areYInLine && areCollinear(this.endA, this.endB, point)
    );
  }

  findPointFromStart(distance) {
    const distanceRatio = distance / this.length;
    if (!isValueInRange(0, 1, distanceRatio)) return null;
    const xCord = getCoordinate(distanceRatio, this.endA.x, this.endB.x);
    const yCord = getCoordinate(distanceRatio, this.endA.y, this.endB.y);
    return new Point(xCord, yCord);
  }

  findPointFromEnd(distance) {
    const reversedLine = new Line(this.endB, this.endA);
    return reversedLine.findPointFromStart(distance);
  }

  get length() {
    return this.endA.findDistanceTo(this.endB);
  }

  get slope() {
    const xCordDifference = this.endA.x - this.endB.x;
    const yCordDifference = this.endA.y - this.endB.y;
    return yCordDifference / xCordDifference;
  }
}

module.exports = Line;
