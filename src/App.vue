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
* {
  padding: 0;
  margin: 0;
}

#app,
body,
html {
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
}
</style>
