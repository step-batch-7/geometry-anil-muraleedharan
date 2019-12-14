'use strict';

const Point = require('../src/point');
const { strictEqual, deepStrictEqual } = require('chai').assert;

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
      deepStrictEqual(point1.clone(), point1);
    });
  });
});
