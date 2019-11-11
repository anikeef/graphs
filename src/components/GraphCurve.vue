<template>
  <g>
    <GraphCurveFragment v-for="(fragment, index) of curve.fragments" 
    :key="index" :points="fragment" :color="curveConfig.color" :strokeWidth="strokeWidth" :dasharray="curveConfig.dasharray" />
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
  })
}

export interface CurveConfig {
  func: string;
  color?: string;
  dasharray?: string;
  fillInterval?: { min: number, max: number };
}
</script>