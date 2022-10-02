import { Lerp } from "../../../geometry/3d/Bezier3D";
import { Point3D } from "../../../geometry/3d/Point3D";

describe('Bézier 3D', () => {
  it.each`
    p0 | p1 | t | result
    ${new Point3D(3, 2, 0)} | ${new Point3D(5, 6, 0)} | ${0} | ${new Point3D(3, 2, 0)}
    ${new Point3D(3, 2, 0)} | ${new Point3D(5, 6, 0)} | ${0.1} | ${new Point3D(3.2, 2.4, 0)}
    ${new Point3D(3, 2, 0)} | ${new Point3D(5, 6, 0)} | ${0.2} | ${new Point3D(3.4, 2.8, 0)}
    ${new Point3D(3, 2, 0)} | ${new Point3D(5, 6, 0)} | ${0.5} | ${new Point3D(4, 4, 0)}
    ${new Point3D(3, 2, 0)} | ${new Point3D(5, 6, 0)} | ${0.8} | ${new Point3D(4.6, 5.2, 0)}
    ${new Point3D(3, 2, 0)} | ${new Point3D(5, 6, 0)} | ${0.9} | ${new Point3D(4.8, 5.6, 0)}
    ${new Point3D(3, 2, 0)} | ${new Point3D(5, 6, 0)} | ${1} | ${new Point3D(5, 6, 0)}
    ${new Point3D(3, 2, 1)} | ${new Point3D(5, 6, 4)} | ${0.5} | ${new Point3D(4, 4, 2.5)}
  `('should compute a lerp', ({ p0, p1, t, result }) => {
    const lerp = Lerp(p0, p1, t);
    expect(lerp.x).toBeCloseTo(result.x, 6);
    expect(lerp.y).toBeCloseTo(result.y, 6);
    expect(lerp.z).toBeCloseTo(result.z, 6);
  });
});