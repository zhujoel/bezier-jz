import { Point } from "../../geometry/Point";

describe('Point', () => {
  it('should add', () => {
    const p = new Point(-1, 6).Add(new Point(8, 4));
    expect(p).toEqual(new Point(7, 10));
  });

  it('should times', () => {
    const p = new Point(2, 3).Times(4);
    expect(p).toEqual(new Point(8, 12));
  });
});