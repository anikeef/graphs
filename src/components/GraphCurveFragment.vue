<template>
  <polyline :points="polyline" fill="none" :stroke="color" :stroke-width="strokeWidth" />
  <!-- <path :d="path" fill="transparent" :stroke="color" /> -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Curve, CurveFragment } from '../models/curve';
import { Point } from '../models/point';

@Component({})
export default class GraphCurveFragment extends Vue {
  @Prop() points!: CurveFragment;
  @Prop() color!: string;
  @Prop() strokeWidth!: number;

  get polyline(): string {
    return this.points.map(({ x, y }) => `${x},${y}`).join(' ');
  }

  get path(): string {
    const { x: startX, y: startY } = this.points[0];
    return `M${startX} ${startY}` + this.points.slice(1).map(({ x, y }) => `L${x} ${y}`).join(' ');
  }
}
</script>