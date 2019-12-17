const Circle = require('../src/circle');
const Point = require('../src/point');
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
      const circle1 = new Circle({ x: 1, y: 2 }, 5);
      const circleLikeObject = { centre: { x: 1, y: 2 }, radius: 5 };
      isNotOk(circle1.isEqualTo(circleLikeObject));
    });
  });

  describe('area', function() {
    it('should give the area of the circle', function() {
      const circle1 = new Circle({ x: 1, y: 2 }, 5);
      strictEqual(circle1.area, 78.53981633974483);
    });
  });

  describe('perimeter', function() {
    it('should give the perimeter of the circle', function() {
      const circle1 = new Circle({ x: 1, y: 2 }, 5);
      strictEqual(circle1.perimeter, 31.41592653589793);
    });
  });

  describe('hasPoint', function() {
    it('should invalidate if the given object is not an instance of point', function() {
      const circle = new Circle({ x: 0, y: 0 }, 5);
      const pointLikeObject = { x: 0, y: 5 };
      isNotOk(circle.hasPoint(pointLikeObject));
    });

    it('should validate if the given point is on the circumference of the circle', function() {
      const circle = new Circle({ x: 0, y: 0 }, 5);
      const point = new Point(0, 5);
      isOk(circle.hasPoint(point));
    });

    it('should invalidate if the given point is not on the circumference of the circle', function() {
      const circle = new Circle({ x: 0, y: 0 }, 5);
      const point = new Point(0, 8);
      isNotOk(circle.hasPoint(point));
    });
  });

  describe('moveTo', function() {
    it('should change the centre point to the given point', function() {
      const circle1 = new Circle({ x: 0, y: 0 }, 5);
      const circle2 = new Circle({ x: 1, y: 2 }, 5);
      const newCentre = { x: 1, y: 2 };
      isOk(circle2.isEqualTo(circle1.moveTo(newCentre)));
    });
  });
});
