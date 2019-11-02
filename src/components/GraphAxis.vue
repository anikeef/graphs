<template>
  <g>
    <!-- Y-Axis -->
    <line :x1="center.x" :x2="center.x" y1="0" y2="100%" :stroke="color" stroke-width="1" />
    <!-- X-Axis -->
    <line x1="0" x2="100%" :y1="center.y" :y2="center.y" :stroke="color" stroke-width="1" />
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Point } from '../models/point';

@Component({})
export default class GraphAxis extends Vue {
  @Prop() center!: Point;
  @Prop({ default: 'black' }) color!: string;
}
</script>