const Line = require('../src/smallLine.js').Line;
const assert = require('assert');

const lineTest = function() {
  describe('toString', function() {
    const testLine = new Line([1, 2], [4, 5]);

    let actual = testLine.toString();
    let expected = 'Line { point1: { x: 1, y: 2 }, point2: { x: 4, y: 5 } }';

    it('should return the proper representation of a line', function() {
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe('isEqualTo', function() {
    let line1 = new Line([1, 2], [4, 5]);
    let line2 = new Line([1, 2], [4, 5]);

    let actual = line1.isEqualTo(line2);
    let expected = true;
    it('should validate that the line given and the existing lines are equal', function() {
      assert.strictEqual(actual, expected);
    });
  });
};

lineTest();
