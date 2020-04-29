<template>
  <div ref="container" style="position: fixed; width: 100vw; background-color: green">
    <div style="height: 40px"></div>
    <div v-if="toggle" style="height:70px"></div>
  </div>
</template>

<script>
import ApplicationableUtil from "@/util/applicationableUtil"

export default {

  mixins: [
    ApplicationableUtil("myappbar3", "container")
  ],

  data() {
    return {
      toggle: false
    }
  },

  methods: {

    toggleButton() {
      this.toggle = !this.toggle
      this.$applicationable.update()  // call this anytime container size changes
    }
  }
}
</script>
