import { Point2D } from "../../../geometry/2d/Point2D";

describe('Point2D', () => {
  it('should add', () => {
    const p = new Point2D(-1, 6).Add(new Point2D(8, 4));
    expect(p).toEqual(new Point2D(7, 10));
  });

  it('should times', () => {
    const p = new Point2D(2, 3).Times(4);
    expect(p).toEqual(new Point2D(8, 12));
  });
});