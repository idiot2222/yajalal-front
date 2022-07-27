<template>
  <v-alert
      class="alert"
      :value="value"
      color="blue"
      dark
      transition="scroll-y-reverse-transition"
  >
    {{ message }}
  </v-alert>
</template>

<script>
export default {
  name: "AlertBox",
  data() {
    return {
    }
  },
  methods: {},
  components: {},
  props: ['message', 'value'],

}
</script>

<style>
.alert {
  width: 50%;
  position: absolute;
  bottom: 0;
  margin-bottom: 5px;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  font-size: 25px;
}
</style>