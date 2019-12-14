'use strict';

class Point {
  constructor(xCord, yCord) {
    this.x = xCord;
    this.y = yCord;
  }

  toString() {
    return `[Point @(${this.x},${this.y})]`;
  }
}

module.exports = Point;
