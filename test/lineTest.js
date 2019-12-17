'use strict';

const Line = require('../src/line');
const Point = require('../src/point');
const {
  deepStrictEqual,
  strictEqual,
  approximately,
  isNaN,
  isNull,
  isOk,
  isNotOk
} = require('chai').assert;

describe('Line', function() {
  describe('toString', function() {
    const testLine = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });

    it('should give the proper representation of a line', function() {
      const actual = testLine.toString();
      const expected = '[Line (1,2) to (4,5)]';

      deepStrictEqual(actual, expected);
    });
  });

  describe('isEqualTo', function() {
    it('should validate if the other line given and the existing lines are equal', function() {
      const line1 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      const line2 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      isOk(line1.isEqualTo(line2));
    });

    it('should validate if the other line given and the existing lines are equal but in reverse order', function() {
      const line1 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      const line2 = new Line({ x: 4, y: 5 }, { x: 1, y: 2 });
      isOk(line1.isEqualTo(line2));
    });

    it('should invalidate if the other line given and the existing lines are not equal', function() {
      const line1 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      const line2 = new Line({ x: 1, y: 3 }, { x: 3, y: 5 });
      isNotOk(line1.isEqualTo(line2));
    });

    it('should invalidate if the object given is not an instance of line', function() {
      const line1 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      const lineLikeObject = { endA: { x: 1, y: 2 }, endB: { x: 4, y: 5 } };
      isNotOk(line1.isEqualTo(lineLikeObject));
    });
  });

  describe('isParallelTo', function() {
    it('should invalidate if the other object given is not an instance of Line', function() {
      const line1 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      const lineLikeObject = { endA: { x: 1, y: 2 }, endB: { x: 4, y: 5 } };
      isNotOk(line1.isParallelTo(lineLikeObject));
    });

    it('should validate if the both lines are parallel', function() {
      const line1 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      const line2 = new Line({ x: 1, y: 4 }, { x: 4, y: 7 });
      isOk(line1.isParallelTo(line2));
    });

    it('should invalidate if the both lines are not parallel', function() {
      const line1 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      const line2 = new Line({ x: 1, y: 8 }, { x: 3, y: 5 });
      isNotOk(line1.isParallelTo(line2));
    });

    it('should invalidate if the both lines have same end points and slope', function() {
      const line1 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      const line2 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      isNotOk(line1.isParallelTo(line2));
    });
  });

  describe('length', function() {
    it('should give zero as length if both end points of the line are same', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 1, y: 2 });
      const expectedLength = 0;
      strictEqual(line.length, expectedLength);
    });

    it('should give a non-zero positive length if both end points of the line are not same', function() {
      const line = new Line({ x: 0, y: 2 }, { x: 0, y: 5 });
      const expectedLength = 3;
      strictEqual(line.length, expectedLength);
    });

    it('should find length if one of the end point of the line is in negative region', function() {
      const line = new Line({ x: 0, y: -2 }, { x: 0, y: 4 });
      const expectedLength = 6;
      strictEqual(line.length, expectedLength);
    });

    it('should find length if the distance between end points is a floating point value', function() {
      const line = new Line({ x: 0, y: 2 }, { x: 0, y: 7.232 });
      const expectedLength = 5.232;
      approximately(line.length, expectedLength, 0.0000000000000001);
    });
  });

  describe('slope', function() {
    it('should find the slope of the given line if it is positive', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      const expectedSlope = 1;
      strictEqual(line.slope, expectedSlope);
    });

    it('should find the slope of the given line if it is negative', function() {
      const line = new Line({ x: 1, y: 5 }, { x: 4, y: 2 });
      const expectedSlope = -1;
      strictEqual(line.slope, expectedSlope);
    });

    it('should give zero as slope if y coordinates of both ends of the line are equal', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 4, y: 2 });
      const expectedSlope = 0;
      strictEqual(line.slope, expectedSlope);
    });

    it('Should give infinity when the line is parallel to y-axis', () => {
      let line = new Line({ x: 3, y: 8 }, { x: 3, y: 6 });
      strictEqual(line.slope, Infinity);

      line = new Line({ x: 4, y: 3 }, { x: 4, y: 4 });
      strictEqual(line.slope, Infinity);
    });
  });

  describe('split', function() {
    it('should give a pair of line by dividing the given line into 2 equal parts', function() {
      const bigLine = new Line({ x: 1, y: 2 }, { x: 5, y: 6 });
      const firstHalf = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      const secondHalf = new Line({ x: 3, y: 4 }, { x: 5, y: 6 });

      isOk(
        bigLine.split()[0].isEqualTo(firstHalf),
        bigLine.split()[1].isEqualTo(secondHalf)
      );
    });
  });

  describe('findX', function() {
    it('should give the x-cord corresponding to the given y-cord if it is in line', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      strictEqual(line.findX(4), 3);
    });

    it('Should give a x coordinate if the Line is perpendicular to y axis', () => {
      const line = new Line({ x: 3, y: 5 }, { x: 9, y: 5 });
      strictEqual(line.findX(5), 5);
    });

    it('should give NaN if the given y-cord is not in line', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      isNaN(line.findX(7));
    });
  });

  describe('findY', function() {
    it('should give the y-cord corresponding to the given x-cord if it is in line', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      strictEqual(line.findY(3), 4);
    });

    it('Should give y coordinate if the Line is perpendicular to x axis', () => {
      const line = new Line({ x: 3, y: 5 }, { x: 3, y: 1 });
      strictEqual(line.findY(3), 5);
    });

    it('should give NaN if the given x-cord is not in line', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      isNaN(line.findY(7));
    });
  });

  describe('hasPoint', function() {
    it('should validate if the given point is in the line', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      const point1 = new Point(2, 3);
      isOk(line.hasPoint(point1));
    });

    it('should invalidate if the given point is not in the line', function() {
      const line = new Line({ x: 2, y: 2 }, { x: 4, y: 4 });
      const point = new Point(2, 3);
      isNotOk(line.hasPoint(point));
    });
  });

  describe('findPointFromStart', function() {
    it('should find a point with a particular distance from the start of the line', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 1, y: 8 });
      const expectedPoint = new Point(1, 4);
      isOk(expectedPoint.isEqualTo(line.findPointFromStart(2)));
    });

    it('should give null if the distance given is greater than the length', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 1, y: 8 });
      isNull(line.findPointFromStart(8));
    });

    it('should give null if the given distance is negative', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 1, y: 8 });
      isNull(line.findPointFromStart(-1));
    });
  });

  describe('findPointFromEnd', function() {
    it('should find a point with a particular distance from the end of the line', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 1, y: 4 });
      const expectedPoint = new Point(1, 3);
      isOk(expectedPoint.isEqualTo(line.findPointFromEnd(1)));
    });
  });
});
