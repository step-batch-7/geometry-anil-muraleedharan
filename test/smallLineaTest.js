const Line = require('../src/smallLine.js').Line;
const assert = require('assert');

const lineTest = function() {
  const testLine = new Line([1, 2], [4, 5]);
  let actual = testLine.toString();
  let expected = 'Line { point1: { x: 1, y: 2 }, point2: { x: 4, y: 5 } }';
  describe('toString', function() {
    it('should return the proper representation of a line', function() {
      assert.deepStrictEqual(actual, expected);
    });
  });
};

lineTest();
