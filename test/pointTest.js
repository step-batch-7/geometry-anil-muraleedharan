'use strict';

const Point = require('../src/point');
const Line = require('../src/line');
const {
  strictEqual,
  deepStrictEqual,
  approximately,
  isNaN,
  isOk
} = require('chai').assert;

describe('Point', function() {
  describe('toString', function() {
    const testPoint = new Point(1, 2);

    it('should give the proper representation of a point', function() {
      const actual = testPoint.toString();
      const expected = '[Point @(1,2)]';
      strictEqual(actual, expected);
    });
  });

  describe('visit', function() {
    it('should give result of the given operation by operating on the coordinates of the point', function() {
      const testPoint = new Point(2, 3);
      const sampleOperation1 = (x, y) => x + y;
      const sampleOperation2 = (x, y) => x * y;

      strictEqual(testPoint.visit(sampleOperation1), 5);
      strictEqual(testPoint.visit(sampleOperation2), 6);
    });
  });

  describe('isEqualTo', function() {
    const point1 = new Point(2, 3);
    const point2 = new Point(2, 3);
    const point3 = new Point(4, 5);
    const pointLikeObject = { x: 2, y: 3 };

    it('should invalidate if the other object given is not an instance of point', function() {
      strictEqual(point1.isEqualTo(pointLikeObject), false);
    });

    it('should validate if the coordinates of both the points are same', function() {
      strictEqual(point1.isEqualTo(point2), true);
    });

    it('should invalidate if the coordinates of both the points are not same', function() {
      strictEqual(point1.isEqualTo(point3), false);
    });
  });

  describe('clone', function() {
    const point1 = new Point(2, 3);
    it('should give an exact copy of the given point', function() {
      isOk(point1.isEqualTo(point1.clone()));
    });
  });

  describe('findDistanceTo', function() {
    it('should give zero as Distance if both points are same', function() {
      const point1 = new Point(1, 2);
      const point2 = new Point(1, 2);
      const expectedDistance = 0;
      strictEqual(point1.findDistanceTo(point2), expectedDistance);
    });

    it('should give a non-zero positive Distance if both points are not same', function() {
      const point1 = new Point(1, 2);
      const point2 = new Point(1, 5);
      const expectedDistance = 3;
      strictEqual(point1.findDistanceTo(point2), expectedDistance);
    });

    it('should find Distance if one of the point of is in negative region', function() {
      const point1 = new Point(1, -2);
      const point2 = new Point(1, 5);
      const expectedDistance = 7;
      strictEqual(point1.findDistanceTo(point2), expectedDistance);
    });

    it('should find Distance if it is a floating point value', function() {
      const point1 = new Point(1, 2);
      const point2 = new Point(1, 7.232);
      const expectedDistance = 5.232;
      approximately(
        point1.findDistanceTo(point2),
        expectedDistance,
        0.0000000000000001
      );
    });

    it('should give NaN as distance if the given object is not an instance of point', function() {
      const point1 = new Point(1, 2);
      const pointLikeObject = { x: 1, y: 5 };
      isNaN(point1.findDistanceTo(pointLikeObject));
    });
  });

  describe('isOn', function() {
    it('should validate if the point is in the given line', function() {
      const line1 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      const point1 = new Point(2, 3);
      strictEqual(point1.isOn(line1), true);
    });

    it('should invalidate if the point is not in the given line', function() {
      const line1 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      const point1 = new Point(7, 3);
      strictEqual(point1.isOn(line1), false);
    });
  });
});
