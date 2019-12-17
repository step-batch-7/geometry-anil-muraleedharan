const Point = require('../src/point');

class Circle {
  constructor(centre, radius) {
    this.centre = new Point(centre.x, centre.y);
    this.radius = radius;
  }

  toString() {
    return `[Circle @(${this.centre.x}, ${this.centre.y}) radius ${this.radius}]`;
  }

  isEqualTo(other) {
    if (other instanceof Circle) {
      const isCentreEqual = this.centre.isEqualTo(other.centre);
      const isRadiusEqual = this.radius === other.radius;
      return isCentreEqual && isRadiusEqual;
    }
    return false;
  }

  hasPoint(point) {
    if (point instanceof Point) {
      return this.centre.findDistanceTo(point) === this.radius;
    }
    return false;
  }

  moveTo(newCentre) {
    return new Circle(newCentre, this.radius);
  }

  get area() {
    return Math.PI * this.radius * this.radius;
  }

  get perimeter() {
    return 2 * Math.PI * this.radius;
  }
}

module.exports = Circle;
