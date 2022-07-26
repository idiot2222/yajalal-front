<template>
  <v-app>
    <AppBar />

    <SideNav />

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/layouts/AppBar";
import SideNav from "@/layouts/SideNav";

export default {
  name: 'App',

  components: {
    SideNav,
    AppBar,
  },

  data: () => ({
    //
  }),
};
</script>
