import { Point } from "../../geometry/Point";
import { LinearInterpolation, DeCasteljau, Line } from "../../geometry/Algorithms"

describe('Algorithms', () => {
  it('should compute linear interpolation', () => {
    const result = LinearInterpolation(new Point(3, 2), new Point(5, 6), 0.5);
    expect(result).toEqual(new Point(4, 4));
  });

  it('should compute De Casteljau\'s algorithm', () => {
    const p0 = new Point(2, 3);
    const p1 = new Point(3, 4);
    const p2 = new Point(7, 9);
    const result = DeCasteljau([p0, p1, p2], 0.5);
    const lerp1 = LinearInterpolation(p0, p1, 0.5);
    const lerp2 = LinearInterpolation(lerp1, p2, 0.5);
    expect(lerp2).toEqual(result);
  });

  it('should compute all points representing a line 1', () => {
    const p0 = new Point(10, 10);
    const p1 = new Point(20, 20);
    const step = 0.1;
    const line = Line(p0, p1, step);

    expect(line.length).toEqual(11);
    expect(line).toEqual(
      [
        new Point(10, 10), 
        new Point(11, 11), 
        new Point(12, 12), 
        new Point(13, 13), 
        new Point(14, 14),
        new Point(15, 15), 
        new Point(16, 16),
        new Point(17, 17),
        new Point(18, 18),
        new Point(19, 19),
        new Point(20, 20),
      ]
    );
  });

  
  it('should compute all points representing a line 2', () => {
    const p0 = new Point(10, 10);
    const p1 = new Point(20, 20);
    const step = 0.3;
    const line = Line(p0, p1, step);

    expect(line.length).toEqual(4);
    expect(line).toEqual(
      [
        new Point(10, 10), 
        new Point(13, 13), 
        new Point(16, 16),
        new Point(19, 19),
      ]
    );
  });
});