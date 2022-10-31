<template>
  <v-alert
      class="alert"
      :value="value"
      :color="alertColor"
      dark
      transition="scroll-y-reverse-transition"
  >
    {{ message }}
  </v-alert>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "AlertBox",
  data() {
    return {
    }
  },
  methods: {},
  props: ['message', 'value', 'color'],
  computed: {
    ...mapState({
      subColor: state => state.subColor,
    }),
    alertColor() {
      return this.$props.color || this.subColor;
    }
  },
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