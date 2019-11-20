<template>
  <div class="slopeDemo__container">
    <div class="slopeDemo__inputContainer">
      <div class="slopeDemo__inputLabel">{{ label }}</div>
      <input @input="$emit('input', $event.target.value)" :value="value" class="slopeDemo__input" />
    </div>
    <Graph :curves="curves" @mousemove="$emit('mousemove', $event)" :points="points" @mouseleave="$emit('mouseleave', $event)"
    :width="graphWidth" :axisColor="axisColor" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CurveConfig } from './GraphCurve.vue';
import { PointConfig } from './GraphPoint.vue';
import Graph from './Graph.vue';

@Component({
  components: {
    Graph
  }
}) 
export default class SlopeDemoContainer extends Vue {
  @Prop() label!: string;
  @Prop() value!: string;
  @Prop() curves!: Array<CurveConfig>;
  @Prop() points!: Array<PointConfig>;
  @Prop() graphWidth!: number;
  @Prop() axisColor!: string;
}
</script>