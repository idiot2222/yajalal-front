<template>
  <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      app
      permanent
  >
    <v-list-item class="px-2" :style="{'background-color': mainColor}" dark>
      <v-list class="ml-3">
        <v-list-item-content>
          <div v-if="currentUser !== ''">
            <v-list-item-title class="text-h6">
              {{ currentUser.username }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ currentUser.email }}</v-list-item-subtitle>
          </div>
          <div v-else>
            <v-list-item-title class="text-h6">
              로그인 해주세요.
            </v-list-item-title>
          </div>
        </v-list-item-content>
      </v-list>

      <v-spacer></v-spacer>

      <v-btn
          icon
          @click.stop="mini = !mini"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list
        nav
        dense
    >
      <v-list-item-group
          :color="subColor"
      >
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>홈</v-list-item-title>
        </v-list-item>
        <v-list-item link to="user">
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title>내 정보</v-list-item-title>
        </v-list-item>
        <v-list-item link to="team">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>팀 페이지</v-list-item-title>
        </v-list-item>
        <v-list-item link to="league">
          <v-list-item-icon>
            <v-icon>mdi-trophy-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title>리그 페이지</v-list-item-title>
        </v-list-item>
        <v-list-item link to="config">
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title>설정</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "SideNav",
  data() {
    return {
      drawer: true,
      mini: true,

    }
  },
  methods: {},
  components: {},
  computed: {
    ...mapState({
      tabs: state => state.appVarTabs,
      mainColor: state => state.mainColor,
      subColor: state => state.subColor,
      currentUser: state => state.currentUser
    })
  },
}
</script>

<style>
.color {
  background-color: #74b9ff
}
</style>