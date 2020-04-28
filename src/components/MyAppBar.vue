<template>
  <div :style="style" ref="container" style="position: fixed; width: 100vw;">
    <div style="height: 40px"></div>
    <div v-if="toggle" style="height:40px"></div>
  </div>
</template>

<script>
import Applicationable from "vuetify/es5/mixins/applicationable"
import ApplicationableUtil from "@/util/applicationable"

export default {

  name: "MyAppBar",

  mixins: [
    Applicationable("top", ["computedHeight"])
  ],

  props: {
    app: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "black"
    }
  },

  data() {
    return {
      height: 0,
      toggle: false
    }
  },

  mounted() {
    this.applicationableUtil.mounted()
  },

  computed: {

    style() {
      return "background-color: " + this.color
    },

    computedHeight() {
      return this.height
    }
  },

  methods: {

    updateApplication() {
      if (!this.applicationableUtil) {
        this.applicationableUtil = new ApplicationableUtil(this)
      }
      return this.applicationableUtil.updateApplication()
    },

    toggleButton() {
      this.toggle = !this.toggle
      this.applicationableUtil.updateHeight()
    }
  }
}
</script>
