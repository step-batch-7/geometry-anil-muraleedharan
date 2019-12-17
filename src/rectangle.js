const Point = require('../src/point');

const getDimension = function(diagonalEndA, diagonalEndB) {
  const length = Math.abs(diagonalEndA.x - diagonalEndB.x);
  const breadth = Math.abs(diagonalEndA.y - diagonalEndB.y);
  return { length: length, breadth: breadth };
};

class Rectangle {
  constructor(diagonalEndA, diagonalEndB) {
    this.diagonalEndA = new Point(diagonalEndA.x, diagonalEndA.y);
    this.diagonalEndB = new Point(diagonalEndB.x, diagonalEndB.y);
  }

  toString() {
    return `[Rectangle (${this.diagonalEndA.x}, ${this.diagonalEndA.y}) to (${this.diagonalEndB.x}, ${this.diagonalEndB.y})]`;
  }

  get area() {
    const dimension = getDimension(this.diagonalEndA, this.diagonalEndB);
    return dimension.length * dimension.breadth;
  }

  get perimeter() {
    const dimension = getDimension(this.diagonalEndA, this.diagonalEndB);
    return 2 * (dimension.length + dimension.breadth);
  }
}

module.exports = Rectangle;
