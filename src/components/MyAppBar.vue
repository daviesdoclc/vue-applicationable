<template>
  <div :style="style" ref="container" style="position: fixed; width: 100vw;">
    <div style="height: 40px"></div>
    <div v-if="toggle" style="height:40px"></div>
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
      height: 0,
      oldheight: 0,
      toggle: false
    }
  },

  mounted() {

    this.top = this.$vuetify.application.top
    this.height = this.$refs.container.clientHeight
    this.oldheight = this.height

    this.$vuetify.application.application.top.myappbar = this.height
    this.$vuetify.application.update("top")

    this.$refs.container.style.top = this.top + "px"

    this.$root.$on("recalc", async (e) => {
      // console.log("recalc: " + e.diff + " " + this.top + " " + e.top)
      if (e.diff > 0 && this.top >= e.top + e.diff) {
        this.top = this.top + e.diff
        this.$refs.container.style.top = this.top + "px"
      } else if (e.diff < 0 && e.top < this.top) {
        this.top = this.top + e.diff
        this.$refs.container.style.top = this.top + "px"
      }
    })
  },

  computed: {

    style() {
      // return "top: " + this.top + "px; height: " + this.height + "px; background-color: " + this.color
      return "background-color: " + this.color
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

    async toggleButton() {

      this.toggle = !this.toggle

      await this.$nextTick()
      this.height = this.$refs.container.clientHeight
    }
  }
}
</script>
