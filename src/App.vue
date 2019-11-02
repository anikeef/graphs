<template>
  <div id="app">
    <Graph :curves="curves" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Graph from './components/Graph.vue';

@Component({
  components: {
    Graph,
  },
})
export default class App extends Vue {
  public curves = [
    { func: 'cos(x)', color: 'red' },
    { func: '-cos(x)', color: 'red' },
    { func: 'sqrt(1 - x^2)', color: 'blue'},
    { func: '-sqrt(1 - x^2)', color: 'blue'},
  ]
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
