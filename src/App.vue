<template>
  <div id="app">
    <SlopeDemo />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SlopeDemo from './components/SlopeDemo.vue';

@Component({
  components: {
    SlopeDemo
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
