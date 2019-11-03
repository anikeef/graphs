<template>
  <circle :cx="point.x" :cy="point.y" :r="radius" :fill="color" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Point } from '../models/point';

@Component({})
export default class GraphPoint extends Vue {
  @Prop() pointConfig!: { point: Point, color: string };
  @Prop() radius!: number;

  get point() {
    return this.pointConfig.point;
  }

  get color() {
    return this.pointConfig.color;
  }
}
</script>