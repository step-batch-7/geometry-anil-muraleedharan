class Line {
  constructor([x1, y1], [x2, y2]) {
    this.point1 = { x: x1, y: y1 };
    this.point2 = { x: x2, y: y2 };
  }
  toString() {
    let point1 = this.point1;
    let point2 = this.point2;
    return `Line { point1: { x: ${point1.x}, y: ${point1.y} }, point2: { x: ${point2.x}, y: ${point2.y} } }`;
  }
  isEqualTo(otherLine) {
    let point1ToCheck = otherLine.point1;
    let point2ToCheck = otherLine.point2;

    let point1 = this.point1;
    let point2 = this.point2;

    let isInitialPointsEqual =
      point1ToCheck.x == point1.x && point1ToCheck.y == point1.y;
    let isFinalPointsEqual =
      point2ToCheck.x == point2.x && point1ToCheck.y == point2.y;

    return isInitialPointsEqual && isFinalPointsEqual;
  }
}

module.exports = { Line };
