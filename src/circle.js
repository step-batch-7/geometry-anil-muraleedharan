const Point = require('../src/point');

class Circle {
  constructor(center, radius) {
    this.center = new Point(center.x, center.y);
    this.radius = radius;
  }

  toString() {
    return `[Circle @(${this.center.x},${this.center.y}) radius ${this.radius}]`;
  }

  isEqualTo(other) {
    if (other instanceof Circle) {
      const isCenterEqual = this.center.isEqualTo(other.center);
      const isRadiusEqual = this.radius === other.radius;
      return isCenterEqual && isRadiusEqual;
    }
    return false;
  }

  hasPoint(point) {
    if (point instanceof Point) {
      return this.center.findDistanceTo(point) === this.radius;
    }
    return false;
  }

  moveTo(newCenter) {
    return new Circle(newCenter, this.radius);
  }

  covers(point) {
    if (point instanceof Point) {
      return this.center.findDistanceTo(point) < this.radius;
    }
    return false;
  }

  get area() {
    return Math.PI * this.radius * this.radius;
  }

  get perimeter() {
    return 2 * Math.PI * this.radius;
  }
}

module.exports = Circle;
