import { Point } from './point';
import { evaluate } from 'mathjs';
import { PlaneSection } from './plane-section';

// This constant defines which points outside visible area should be drawn. 
// For example, if it is set to 1, only visible points will be drawn. If it is set to 4,
// area of points to draw will be 4 times bigger than visible area.
// This is currently used to prevent interrupting abrupt curves
const Y_INTERVAL_MULTIPLE = 4;

// This class is responsible for storing abstract data about graph curves.
export class Curve {
  // 2-dimensional array is used here to divide points list into fragments. It is needed to support
  // to support basic discontinuous functions like 1/x
  public fragments: Array<CurveFragment>

  constructor({ func, visibleArea, pointsPerUnit }: {
    func: string,
    visibleArea: PlaneSection,
    pointsPerUnit: number
  }) {
    const round = (x: number): number => Math.round(x * 100) / 100;
    const f = (x: number): number => evaluate(func, { x: round(x) });
    const stepLength = 1 / pointsPerUnit;
    this.fragments = [[]];
    for (let x = visibleArea.xMin; x <= visibleArea.xMax; x += stepLength) {
      const value = f(x);
      if (this.isFunctionValueValid(value) && 
          this.isValueBetween(
          value, visibleArea.yMin - visibleArea.height * Y_INTERVAL_MULTIPLE, 
          visibleArea.yMax + visibleArea.height * Y_INTERVAL_MULTIPLE)) {
        this.push(new Point({ x, y: value }));
      } else {
        this.startNewFragment();
      }
    }
  }

  private push(point: Point) {
    this.lastFragment().push(point);
  }

  private isFunctionValueValid(value: number) {
    return typeof value == 'number' && 
      value !== null &&
      isFinite(value);
  }

  private startNewFragment(): void {
    if (this.lastFragment().length) {
      this.fragments.push([]);
    }
  }

  private lastFragment(): CurveFragment {
    return this.fragments.slice(-1)[0];
  }

  private isValueBetween(value: number, min: number, max: number) {
    return min <= value && value <= max;
  }
}

export type CurveFragment = Array<Point>;