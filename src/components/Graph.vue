<template>
  
    <div>
      <!-- UnitLength: {{ unitLength }} Points: {{ svgPoints }} -->
      <svg version="1.1" class="graph"
        baseProfile="full"
        :width="width" :height="height"
        xmlns="http://www.w3.org/2000/svg">

        <!-- Y-Axis -->
        <line x1="50%" x2="50%" y1="0" y2="100%" stroke="black" stroke-width="1" />
        <!-- X-Axis -->
        <line x1="0" x2="100%" y1="50%" y2="50%" stroke="black" stroke-width="1" />
        <circle :cx="unitLength + width / 2" cy="50%" r="1" />
        <!-- <circle v-for="(point, i) in svgPoints" :cx="point[0]" :cy="point[1]" r="1" :key="i" /> -->
        <!-- <polyline :points="polyline" fill="none" stroke="red" /> -->
        <GraphCurve v-for="(curve, index) of curves" :curve="curve" 
        :unitLength="unitLength" :key="index" :center="center" />

      </svg>
      <!-- {{ curves[0].fragments }} -->
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Point } from '../models/point';
import { Curve, Interval } from '../models/curve';
import GraphCurve from './GraphCurve.vue';

// This constant defines which points outside visible area should be drawn. 
// For example, if it is set to 1, only visible points will be drawn. If it is set to 4,
// area of points to draw will be 4 times bigger than visible area.
// This is currently used to prevent interrupting abrupt curves
const Y_INTERVAL_MULTIPLE = 4;

@Component({
  components: { GraphCurve }
})
export default class Graph extends Vue {
  @Prop() curveConfigs!: Array<{ func: string }>
  @Prop({ default: 640 }) width!: number;
  @Prop({ default: 380 }) height!: number;
  @Prop({ default: 20 }) xLength!: number;
  @Prop({ default: 32 }) pointsPerUnit!: number;

  public center: Point = new Point({ x: this.width/2, y: this.height/2 });

  // Returns length of one unit in pixels   
  get unitLength(): number {
    return this.width / (this.xLength);
  }

  get xInterval(): Interval {
    const from = this.pxToUnits(-this.center.x);
    return { from, to: from + this.xLength };
  }

  get yInterval(): Interval {
    const from = this.pxToUnits(-this.center.y);
    return {
      from: from * Y_INTERVAL_MULTIPLE, 
      to: from + this.height * Y_INTERVAL_MULTIPLE / this.unitLength
    };
  }

  get curves(): Array<Curve> {
    return this.curveConfigs.map(({ func }) => {
      return new Curve({ 
        curveFunction: func, 
        xInterval: this.xInterval,
        yInterval: this.yInterval,
        pointsPerUnit: this.pointsPerUnit
      });
    });
  }

  private pxToUnits(px: number) {
    return px / this.unitLength;
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