'use strict';

const isValueInRange = function(limit1, limit2, value) {
  const minLimit = Math.min(limit1, limit2);
  const maxLimit = Math.max(limit1, limit2);
  return value <= maxLimit && value >= minLimit;
};

class Point {
  constructor(xCord, yCord) {
    this.x = xCord;
    this.y = yCord;
  }

  toString() {
    return `[Point @(${this.x},${this.y})]`;
  }

  visit(operation) {
    return operation(this.x, this.y);
  }

  isEqualTo(other) {
    if (other instanceof Point) {
      return this.x === other.x && this.y === other.y;
    }
    return false;
  }

  findDistanceTo(other) {
    if (other instanceof Point) {
      const xCordDifference = this.x - other.x;
      const yCordDifference = this.y - other.y;
      const xCordDifferenceSquare = xCordDifference * xCordDifference;
      const yCordDifferenceSquare = yCordDifference * yCordDifference;
      return Math.sqrt(xCordDifferenceSquare + yCordDifferenceSquare);
    }
    return NaN;
  }

  isOn(line) {
    const isXCordInLine = isValueInRange(line.endA.x, line.endB.x, this.x);
    const isYCordInLine = isValueInRange(line.endA.y, line.endB.y, this.y);
    return isXCordInLine && isYCordInLine;
  }

  clone() {
    return new Point(this.x, this.y);
  }
}

module.exports = Point;
