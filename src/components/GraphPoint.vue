<template>
  <circle :cx="point.x" :cy="point.y" r="3" :fill="color" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Point } from '../models/point';

@Component({})
export default class GraphPoint extends Vue {
  @Prop() pointConfig!: { point: Point, color: string };
  @Prop() center!: Point;
  @Prop() unitLength!: number;

  get point() {
    return this.realPointToPx(this.pointConfig.point);
  }

  get color() {
    return this.pointConfig.color;
  }

  realPointToPx({ x, y }: Point): Point {
    return new Point({
      x: x * this.unitLength + this.center.x, 
      y: y * this.unitLength + this.center.y
    });
  }
}
</script>