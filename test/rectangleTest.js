const Rectangle = require('../src/rectangle');

const { strictEqual, deepStrictEqual, isOk, isNotOk } = require('chai').assert;

describe('Rectangle', function() {
  describe('toString', function() {
    it('should give a proper representation of a rectangle', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      strictEqual(rectangle.toString(), '[Rectangle (1, 1) to (2, 3)]');
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
});
