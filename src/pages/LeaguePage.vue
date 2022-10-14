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