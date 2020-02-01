<template>
  <div :style="style" style="background-color: black; position: fixed; width: 100vw;"></div>
</template>

<script>
import Applicationable from "vuetify/es5/mixins/applicationable"

export default {
  
  name: "MyAppBar",

  mixins: [
    Applicationable("top", ["computedTop", "computedHeight"])
  ],

  props: {
    app: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      top: 0,
      height: 80
    }
  },

  created() {
    this.top = this.$vuetify.application.top - this.height
  },

  computed: {
    style() {
      return "top: " + this.top + "px; height: " + this.height + "px;"
    },

    computedTop() {
      return this.top
    },

    computedHeight() {
      return this.height
    }
  },

  methods: {
    updateApplication() {
      return this.height
    }
  }
}  
</script>
