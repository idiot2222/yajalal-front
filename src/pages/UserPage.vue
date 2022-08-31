<template>
  <div>
    <h1>This is user page !!! ya!!</h1>
    <p>{{ userInfo }}</p>
  </div>
</template>

<script>
import apiUtils from "@/apiUtils";
import {mapState} from "vuex";

export default {
  name: "UserPage",
  data() {
    return {
      userInfo: {},
    }
  },
  methods: {
    async getUserInfo() {
      return await apiUtils.userInfo(this.currentUser.id);
    },
  },
  components: {},
  async mounted() {
    this.userInfo = await this.getUserInfo();
  },
  computed: {
    ...mapState({
      currentUser: state => state.currentUser,
    })
  }
}
</script>

<style>
</style>