<template>
  <v-app>
    <AppBar />

    <SideNav />

    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import AppBar from "@/layouts/AppBar";
import SideNav from "@/layouts/SideNav";

export default {
  name: 'App',

  components: {
    SideNav,
    AppBar,
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
