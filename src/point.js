'use strict';

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

  clone() {
    return new Point(this.x, this.y);
  }
}

module.exports = Point;
