<template>
  <v-app-bar
  app
  color="#74b9ff"
  dark
  >
  <div class="d-flex align-center ps-5">
    <h1>Yajalal</h1>
  </div>


<!--    <template v-slot:extension>-->
      <v-tabs
          class="ms-10"
          style="display: inline"
      >
        <v-tab
            class="ms-5"
            align-with-title
            v-for="e in tabs"
            :key="e"
        >{{e}}</v-tab>
      </v-tabs>
<!--    </template>-->

  <v-spacer></v-spacer>

    <v-btn
        to="/join"
        text
        color="white"
    >
      Sign up
    </v-btn>
    <v-btn
        to="/login"
        text
        color="white"
    >
      Log in
    </v-btn>



  </v-app-bar>
</template>

<script>
export default {
    name: "AppBar",
    data() {
      return {
        tabs: [
            "t1", "t2", "t3"
        ]
      }
    },
    methods: {
    },
    components: {
    },
}
</script>

<style>
</style>