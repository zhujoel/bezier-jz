import { Point } from "../../geometry/Point";
import { LinearInterpolation, DeCasteljau } from "../../geometry/Algorithms"

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
});