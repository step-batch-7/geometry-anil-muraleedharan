'use strict';

const Line = require('../src/line');
const Point = require('../src/point');
const { deepStrictEqual, strictEqual, approximately } = require('chai').assert;

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
    const line1 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
    const line2 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
    const line3 = new Line({ x: 1, y: 3 }, { x: 3, y: 5 });
    const lineLikeObject = { endA: { x: 1, y: 2 }, endB: { x: 4, y: 5 } };

    it('should validate if the other line given and the existing lines are equal', function() {
      const actual = line1.isEqualTo(line2);
      const expected = true;

      strictEqual(actual, expected);
    });

    it('should invalidate if the other line given and the existing lines are not equal', function() {
      const actual = line1.isEqualTo(line3);
      const expected = false;

      strictEqual(actual, expected);
    });

    it('should invalidate if the object given is not an instance of line', function() {
      const actual = line1.isEqualTo(lineLikeObject);
      const expected = false;

      strictEqual(actual, expected);
    });
  });

  describe('isParallelTo', function() {
    const line1 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
    const line2 = new Line({ x: 1, y: 4 }, { x: 4, y: 7 });
    const line3 = new Line({ x: 1, y: 8 }, { x: 3, y: 5 });
    const line4 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
    const lineLikeObject = { endA: { x: 1, y: 2 }, endB: { x: 4, y: 5 } };
    it('should invalidate if the other object given is not an instance of Line', function() {
      const actual = line1.isParallelTo(lineLikeObject);
      const expected = false;
      strictEqual(actual, expected);
    });

    it('should validate if the both lines are parallel', function() {
      const actual = line1.isParallelTo(line2);
      const expected = true;
      strictEqual(actual, expected);
    });

    it('should invalidate if the both lines are not parallel', function() {
      const actual = line1.isParallelTo(line3);
      const expected = false;
      strictEqual(actual, expected);
    });

    it('should validate if the both lines have same end points and slope', function() {
      const actual = line1.isParallelTo(line4);
      const expected = true;
      strictEqual(actual, expected);
    });
  });

  describe('length', function() {
    it('should give zero as length if both end points of the line are same', function() {
      const line1 = new Line({ x: 1, y: 2 }, { x: 1, y: 2 });
      const expectedLength = 0;
      strictEqual(line1.length, expectedLength);
    });

    it('should give a non-zero positive length if both end points of the line are not same', function() {
      const line2 = new Line({ x: 0, y: 2 }, { x: 0, y: 5 });
      const expectedLength = 3;
      strictEqual(line2.length, expectedLength);
    });

    it('should find length if one of the end point of the line is in negative region', function() {
      const line3 = new Line({ x: 0, y: -2 }, { x: 0, y: 4 });
      const expectedLength = 6;
      strictEqual(line3.length, expectedLength);
    });

    it('should find length if the distance between end points is a floating point value', function() {
      const line3 = new Line({ x: 0, y: 2 }, { x: 0, y: 7.232 });
      const expectedLength = 5.232;
      approximately(line3.length, expectedLength, 0.0000000000000001);
    });
  });

  describe('slope', function() {
    it('should find the slope of the given line if it is positive', function() {
      const line1 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      const expectedSlope = 1;
      strictEqual(line1.slope, expectedSlope);
    });

    it('should find the slope of the given line if it is negative', function() {
      const line1 = new Line({ x: 1, y: 5 }, { x: 4, y: 2 });
      const expectedSlope = -1;
      strictEqual(line1.slope, expectedSlope);
    });

    it('should give zero as slope if y coordinates of both ends of the line are equal', function() {
      const line1 = new Line({ x: 1, y: 2 }, { x: 4, y: 2 });
      const expectedSlope = 0;
      strictEqual(line1.slope, expectedSlope);
    });

    it('should give "Infinity" as slope if x-cords of both ends are equal and difference of y-cords is positive', function() {
      const line1 = new Line({ x: 1, y: 6 }, { x: 1, y: 2 });
      const expectedSlope = Infinity;
      strictEqual(line1.slope, expectedSlope);
    });

    it('should give "-Infinity" as slope if x-cords of both ends are equal and difference of y-cords is negative', function() {
      const line1 = new Line({ x: 1, y: 2 }, { x: 1, y: 6 });
      const expectedSlope = -Infinity;
      strictEqual(line1.slope, expectedSlope);
    });
  });

  describe('split', function() {
    it('should give a pair of line by dividing the given line into 2 equal parts', function() {
      const bigLine = new Line({ x: 1, y: 2 }, { x: 5, y: 6 });
      const firstHalf = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      const secondHalf = new Line({ x: 3, y: 4 }, { x: 5, y: 6 });

      deepStrictEqual(bigLine.split(), [firstHalf, secondHalf]);
    });
  });

  describe('findX', function() {
    it('should give the x-cord corresponding to the given y-cord if it is in line', function() {
      const line1 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      strictEqual(line1.findX(4), 3);
    });
  });

  describe('findY', function() {
    it('should give the y-cord corresponding to the given x-cord if it is in line', function() {
      const line1 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      strictEqual(line1.findY(3), 4);
    });
  });

  describe('hasPoint', function() {
    it('should validate if the given point is in the line', function() {
      const line1 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      const point1 = new Point(2, 3);
      strictEqual(line1.hasPoint(point1), true);
    });

    it('should invalidate if the given point is not in the line', function() {
      const line1 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      const point1 = new Point(7, 3);
      strictEqual(line1.hasPoint(point1), false);
    });
  });
});
