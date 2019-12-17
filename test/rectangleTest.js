const Rectangle = require('../src/rectangle');
const Point = require('../src/point');

const { strictEqual, deepStrictEqual, isOk, isNotOk } = require('chai').assert;

describe('Rectangle', function() {
  describe('toString', function() {
    it('should give a proper representation of a rectangle', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      strictEqual(rectangle.toString(), '[Rectangle (1,1) to (2,3)]');
    });
  });

  describe('area', function() {
    it('should give the area of the rectangle', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 4, y: 5 });
      strictEqual(rectangle.area, 12);
    });
  });

  describe('perimeter', function() {
    it('should give the perimeter of the rectangle', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 4, y: 5 });
      strictEqual(rectangle.perimeter, 14);
    });
  });

  describe('isEqualTo', function() {
    it('should invalidate if the the given object is not an instance of Rectangle', function() {
      const rectangle1 = new Rectangle({ x: 1, y: 1 }, { x: 4, y: 5 });
      const rectangleLikeObject = {
        diagonalEndA: { x: 1, y: 1 },
        diagonalEndB: { x: 4, y: 5 }
      };
      isNotOk(rectangle1.isEqualTo(rectangleLikeObject));
    });

    it('should validate if both rectangles are equal', function() {
      const rectangle1 = new Rectangle({ x: 1, y: 1 }, { x: 4, y: 5 });
      const rectangle2 = new Rectangle({ x: 1, y: 1 }, { x: 4, y: 5 });
      isOk(rectangle1.isEqualTo(rectangle2));
    });

    it('should invalidate if both rectangles are not equal', function() {
      const rectangle1 = new Rectangle({ x: 1, y: 1 }, { x: 4, y: 5 });
      const rectangle2 = new Rectangle({ x: 1, y: 2 }, { x: 7, y: 5 });
      isNotOk(rectangle1.isEqualTo(rectangle2));
    });
  });

  describe('hasPoint', function() {
    it('should invalidate if the given object is not an instance of point', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 4, y: 5 });
      const pointLikeObject = { x: 0, y: 5 };
      isNotOk(rectangle.hasPoint(pointLikeObject));
    });

    it('should validate if the given point is on any of the sides of the Rectangle', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 4, y: 5 });
      const point1 = new Point(2, 1);
      const point2 = new Point(4, 2);
      const point3 = new Point(2, 5);
      const point4 = new Point(1, 2);
      isOk(rectangle.hasPoint(point1));
      isOk(rectangle.hasPoint(point2));
      isOk(rectangle.hasPoint(point3));
      isOk(rectangle.hasPoint(point4));
    });

    it('should invalidate if the given point is not on the circumference of the Rectangle', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 4, y: 5 });
      const point = new Point(0, 8);
      isNotOk(rectangle.hasPoint(point));
    });
  });
});
