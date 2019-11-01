<template>
  <g>
    <GraphCurveFragment v-for="(fragment, index) of curve.fragments" 
    :key="index" :fragment="fragment" :center="center" :unitLength="unitLength"/>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Curve } from '../models/curve';
import GraphCurveFragment from './GraphCurveFragment.vue';
import { Point } from '../models/point';

@Component({
  components: { GraphCurveFragment }
})
export default class GraphCurve extends Vue {
  @Prop() curve!: Curve;
  @Prop() center!: Point;
  @Prop() unitLength!: number;
}
</script>