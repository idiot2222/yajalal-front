<template>
  <div>
    <h1>This is home yaho!</h1>
  </div>
</template>

<script>
export default {
  name: "HomePage",

  data() {
    return {
      tabs: [],
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
</style>