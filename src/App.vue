<template>
  <v-app>
    <v-app-bar app color="primary" dark></v-app-bar>
    <MyAppBar app color="black" ref="black"></MyAppBar>
    <MyAppBar app color="red" ref="red"></MyAppBar>
    <v-content>
      <div class="flex fill-height" style="overflow: scroll">
        <div style="height: 2000px;">
          <v-btn @click="toggleBlack">Toggle black</v-btn>
          <v-btn @click="toggleRed">Toggle red</v-btn>
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
import MyAppBar from "@/components/MyAppBar"

export default {

  name: "App",

  components: {
    MyAppBar
  },

  data: () => ({
  }),

  methods: {
    toggleBlack() {
      this.$refs.black.toggleButton()
    },

    toggleRed() {
      this.$refs.red.toggleButton()
    }
  }
}
</script>
