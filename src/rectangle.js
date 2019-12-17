const Point = require('../src/point');

class Rectangle {
  constructor(diagonalEndA, diagonalEndB) {
    this.diagonalEndA = new Point(diagonalEndA.x, diagonalEndA.y);
    this.diagonalEndB = new Point(diagonalEndB.x, diagonalEndB.y);
  }

  toString() {
    return `[Rectangle (${this.diagonalEndA.x}, ${this.diagonalEndA.y}) to (${this.diagonalEndB.x}, ${this.diagonalEndB.y})]`;
  }
}

module.exports = Rectangle;
