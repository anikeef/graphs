import { Point } from './point';
import { evaluate } from 'mathjs';

// This class is responsible for storing abstract data about graph curves. It doesn't know anything about
// how these curves will be drawn
export class Curve {
  // 2-dimensional array is used here to divide points list into fragments. It is needed to support
  // to support basic discontinuous functions like 1/x
  public fragments: Array<CurveFragment>

  constructor({ curveFunction, xInterval, yInterval, pointsPerUnit }: {
    curveFunction: string;
    xInterval: Interval;
    yInterval: Interval;
    pointsPerUnit: number;
  }) {
    const round = (x: number): number => Math.round(x * 100) / 100;
    const func = (x: number): number => evaluate(curveFunction, { x: round(x) });
    const stepLength = 1 / pointsPerUnit;
    this.fragments = [[]];
    for (let x = xInterval.from; x <= xInterval.to; x += stepLength) {
      const value = func(x);
      if (this.isFunctionValueValid(value) && this.isValueInInterval(value, yInterval)) {
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

  private isValueInInterval(value: number, interval: Interval) {
    return interval.from <= value && value <= interval.to;
  }
}

export type CurveFragment = Array<Point>;
export type Interval = { from: number, to: number };