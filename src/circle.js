const Point = require('../src/point');

class Circle {
  constructor(centre, radius) {
    this.centre = new Point(centre.x, centre.y);
    this.radius = radius;
  }

  toString() {
    return `[Circle @(${this.centre.x}, ${this.centre.y}) radius ${this.radius}]`;
  }
}

module.exports = Circle;
