<template>
  <g>
    <path v-if="fillColor" :d="filledPath" :fill="fillColor" :stroke="color" :stroke-width="strokeWidth" 
    :stroke-dasharray="dasharray"/>
    <path v-else :d="path" fill="transparent" :stroke="color" :stroke-width="strokeWidth" 
    :stroke-dasharray="dasharray"/>
  </g>
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
  @Prop() dasharray!: string;
  @Prop() fillColor!: string;

  get path(): string {
    const { x: startX, y: startY } = this.points[0];
    return `M${startX} ${startY} ` + this.points.slice(1).map(({ x, y }) => `L${x} ${y}`).join(' ');
  }

  get filledPath(): string {
    const { x: startX } = this.points[0];
    const { x: endX } = this.points.slice(-1)[0];
    return `M${startX} 0 ` + this.points.map(({ x, y }) => `L${x} ${y}`).join(' ') + ` V0`
  }
}
</script>