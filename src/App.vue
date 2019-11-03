<template>
  <div id="app">
    <Graph :curves="curves" @mousemove="handleMove" :points="points" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Graph from './components/Graph.vue';
import { evaluate } from 'mathjs';
import { Point } from './models/point';
import { slope } from './helpers/slope';

@Component({
  components: {
    Graph,
  },
})
export default class App extends Vue {
  public mainFunc = '1/(x)';
  public curves = [
    { func: this.mainFunc, color: 'red' },
    // { func: slope('cos(x)', 1), color: 'black' }
    // { func: '-cos(x)', color: 'red' },
    // { func: 'sqrt(1 - x^2)', color: 'blue'},
    // { func: '-sqrt(1 - x^2)', color: 'blue'},
  ]

  public points = [
    { point: { x: 1, y: 1 }, color: 'black' }
  ]

  handleMove(x: number): void {
    this.points = [
      { point: { x, y: evaluate(this.mainFunc, { x }) }, color: 'red' }
    ],
    this.curves = [
      { func: this.mainFunc, color: 'red' },
      { func: slope(this.mainFunc, x), color: 'grey' }
    ]
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
