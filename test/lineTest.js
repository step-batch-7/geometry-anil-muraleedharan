'use strict';

const { Line } = require('../src/line.js');
const assert = require('assert');

const lineTest = function() {
  describe('toString', function() {
    const testLine = new Line([1, 2], [4, 5]);

    it('should return the proper representation of a line', function() {
      const actual = testLine.toString();
      const expected = 'Line (1, 2)-------------(4, 5)';

      assert.deepStrictEqual(actual, expected);
    });
  });

  describe('isEqualTo', function() {
    const line1 = new Line([1, 2], [4, 5]);
    const line2 = new Line([1, 2], [4, 5]);
    const line3 = new Line([1, 3], [5, 5]);
    const lineLikeObject = { endA: { x: 1, y: 2 }, endB: { x: 4, y: 5 } };

    it('should validate if the line given and the existing lines are equal', function() {
      const actual = line1.isEqualTo(line2);
      const expected = true;

      assert.strictEqual(actual, expected);
    });

    it('should invalidate if the line given and the existing lines are not equal', function() {
      const actual = line1.isEqualTo(line3);
      const expected = false;

      assert.strictEqual(actual, expected);
    });

    it('should invalidate if the object given is not a line', function() {
      const actual = line1.isEqualTo(lineLikeObject);
      const expected = false;

      assert.strictEqual(actual, expected);
    });
  });
};

lineTest();
