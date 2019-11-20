<template>
  <circle :cx="pointConfig.point.x" :cy="pointConfig.point.y" :r="pointConfig.radius * pxInUnits" 
  :fill="pointConfig.color" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Point } from '../models/point';

@Component({})
export default class GraphPoint extends Vue {
  @Prop() pointConfig!: PointConfig;
  @Prop() pxInUnits!: number;
}

export interface PointConfig {
  point: Point;
  color: string;
  radius: number;
}
</script>