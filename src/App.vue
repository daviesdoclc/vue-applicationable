<template>
  <v-app>
    <v-app-bar app color="primary" dark></v-app-bar>
    <MyAppBar1 ref="myappbar1"></MyAppBar1>
    <MyAppBar2 ref="myappbar2"></MyAppBar2>
    <MyAppBar3 ref="myappbar3"></MyAppBar3>
    <v-content>
      <div class="flex fill-height" style="overflow: scroll">
        <div style="height: 2000px;">
          <v-btn @click="toggleMyAppBar1">Toggle1</v-btn>
          <v-btn @click="toggleMyAppBar2">Toggle2</v-btn>
          <v-btn @click="toggleMyAppBar3">Toggle3</v-btn>
        </div>
      </div>
    </v-content>
  </v-app>
</template>

<style>

  .v-content {
    height: 100vh;
  }

  .container {
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }

</style>

<script>
import MyAppBar1 from "@/components/MyAppBar1"
import MyAppBar2 from "@/components/MyAppBar2"
import MyAppBar3 from "@/components/MyAppBar3"

export default {

  name: "App",

  components: {
    MyAppBar1,
    MyAppBar2,
    MyAppBar3
  },

  data: () => ({
  }),

  methods: {
    toggleMyAppBar1() {
      this.$refs.myappbar1.toggleButton()
    },

    toggleMyAppBar2() {
      this.$refs.myappbar2.toggleButton()
    },

    toggleMyAppBar3() {
      this.$refs.myappbar3.toggleButton()
    }
  }
}
</script>
