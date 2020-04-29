<template>
  <div ref="container" style="position: fixed; width: 100vw; background-color: red">
    <div style="height: 40px"></div>
    <div v-if="toggle" style="height:50px"></div>
  </div>
</template>

<script>
import ApplicationableUtil from "@/util/applicationableUtil"

export default {

  mixins: [
    ApplicationableUtil("myappbar1", "container")
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
