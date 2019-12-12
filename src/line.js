'use strict';

const arePointsEqual = function(a, b) {
  return a.x === b.x && a.y === b.y;
};

class Line {
  constructor([x1, y1], [x2, y2]) {
    this.endA = { x: x1, y: y1 };
    this.endB = { x: x2, y: y2 };
  }
  toString() {
    const endA = this.endA;
    const endB = this.endB;
    return `Line (${endA.x}, ${endA.y})-------------(${endB.x}, ${endB.y})`;
  }
  isEqualTo(otherLine) {
    const otherLineEndA = otherLine.endA;
    const otherLineEndB = otherLine.endB;

    const endA = this.endA;
    const endB = this.endB;

    const isSameType = otherLine instanceof Line;
    const areEndAEqual = arePointsEqual(endA, otherLineEndA);
    const areEndBEqual = arePointsEqual(endB, otherLineEndB);

    return isSameType && areEndAEqual && areEndBEqual;
  }
}

module.exports = { Line };
