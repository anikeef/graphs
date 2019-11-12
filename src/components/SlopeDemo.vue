<template>
  <div class="slopeDemo">
    <div class="slopeDemo__container">
      <div class="slopeDemo__inputContainer">
        <div class="slopeDemo__inputLabel">f(x) =</div>
        <input v-model="mainFunc" class="slopeDemo__input" />
      </div>
      <Graph :curves="curves" @mousemove="handleMove" :points="points" @mouseleave="handleLeave"
      :width="600" />
    </div>
    <div class="slopeDemo__container">
      <div class="slopeDemo__inputContainer">
        <div class="slopeDemo__inputLabel">f'(x) =</div>
        <input disabled :value="derivative" class="slopeDemo__input" />
      </div>
      <Graph :curves="derivativeCurves" :points="derivativePoints" @mousemove="handleMove" 
      @mouseleave="handleLeave" :width="600" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Graph from '../components/Graph.vue';
import { Point } from '../models/point';
import { slope, derivative, evaluateAt } from '../helpers/slope';
import { CurveConfig } from '../components/GraphCurve.vue';
import { PointConfig } from '../components/GraphPoint.vue';

@Component({
  components: {
    Graph
  },
})
export default class SlopeDemo extends Vue {
  public mainFunc = '1/x';
  public hover = false;
  public x = 0;

  get derivative(): string {
    return derivative(this.mainFunc);
  }

  get curves(): Array<CurveConfig> {
    return (this.hover) ? [
      { func: this.mainFunc, color: 'red' },
      { func: slope(this.mainFunc, this.x), color: 'grey'}
    ] : [{ func: this.mainFunc, color: 'red' }];
  }

  get derivativeCurves(): Array<CurveConfig> {
    return [{ func: this.derivative, color: 'blue' }];
  }

  get points(): Array<PointConfig> {
    const value = evaluateAt(this.mainFunc, this.x) 
    return (this.hover && isFinite(value)) ? [
      { point: { x: this.x, y: value }, color: 'red', radius: 3 }
    ] : [];
  }

  get derivativePoints(): Array<PointConfig> {
    const value = evaluateAt(this.derivative, this.x);
    return (this.hover && isFinite(value)) ? [
      { point: { x: this.x, y: value }, color: 'blue', radius: 3 }
    ] : [];
  }

  handleMove(x: number): void {
    this.hover = true;
    this.x = x;
  }

  handleLeave(): void {
    this.hover = false;
  }
}
</script>

<style lang="scss">
.slopeDemo {
  display: flex;
  justify-content: space-around;
  align-items: center;

  &__inputContainer {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__input {
    outline: none;
    padding: 5px 10px;
    margin: 10px;
    border-radius: 3px;
    border: 1px solid black;
  }
}
</style>
