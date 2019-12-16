const Circle = require('../src/circle');
const { strictEqual, deepStrictEqual, isOk, isNotOk } = require('chai').assert;

describe('Circle', function() {
  describe('toString', function() {
    it('should give a string representation of a circle', function() {
      const circle = new Circle({ x: 1, y: 2 }, 5);
      strictEqual(circle.toString(), '[Circle @(1, 2) radius 5]');
    });
  });

  describe('isEqualTo', function() {
    it('should validate if both the circles are equal', function() {
      const circle1 = new Circle({ x: 1, y: 2 }, 5);
      const circle2 = new Circle({ x: 1, y: 2 }, 5);
      isOk(circle1.isEqualTo(circle2));
    });

    it('should invalidate if both the circles are not equal', function() {
      const circle1 = new Circle({ x: 1, y: 2 }, 5);
      const circle2 = new Circle({ x: 2, y: 4 }, 7);
      isNotOk(circle1.isEqualTo(circle2));
    });

    it('should invalidate if the object given is not an instance of circle', function() {
      const circle1 = new Circle({ x: 1, y: 2 });
      const circleLikeObject = { centre: { x: 1, y: 2 }, radius: 5 };
      isNotOk(circle1.isEqualTo(circleLikeObject));
    });
  });
});
