<template>
  <v-app-bar
      app
      :color="mainColor"
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
      >
        {{ e }}
      </v-tab>
    </v-tabs>
    <!--    </template>-->

    <v-spacer></v-spacer>

    <v-btn
        to="/join"
        text
    >
      회원가입
    </v-btn>
    <v-btn
        to="/login"
        text
    >
      로그인
    </v-btn>
    <v-btn
        text
        @click="logout"
    >
      로그아웃
    </v-btn>

  </v-app-bar>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "AppBar",
  data() {
    return {}
  },
  methods: {
    logout() {
      this.$store.commit('logout');

      this.$router.push('/');
    },
  },
  components: {},
  computed: {
    ...mapState({
      tabs: state => state.appVarTabs,
      mainColor: state => state.mainColor,
      subColor: state => state.subColor,
    }),
  },
}
</script>

<style>
</style>