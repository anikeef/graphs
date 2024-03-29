<template>
  <div class="slopeDemo">
    <h1 class="slopeDemo__title">Draw my slope</h1>
    <div class="slopeDemo__containers">
      <SlopeDemoContainer label="y(x) =" v-model="mainFunc" :curves="curves" :points="points" :graphWidth="600"
      :axisColor="axisColor" @mousemove="handleMove" @mouseleave="handleLeave" />
      <SlopeDemoContainer label="y'(x) =" v-model="derivative" :curves="derivativeCurves" 
      :points="derivativePoints" :graphWidth="600" :axisColor="axisColor" @mousemove="handleMove" 
      @mouseleave="handleLeave" :disabled="true" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Graph from './Graph.vue';
import { Point } from '../models/point';
import { slope, derivative, evaluateAt } from '../helpers/slope';
import { CurveConfig } from './GraphCurve.vue';
import { PointConfig } from './GraphPoint.vue';
import SlopeDemoContainer from './SlopeDemoContainer.vue';

@Component({
  components: {
    Graph,
    SlopeDemoContainer
  },
})
export default class SlopeDemo extends Vue {
  public readonly axisColor = 'rgb(137, 137, 137)';
  public readonly funcColor = 'rgb(253, 53, 66)';
  public readonly derivativeColor = 'rgb(93, 192, 214)';
  public readonly slopeColor = 'white';
  public mainFunc = '1/cos(x)';
  public hover = false;
  public x = 0;

  get derivative(): string {
    return derivative(this.mainFunc);
  }

  get curves(): Array<CurveConfig> {
    return (this.hover) ? [
      { func: this.mainFunc, color: this.funcColor },
      { func: slope(this.mainFunc, this.x), color: this.slopeColor }
    ] : [{ func: this.mainFunc, color: this.funcColor }];
  }

  get derivativeCurves(): Array<CurveConfig> {
    return [{ func: this.derivative, color: this.derivativeColor }];
  }

  get points(): Array<PointConfig> {
    const value = evaluateAt(this.mainFunc, this.x) 
    return (this.hover && isFinite(value)) ? [
      { point: { x: this.x, y: value }, color: this.slopeColor, radius: 3 }
    ] : [];
  }

  get derivativePoints(): Array<PointConfig> {
    const value = evaluateAt(this.derivative, this.x);
    return (this.hover && isFinite(value)) ? [
      { point: { x: this.x, y: value }, color: this.derivativeColor, radius: 3 }
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
  background-color: black;
  height: 100%;
  color: rgb(233, 233, 233);

  &__inputContainer {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__input {
    outline: none;
    padding: 10px 20px;
    margin: 20px 10px;
    border-radius: 7px;
    border: 1px solid black;
    font-family: inherit;
    font-size: 14px;
    color: white;
    background-color: rgb(41, 41, 41);
  }

  &__containers {
    display: flex;
    justify-content: space-around;
  }

  &__title {
    padding: 60px 0 40px;
    text-align: center;
  }
}
</style>
