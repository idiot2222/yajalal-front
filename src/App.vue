<template>
  <v-app>
    <AppBar />

    <SideNav />

    <v-main>
      <DialogBox
          title="로그인 정보가 필요합니다."
          text="로그인 해주세요."
          :isOpened="isLoggedIn"
          redirectUrl="/login"
      />
      <router-view />
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
    //
  }),

  computed: {
    ...mapState({
      currentUserId: state => state.currentUserId,
    }),

    isLoggedIn() {
      return this.currentUserId === -1;
    }
  }
};
</script>
