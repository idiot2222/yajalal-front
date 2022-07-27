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
  methods: {},
  components: {},
  mounted() {
    this.$store.commit("setTabs", this.tabs);
  }
}
</script>

<style>
</style>