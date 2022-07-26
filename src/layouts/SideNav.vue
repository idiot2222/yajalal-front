<template>
  <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      app
      permanent
  >
    <v-list-item class="px-2 color" dark>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              박 보근
            </v-list-item-title>
            <v-list-item-subtitle>pky2892@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

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
          color="primary"
      >
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item link to="user">
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title>My Page</v-list-item-title>
        </v-list-item>
        <v-list-item link to="team">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Team</v-list-item-title>
        </v-list-item>
        <v-list-item link to="league">
          <v-list-item-icon>
            <v-icon>mdi-trophy-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title>League</v-list-item-title>
        </v-list-item>
        <v-list-item link to="config">
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Configuration</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
    name: "SideNav",
    data() {
      return {
        drawer: true,
        mini: true,

      }
    },
    methods: {
    },
    components: {
    },
}
</script>

<style>
  .color {
    background-color: #74b9ff
  }
</style>