<template>
  <g>
    <GraphCurveFragment v-for="(fragment, index) of curve.fragments"
    :key="index" :points="fragment" :color="curveConfig.color" :strokeWidth="strokeWidth" :dasharray="curveConfig.dasharray" />
    <g v-if="curveConfig.fill">
      <GraphCurveFragment v-for="(fragment, index) of filledCurve.fragments" :fillColor="curveConfig.fill.color"
      :key="`filled${index}`" :points="fragment" :color="curveConfig.color" :strokeWidth="strokeWidth" :dasharray="curveConfig.dasharray" />
    </g>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Curve } from '../models/curve';
import GraphCurveFragment from './GraphCurveFragment.vue';
import { Point } from '../models/point';
import { PlaneSection } from '../models/plane-section';

@Component({
  components: { GraphCurveFragment }
})
export default class GraphCurve extends Vue {
  @Prop() curveConfig!: CurveConfig;
  @Prop() visibleArea!: PlaneSection;
  @Prop() pointsPerUnit!: number;
  @Prop() strokeWidth!: number;

  public curve = new Curve({
    func: this.curveConfig.func,
    visibleArea: this.visibleArea,
    pointsPerUnit: this.pointsPerUnit
  });

  get filledCurve() {
    if (!this.curveConfig.fill) return null;
    const { from, to } = this.curveConfig.fill.interval;
    return new Curve({
      func: this.curveConfig.func,
      visibleArea: new PlaneSection({
        xMin: Math.min(from, to),
        xMax: Math.max(from, to),
        yMin: this.visibleArea.yMin,
        yMax: this.visibleArea.yMax
      }),
      pointsPerUnit: this.pointsPerUnit
    });
  }
}

export interface CurveConfig {
  func: string;
  color?: string;
  dasharray?: string;
  fill?: {
    interval: { from: number, to: number };
    color: string
  }
}
</script>