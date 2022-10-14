<template>
  <div class="title-text my-5">
    <slot />
  </div>
</template>

<script>
export default {
  name: "TeamInfoTitle",
  data() {
    return {

    }
  },
  methods: {
  },
  components: {
  },
}
</script>

<style>
.title-text {
  font-size: 30px;
  font-weight: 900;
  text-align: center;
}
</style>