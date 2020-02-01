<template>
  <v-app>
    <v-app-bar app color="primary" dark></v-app-bar>
    <MyAppBar app></MyAppBar>
    <v-content>
    </v-content>
  </v-app>
</template>

<script>
import MyAppBar from "@/components/MyAppBar"

export default {
  
  name: "App",

  components: {
    MyAppBar
  },

  data: () => ({
  })
}
</script>
