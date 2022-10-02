import { Point2D } from "../../geometry/2d/Point2D";
import { Lerp, DeCasteljau, BezierCurve } from "../../geometry/2d/Bezier2D"

describe('Algorithms', () => {
  it.each`
    p0 | p1 | t | result
    ${new Point2D(3, 2)} | ${new Point2D(5, 6)} | ${0} | ${new Point2D(3, 2)}
    ${new Point2D(3, 2)} | ${new Point2D(5, 6)} | ${0.1} | ${new Point2D(3.2, 2.4)}
    ${new Point2D(3, 2)} | ${new Point2D(5, 6)} | ${0.2} | ${new Point2D(3.4, 2.8)}
    ${new Point2D(3, 2)} | ${new Point2D(5, 6)} | ${0.5} | ${new Point2D(4, 4)}
    ${new Point2D(3, 2)} | ${new Point2D(5, 6)} | ${0.8} | ${new Point2D(4.6, 5.2)}
    ${new Point2D(3, 2)} | ${new Point2D(5, 6)} | ${0.9} | ${new Point2D(4.8, 5.6)}
    ${new Point2D(3, 2)} | ${new Point2D(5, 6)} | ${1} | ${new Point2D(5, 6)}
  `('should compute a lerp', ({ p0, p1, t, result }) => {
    const lerp = Lerp(p0, p1, t);
    expect(lerp.x).toBeCloseTo(result.x, 6);
    expect(lerp.y).toBeCloseTo(result.y, 6);
  });

  it.each`
    p0 | p1 | t | result
    ${new Point2D(3, 2)} | ${new Point2D(5, 6)} | ${0} | ${new Point2D(3, 2)}
    ${new Point2D(3, 2)} | ${new Point2D(5, 6)} | ${0.1} | ${new Point2D(3.2, 2.4)}
    ${new Point2D(3, 2)} | ${new Point2D(5, 6)} | ${0.2} | ${new Point2D(3.4, 2.8)}
    ${new Point2D(3, 2)} | ${new Point2D(5, 6)} | ${0.5} | ${new Point2D(4, 4)}
    ${new Point2D(3, 2)} | ${new Point2D(5, 6)} | ${0.8} | ${new Point2D(4.6, 5.2)}
    ${new Point2D(3, 2)} | ${new Point2D(5, 6)} | ${0.9} | ${new Point2D(4.8, 5.6)}
    ${new Point2D(3, 2)} | ${new Point2D(5, 6)} | ${1} | ${new Point2D(5, 6)}
  `('should compute a point with De Casteljau\'s algorithm using two points', ({ p0, p1, t, result }) => {
    var deCasteljau = DeCasteljau([p0, p1], t);
    expect(deCasteljau.x).toBeCloseTo(result.x, 6);
    expect(deCasteljau.y).toBeCloseTo(result.y, 6);
    expect(deCasteljau).toEqual(Lerp(p0, p1, t));
  });

  it.each`
    p0 | p1 | p2 | t | result
    ${new Point2D(2, 5)} | ${new Point2D(7, 6)} | ${new Point2D(4, 3)} | ${0} | ${new Point2D(2, 5)}
    ${new Point2D(2, 5)} | ${new Point2D(7, 6)} | ${new Point2D(4, 3)} | ${0.1} | ${new Point2D(2.92, 5.16)}
    ${new Point2D(2, 5)} | ${new Point2D(7, 6)} | ${new Point2D(4, 3)} | ${0.2} | ${new Point2D(3.68, 5.24)}
    ${new Point2D(2, 5)} | ${new Point2D(7, 6)} | ${new Point2D(4, 3)} | ${0.4} | ${new Point2D(4.72, 5.16)}
    ${new Point2D(2, 5)} | ${new Point2D(7, 6)} | ${new Point2D(4, 3)} | ${0.8} | ${new Point2D(4.88, 4.04)}
    ${new Point2D(2, 5)} | ${new Point2D(7, 6)} | ${new Point2D(4, 3)} | ${0.9} | ${new Point2D(4.52, 3.56)}
    ${new Point2D(2, 5)} | ${new Point2D(7, 6)} | ${new Point2D(4, 3)} | ${1} | ${new Point2D(4, 3)}
    ${new Point2D(10, 10)} | ${new Point2D(30, 30)} | ${new Point2D(10, 50)} | ${0} | ${new Point2D(10, 10)}
    ${new Point2D(10, 10)} | ${new Point2D(30, 30)} | ${new Point2D(10, 50)} | ${0.1} | ${new Point2D(13.6, 14)}
    ${new Point2D(10, 10)} | ${new Point2D(30, 30)} | ${new Point2D(10, 50)} | ${0.2} | ${new Point2D(16.4, 18)}
    ${new Point2D(10, 10)} | ${new Point2D(30, 30)} | ${new Point2D(10, 50)} | ${0.5} | ${new Point2D(20, 30)}
    ${new Point2D(10, 10)} | ${new Point2D(30, 30)} | ${new Point2D(10, 50)} | ${0.8} | ${new Point2D(16.4, 42)}
    ${new Point2D(10, 10)} | ${new Point2D(30, 30)} | ${new Point2D(10, 50)} | ${0.9} | ${new Point2D(13.6, 46)}
    ${new Point2D(10, 10)} | ${new Point2D(30, 30)} | ${new Point2D(10, 50)} | ${1} | ${new Point2D(10, 50)}
    ${new Point2D(50, 50)} | ${new Point2D(150, 150)} | ${new Point2D(50, 350)} | ${0} | ${new Point2D(50, 50)}
    ${new Point2D(50, 50)} | ${new Point2D(150, 150)} | ${new Point2D(50, 350)} | ${0.1} | ${new Point2D(68, 71)}
    ${new Point2D(50, 50)} | ${new Point2D(150, 150)} | ${new Point2D(50, 350)} | ${0.9} | ${new Point2D(68, 311)} 
    ${new Point2D(50, 50)} | ${new Point2D(150, 150)} | ${new Point2D(50, 350)} | ${1} | ${new Point2D(50, 350)}
  `('should compute a point with De Casteljau\'s algorithm using three points', ({p0, p1, p2, t, result}) => {
    const deCasteljau = DeCasteljau([p0, p1, p2], t);
    expect(deCasteljau.x).toBeCloseTo(result.x, 6);
    expect(deCasteljau.y).toBeCloseTo(result.y, 6);
    expect(deCasteljau).toEqual(Lerp(Lerp(p0, p1, t), Lerp(p1, p2, t), t));
  });

  it.each`
    p0 | p1 | step | expectedX | expectedY
    ${new Point2D(10, 10)} | ${new Point2D(20, 20)} | ${0.1} | ${[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]} | ${[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]} 
  `('should compute a Bézier curve with two points', ({p0, p1, step, expectedX, expectedY}) => {
    const curve = BezierCurve([p0, p1], step);
    const n = curve.length;
    expect(n).toEqual(1 + 1 / step);
    for (var i = 0; i < n; ++i){
      expect(curve[i].x).toBeCloseTo(expectedX[i], 6);
      expect(curve[i].y).toBeCloseTo(expectedY[i], 6);
    }
  });
  
  it.each`
    p0 | p1 | p2 | step | expectedX | expectedY
    ${new Point2D(10, 10)} | ${new Point2D(30, 30)} | ${new Point2D(10, 50)} | ${0.1} | ${[10, 13.6, 16.4, 18.4, 19.6, 20, 19.6, 18.4, 16.4, 13.6, 10]} | ${[10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50]} 
  `('should compute a Bézier curve with three points', ({p0, p1, p2, step, expectedX, expectedY}) => {
    const curve = BezierCurve([p0, p1, p2], step);
    const n = curve.length;
    expect(n).toEqual(1 + 1 / step);
    for (var i = 0; i < n; ++i){
      expect(curve[i].x).toBeCloseTo(expectedX[i], 6);
      expect(curve[i].y).toBeCloseTo(expectedY[i], 6);
    }
  });
});