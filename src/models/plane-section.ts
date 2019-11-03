export class PlaneSection {
  xMin: number;
  xMax: number;
  width: number;
  yMin: number;
  yMax: number;
  height: number;

  constructor({ xMin, xMax, yMin, yMax }: {
    xMin: number,
    xMax: number,
    yMin: number,
    yMax: number
  }) {
    this.xMin = xMin;
    this.xMax = xMax;
    this.width = xMax - xMin;
    this.yMin = yMin;
    this.yMax = yMax;
    this.height = yMax - yMin;
  }
}