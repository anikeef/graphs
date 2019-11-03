<template>
  <g>
    <GraphCurveFragment v-for="(fragment, index) of curve.fragments" 
    :key="index" :points="fragment" :color="curveConfig.color" :strokeWidth="strokeWidth" />
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
  @Prop() curveConfig!: { func: string, color: string };
  @Prop() visibleArea!: PlaneSection;
  @Prop() pointsPerUnit!: number;
  @Prop() strokeWidth!: number;

  public curve = new Curve({
    func: this.curveConfig.func,
    visibleArea: this.visibleArea,
    pointsPerUnit: this.pointsPerUnit
  })
}
</script>