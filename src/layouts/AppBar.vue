<template>
  <v-app-bar
      app
      :color="mainColor"
      dark
  >
    <div class="d-flex align-center ps-5">
      <h1>Yajalal</h1>
    </div>
    <v-tabs>
      <v-tab
          v-for="(tab, n) in tabs"
          :key="n"
          :to="tab[1]"
      >
        {{ tab[0] }}
      </v-tab>
    </v-tabs>

    <v-spacer></v-spacer>

    <v-btn
        v-if="currentUserId === -1"
        to="/join"
        text
    >
      회원가입
    </v-btn>
    <v-btn
        v-if="currentUserId === -1"
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
      currentUserId: state => state.currentUserId,
      tabs: state => state.tabs,
    }),
  },
}
</script>

<style>
</style>