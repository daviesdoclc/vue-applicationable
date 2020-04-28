<template>
  <div :style="style" ref="container" style="position: fixed; width: 100vw;">
  </div>
</template>

<script>
import Applicationable from "vuetify/es5/mixins/applicationable"

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
      top: 0,
      height: 80
    }
  },

  mounted() {

    this.top = this.$vuetify.application.top
    this.$vuetify.application.application.top.myappbar = this.$refs.container.clientHeight
    this.$vuetify.application.update("top")

    this.$root.$on("recalc", async (e) => {
      if (e.diff > 0 && this.top >= e.top + e.diff) {
        this.top = this.top + e.diff
      } else if (e.diff < 0 && e.top < this.top) {
        this.top = this.top + e.diff
      }
    })
  },

  computed: {

    style() {
      return "top: " + this.top + "px; height: " + this.height + "px; background-color: " + this.color
    },

    computedHeight() {
      return this.height
    }
  },

  methods: {

    updateApplication() {

      const diff = this.height - this.oldheight
      this.oldheight = this.height

      this.$root.$emit("recalc", {
        diff: diff,
        top: this.top
      })

      return this.$vuetify.application.top + diff
    },

    toggleButton() {

      if (this.height === 80) {
        this.height = 160
      } else {
        this.height = 80
      }
    }
  }
}
</script>
