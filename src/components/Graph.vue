<template>
  
    <div>
      <svg version="1.1" class="graph"
        baseProfile="full"
        :width="width" :height="height"
        xmlns="http://www.w3.org/2000/svg"
        :viewBox="viewBox"
        ref="canvas">

        <GraphAxis :visibleArea="visibleArea" :strokeWidth="strokeWidth" />
        <GraphCurve v-for="curve of curves" :curveConfig="curve" :visibleArea="visibleArea" 
        :key="curve.func" :pointsPerUnit="pointsPerUnit" :strokeWidth="strokeWidth" />
        <GraphPoint v-for="point of points" :pointConfig="point" :radius="strokeWidth" 
        :key="`${point.x} ${point.y}`" />
      </svg>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Point } from '../models/point';
import { PlaneSection } from '../models/plane-section';
import GraphCurve from './GraphCurve.vue';
import GraphAxis from './GraphAxis.vue';
import GraphPoint from './GraphPoint.vue';

@Component({
  components: { GraphCurve, GraphAxis, GraphPoint }
})
export default class Graph extends Vue {
  @Prop() curves!: Array<{ func: string, color: string }>;
  @Prop() points!: Array<{ point: Point, color: string }>;
  @Prop({ default: 640 }) width!: number;
  @Prop({ default: 380 }) height!: number;
  @Prop({ default: () => ({ min: -10, max: 10 }) }) xInterval!: { min: number, max: number };

  public visibleArea = (() => {
    const yLength = (this.xInterval.max - this.xInterval.min) * (this.height / this.width);
    return new PlaneSection({
      xMin: this.xInterval.min,
      xMax: this.xInterval.max,
      yMin: -yLength/2,
      yMax: yLength/2
    });
  })();

  get pointsPerUnit(): number {
    return this.width / this.visibleArea.width;
  }

  get viewBox(): string {
    return `${ this.visibleArea.xMin } ${ this.visibleArea.yMin } ${ this.visibleArea.width } ${ this.visibleArea.height }`;
  }

  get strokeWidth(): number {
    return this.pxToUnits(1);
  }

  private pxToUnits(px: number): number {
    const pxInUnits = this.visibleArea.width / this.width;
    return px * pxInUnits;
  }

  // handleMouseMove(event: { 
  //   pageX: number, 
  //   pageY: number, 
  //   target: { getBoundingClientRect: () => { left: number } } 
  // }): void {
  //   const { left } = (this.$refs.canvas as any).getBoundingClientRect();
  //   const x = this.pxToUnits(event.pageX - left + this.minPoint.x);
  //   this.$emit('mousemove', x);
  // }
}
</script>

<style scoped>
  .graph {
    /* Flip Y-axis */
    transform-origin: 50% 50%; /* center of rotation is set to the center of the element */
    transform: scale(1,-1);
  }
</style>