const Point = require('../src/point');
const Line = require('../src/line');

const getDimension = function(diagonalEndA, diagonalEndC) {
  const length = Math.abs(diagonalEndA.x - diagonalEndC.x);
  const breadth = Math.abs(diagonalEndA.y - diagonalEndC.y);
  return { length: length, breadth: breadth };
};

const getSides = function(pointA, pointC) {
  const ab = new Line(pointA, { x: pointC.x, y: pointA.y });
  const bc = new Line({ x: pointC.x, y: pointA.y }, pointC);
  const cd = new Line(pointC, { x: pointA.x, y: pointC.y });
  const da = new Line({ x: pointA.x, y: pointC.y }, pointA);
  return { AB: ab, BC: bc, CD: cd, DA: da };
};

const isValueInRange = function([limit1, limit2], value) {
  const minLimit = Math.min(limit1, limit2);
  const maxLimit = Math.max(limit1, limit2);
  return value < maxLimit && value > minLimit;
};

class Rectangle {
  constructor(diagonalEndA, diagonalEndC) {
    this.diagonalEndA = new Point(diagonalEndA.x, diagonalEndA.y);
    this.diagonalEndC = new Point(diagonalEndC.x, diagonalEndC.y);
  }

  toString() {
    return `[Rectangle (${this.diagonalEndA.x},${this.diagonalEndA.y}) to (${this.diagonalEndC.x},${this.diagonalEndC.y})]`;
  }

  isEqualTo(other) {
    if (other instanceof Rectangle) {
      return (
        this.diagonalEndA.isEqualTo(other.diagonalEndA) &&
        this.diagonalEndC.isEqualTo(other.diagonalEndC)
      );
    }
    return false;
  }

  hasPoint(point) {
    if (!(point instanceof Point)) return false;
    const sides = getSides(this.diagonalEndA, this.diagonalEndC);
    return (
      sides.AB.hasPoint(point) ||
      sides.BC.hasPoint(point) ||
      sides.CD.hasPoint(point) ||
      sides.DA.hasPoint(point)
    );
  }

  covers(point) {
    if (!(point instanceof Point)) return false;
    const xRange = [this.diagonalEndA.x, this.diagonalEndC.x];
    const yRange = [this.diagonalEndA.y, this.diagonalEndC.y];
    return isValueInRange(xRange, point.x) && isValueInRange(yRange, point.y);
  }

  get area() {
    const dimension = getDimension(this.diagonalEndA, this.diagonalEndC);
    return dimension.length * dimension.breadth;
  }

  get perimeter() {
    const dimension = getDimension(this.diagonalEndA, this.diagonalEndC);
    return 2 * (dimension.length + dimension.breadth);
  }
}

module.exports = Rectangle;
