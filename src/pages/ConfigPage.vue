<template>
  <div>
    <h1>Config</h1>
  </div>
</template>

<script>
export default {
  name: "ConfigPage",
  data() {
    return {
      tabs: [],
    };
  },
  methods: {},
  components: {},
  mounted() {
    this.$store.commit("setTabs", this.tabs);
  },
}
</script>

<style>
</style>