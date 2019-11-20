<template>
  <svg version="1.1" class="graph"
    baseProfile="full" @mousemove="handleMouseMove" @mouseleave="$emit('mouseleave')"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    :width="width"
    ref="canvas">
    <GraphAxis :visibleArea="visibleArea" :pxInUnits="pxInUnits" :color="axisColor" />
    <GraphCurve v-for="curve of curves" :curveConfig="curve" :visibleArea="visibleArea" 
    :key="curve.func" :pointsPerUnit="pointsPerUnit" :strokeWidth="pxInUnits" />
    <GraphPoint v-for="point of points" :pointConfig="point" :pxInUnits="pxInUnits"
    :key="`${point.x} ${point.y}`" />
  </svg>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Point } from '../models/point';
import { PlaneSection } from '../models/plane-section';
import GraphCurve, { CurveConfig } from './GraphCurve.vue';
import GraphAxis from './GraphAxis.vue';
import GraphPoint, { PointConfig } from './GraphPoint.vue';

@Component({
  components: { GraphCurve, GraphAxis, GraphPoint }
})
export default class Graph extends Vue {
  @Prop() curves!: Array<CurveConfig>;
  @Prop() points!: Array<PointConfig>;
  @Prop() width!: number;
  @Prop({ default: () => ({ min: -10, max: 10 }) }) xInterval!: { min: number, max: number };
  @Prop({ default: () => ({ min: -6, max: 6 }) }) yInterval!: { min: number, max: number };
  @Prop({ default: 'black' }) axisColor!: string;

  public visibleArea = new PlaneSection({
    xMin: this.xInterval.min,
    xMax: this.xInterval.max,
    yMin: this.yInterval.min,
    yMax: this.yInterval.max
  });

  get viewBox(): string {
    return `${ this.visibleArea.xMin } ${ this.visibleArea.yMin } ${ this.visibleArea.width } ${ this.visibleArea.height }`;
  }

  get pointsPerUnit(): number {
    return this.width / this.visibleArea.width;
  }

  get pxInUnits(): number {
    return this.pxToUnits(1);
  }

  private pxToUnits(px: number): number {
    const pxInUnits = this.visibleArea.width / this.width;
    return px * pxInUnits;
  }

  handleMouseMove(event: { 
    pageX: number, 
    pageY: number
  }): void {
    const { left } = (this.$refs.canvas as any).getBoundingClientRect();
    const x = this.visibleArea.xMin + this.pxToUnits(event.pageX - left);
    this.$emit('mousemove', x);
  }
}
</script>

<style scoped>
  .graph {
    /* Flip Y-axis */
    transform-origin: 50% 50%; /* center of rotation is set to the center of the element */
    transform: scale(1,-1);
  }
</style>