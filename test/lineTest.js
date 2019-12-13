'use strict';

const Line = require('../src/line.js');
const { deepStrictEqual, strictEqual } = require('assert');

describe('Line', function() {
  describe('toString', function() {
    const testLine = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });

    it('should give the proper representation of a line', function() {
      const actual = testLine.toString();
      const expected = 'Line (1, 2)-------------(4, 5)';

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
});
