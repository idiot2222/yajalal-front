<template>
  <div>
    <h1>This is user page !!! ya!!</h1>
  </div>
</template>

<script>
import apiUtils from "@/apiUtils";

export default {
  name: "UserPage",
  data() {
    return {
      tabs: [],
    }
  },
  methods: {},
  components: {},
  mounted() {
    this.$store.commit("setTabs", this.tabs);

    apiUtils.userInfo();
  }
}
</script>

<style>
</style>