<template>
  <div>

  </div>
</template>

<script>

export default {
  name: "TeamPage",

  data() {
    return {
      tabs: [],
      tab: null,
    }
  },

  methods: {
    setTabs() {
      this.$store.commit("setTabs", this.tabs);
    },
  },

  components: {},

  mounted() {
    this.setTabs();
  }
}
</script>

<style>
.team-main {
  width: 1050px;
  height: 800px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>