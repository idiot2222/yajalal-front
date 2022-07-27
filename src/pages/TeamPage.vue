<template>
  <div>
    <h1>This is Team page !!! ho!!</h1>
  </div>
</template>

<script>
export default {
  name: "TeamPage",
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