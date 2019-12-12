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
}

module.exports = { Line };
