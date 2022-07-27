<template>
  <div>
    <h1>This is League !!! yaYayay!!</h1>
  </div>
</template>

<script>
export default {
  name: "LeaguePage",
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