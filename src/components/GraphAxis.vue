<template>
  <g>
    <!-- Y-Axis -->
    <line :x1="0" :x2="0" :y1="visibleArea.yMin" :y2="visibleArea.yMax" :stroke="color" :stroke-width="pxInUnits" />
    <!-- X-Axis -->
    <line :x1="visibleArea.xMin" :x2="visibleArea.xMax" :y1="0" :y2="0" :stroke="color" :stroke-width="pxInUnits" />
    <circle v-for="(point, index) of yStrokePoints" :cx="point.x" :cy="point.y" :r="pxInUnits * 2" :key="index" :fill="color" />
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { PlaneSection } from '../models/plane-section';
import { Point } from '../models/point';

@Component({})
export default class GraphAxis extends Vue {
  @Prop() visibleArea!: PlaneSection;
  @Prop({ default: '#aaa' }) color!: string;
  @Prop() pxInUnits!: number;

  get yStrokePoints() {
    let points = [];
    for (let x = Math.ceil(this.visibleArea.xMin); x <= this.visibleArea.xMax; x++) {
      points.push(new Point({ x: x, y: 0 }));
    }
    for (let y = Math.ceil(this.visibleArea.yMin); y <= this.visibleArea.yMax; y++) {
      points.push(new Point({ x: 0, y: y }));
    }
    return points;
  }
}
</script>