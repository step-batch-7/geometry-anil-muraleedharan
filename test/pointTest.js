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
});
