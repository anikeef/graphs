<template>
  
    <div>
      <!-- UnitLength: {{ unitLength }} Points: {{ svgPoints }} -->
      <svg version="1.1"
        baseProfile="full"
        :width="width" :height="height"
        xmlns="http://www.w3.org/2000/svg">

        <!-- Y-Axis -->
        <line :x1="center[0]" :x2="center[0]" y1="0" y2="100%" stroke="black" stroke-width="1" />
        <!-- X-Axis -->
        <line x1="0" x2="100%" :y1="this.height - center[1]" :y2="this.height - center[1]" stroke="black" stroke-width="1" />
        <circle :cx="unitLength + width / 2" cy="50%" r="1" />
        <!-- <circle v-for="(point, i) in svgPoints" :cx="point[0]" :cy="point[1]" r="1" :key="i" /> -->
        <polyline :points="polyline" fill="none" stroke="red" />

      </svg>
    </div>
</template>

<script>
export default {
  name: 'Graph',
  props: {
    // TODO: f should accept a string
    f: {
      type: Function,
      default: (x) => Math.cos(x)
    },
    width: {
      type: Number,
      default: 640
    },
    height: {
      type: Number,
      default: 380
    },
    center: {
      type: Array,
      default: () => [320, 190]
    },
    xMax: {
      type: Number,
      default: 10
    },
    pointsPerUnit: {
      type: Number,
      default: 10
    }
  },
  computed: {

    // Returns length of one unit in pixels

    unitLength() {
      return this.width / (this.xMax * 2)
    },

    // This property is an array of points [x, y] in math units. It's computed by applying 
    // the function f() defined in props. Horizontal distance between points is 
    // defined by pointsPerUnit prop

    realPoints() {
      const stepLength = 1 / this.pointsPerUnit;
      let points = [];
      for (let x = -this.xMax; x <= this.xMax; x += stepLength) {
        points.push([x, this.f(x)]);
      }
      return points;
    },

    // This property returns realPoints converted to pixel values that will be drawn on a graph

    svgPoints() {
      return this.realPoints.map((point) => this.realPointToPx(point));
    },

    polyline() {
      return this.svgPoints.map((point) => point.join(',')).join(' ');
    }
  },
  methods: {
    // Returns presentational version of purely mathematical point. It converts units to pixels,
    // flips the y-axis and aligns all points arount center
    realPointToPx([x, y]) {
      return [x * this.unitLength + this.center[0], this.height - (y * this.unitLength + this.center[1])]
    }
  }
}
</script>

<style scoped>

</style>