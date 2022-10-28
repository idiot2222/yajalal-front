<template>
  <v-app>
    <AppBar/>

    <SideNav/>

    <v-main>
      <DialogBox
          title="로그인 정보가 필요합니다."
          text="로그인 해주세요."
          :isOpened="nowNeedLogin"
          redirectUrl="/login"
      />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/layouts/AppBar";
import SideNav from "@/layouts/SideNav";
import DialogBox from "@/components/DialogBox";
import {mapState} from "vuex";

export default {
  name: 'App',

  components: {
    DialogBox,
    SideNav,
    AppBar,
  },

  data: () => ({
    noLoginUrls: [
      '/', '/login', '/join', '/team', '/league', '/config'
    ],
    nowNeedLogin: false,
  }),

  methods: {
    isLoggedIn() {
      this.nowNeedLogin = true;

      this.noLoginUrls.forEach(e => {
        if (window.location.pathname === e) {
          this.nowNeedLogin = false;
        }
      });

      if (this.nowNeedLogin) {
        this.nowNeedLogin = this.currentUserId === -1;
      }
    }
  },

  computed: {
    ...mapState({
      currentUserId: state => state.currentUserId,
    }),
  },

  watch: {
    '$route'() {
      this.isLoggedIn();
    },
  },

};
</script>
