<template>
  <polyline :points="polyline" fill="none" :stroke="color" />
  <!-- <path :d="path" fill="transparent" :stroke="color" /> -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Curve, CurveFragment } from '../models/curve';
import { Point } from '../models/point';

@Component({})
export default class GraphCurveFragment extends Vue {
  @Prop() fragment!: CurveFragment;
  @Prop() unitLength!: number;
  @Prop() center!: Point;
  @Prop() color!: string;

  get svgPoints(): Array<Point> {
    return this.fragment.map((point) => {
      return this.realPointToPx(point);
    });
  }

  get polyline(): string {
    return this.svgPoints.map(({ x, y }) => `${x},${y}`).join(' ');
  }

  get path(): string {
    const { x: startX, y: startY } = this.svgPoints[0];
    return `M${startX} ${startY}` + this.svgPoints.slice(1).map(({ x, y }) => `L${x} ${y}`).join(' ');
  }

  // Returns presentational version of purely mathematical point. It converts units to pixels
  // and aligns all points arount center
  realPointToPx({ x, y }: Point): Point {
    return new Point({
      x: x * this.unitLength + this.center.x, 
      y: y * this.unitLength + this.center.y
    });
  }
}
</script>