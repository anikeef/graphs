<template>
  <g>
    <!-- Y-Axis -->
    <line :x1="0" :x2="0" :y1="visibleArea.yMin" :y2="visibleArea.yMax" :stroke="color" :stroke-width="strokeWidth" />
    <!-- X-Axis -->
    <line :x1="visibleArea.xMin" :x2="visibleArea.xMax" :y1="0" :y2="0" :stroke="color" :stroke-width="strokeWidth" />
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { PlaneSection } from '../models/plane-section';

@Component({})
export default class GraphAxis extends Vue {
  @Prop() visibleArea!: PlaneSection;
  @Prop({ default: '#aaa' }) color!: string;
  @Prop() strokeWidth!: number;
}
</script>