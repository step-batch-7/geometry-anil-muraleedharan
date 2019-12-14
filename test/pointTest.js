'use strict';

const Point = require('../src/point');
const { strictEqual, deepStrictEqual } = require('chai').assert;

describe('Point', function() {
  describe('toString', function() {
    const testPoint = new Point(1, 2);

    it('should give the proper representation of a point', function() {
      const actual = testPoint.toString();
      const expected = '[Point @(1,2)]';
      deepStrictEqual(actual, expected);
    });
  });
});
