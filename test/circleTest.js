const Circle = require('../src/circle');
const { strictEqual, deepStrictEqual } = require('chai').assert;

describe('Circle', function() {
  describe('toString', function() {
    it('should give a string representation of a circle', function() {
      const circle = new Circle({ x: 1, y: 2 }, 5);
      strictEqual(circle.toString(), '[Circle @(1, 2) radius 5]');
    });
  });
});
