<template>
  
    <div>
      <!-- UnitLength: {{ unitLength }} Points: {{ svgPoints }} -->
      <svg version="1.1"
        baseProfile="full"
        :width="width" :height="height"
        xmlns="http://www.w3.org/2000/svg">

        <!-- Y-Axis -->
        <line x1="50%" x2="50%" y1="0" y2="100%" stroke="black" stroke-width="1" />
        <!-- X-Axis -->
        <line x1="0" x2="100%" y1="50%" y2="50%" stroke="black" stroke-width="1" />
        <circle :cx="unitLength + width / 2" cy="50%" r="1" />
        <!-- <circle v-for="(point, i) in svgPoints" :cx="point[0]" :cy="point[1]" r="1" :key="i" /> -->
        <polyline :points="polyline" fill="none" stroke="red" />

      </svg>
      {{ test }}
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Point } from '../models/point';
import { Curve } from '../models/curve';

@Component({})
export default class Graph extends Vue {
  @Prop({ default: () => (x: number) => x * x }) readonly f!: (x: number) => number;
  @Prop({ default: 640 }) width!: number;
  @Prop({ default: 380 }) height!: number;
  @Prop({ default: 10 }) xMax!: number;
  @Prop({ default: 10 }) pointsPerUnit!: number;

  // Returns length of one unit in pixels   
  get unitLength(): number {
    return this.width / (this.xMax * 2);
  }

  // This property is an array of points [x, y] in math units. It's computed by applying 
  // the function f() defined in props. Horizontal distance between points is 
  // defined by pointsPerUnit prop
  get realPoints(): Array<Point> {
    const stepLength = 1 / this.pointsPerUnit;
    let points = [];
    for (let x = -this.xMax; x <= this.xMax; x += stepLength) {
      points.push(new Point({ x, y: this.f(x) }));
    }
    return points;
  }

  // This property returns realPoints converted to pixel values that will be drawn on a graph
  get svgPoints(): Array<Point> {
    return this.realPoints.map((point) => this.realPointToPx(point));
  }

  get polyline(): string {
    return this.svgPoints.map(({ x, y }) => `${x},${y}`).join(' ');
  }

  // Returns presentational version of purely mathematical point. It converts units to pixels,
  // flips the y-axis and aligns all points arount center
  realPointToPx({ x, y }: Point): Point {
    return new Point({
      x: x * this.unitLength + this.width/2, 
      y: this.height - (y * this.unitLength + this.height/2)
    });
  }

  get test() {
    let curve = new Curve({ curveFunction: "1/x", interval: { from: -10, to: 10 }, pointsPerUnit: 1 });
    return curve.fragments;
  }
}
</script>

<style scoped>

</style>