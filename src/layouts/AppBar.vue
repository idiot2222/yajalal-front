<template>
  <v-app-bar
      app
      :color="mainColor"
      dark
  >
    <div class="d-flex align-center ps-5">
      <h1>Yajalal</h1>
    </div>

    <v-spacer></v-spacer>

    <v-btn
        v-if="currentUser === ''"
        to="/join"
        text
    >
      회원가입
    </v-btn>
    <v-btn
        v-if="currentUser === ''"
        to="/login"
        text
    >
      로그인
    </v-btn>
    <v-btn
        v-else
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
    async logout() {
      this.$store.commit('logout');

      if (window.location.pathname !== '/') {
        await this.$router.push('/');
      }
    },
  },
  components: {},
  computed: {
    ...mapState({
      mainColor: state => state.mainColor,
      subColor: state => state.subColor,
      currentUser: state => state.currentUser,
    }),
  },
}
</script>

<style>
</style>