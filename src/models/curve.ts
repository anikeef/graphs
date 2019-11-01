import { Point } from './point';
import { evaluate } from 'mathjs';

// This class is responsible for storing abstract data about graph curves. It doesn't know anything about
// how these curves will be drawn
export class Curve {
  // 2-dimensional array is used here to divide points list into fragments. It is needed to support
  // to support basic discontinuous functions like 1/x
  public fragments: Array<CurveFragment>

  constructor({ curveFunction, interval, pointsPerUnit }: {
    curveFunction: string;
    interval: { from: number, to: number };
    pointsPerUnit: number;
  }) {
    const func = (x: number): number => evaluate(curveFunction, { x });
    const stepLength = 1 / pointsPerUnit;
    this.fragments = [[]];
    for (let x = interval.from; x <= interval.to; x += stepLength) {
      const value = func(x);
      if (this.isFunctionValueValid(value)) {
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
}

type CurveFragment = Array<Point>;