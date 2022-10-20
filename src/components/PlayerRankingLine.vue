<template>
  <v-card-text>
    {{ seq }}. {{ item.playerName }}

    <span class="statValue">{{ item.statValue }}</span>
  </v-card-text>
</template>

<script>
export default {
  name: "RankingLine",
  data() {
    return {

    }
  },
  methods: {
  },
  components: {
  },
  props: [
      'seq', 'item'
  ]
}
</script>

<style>

.statValue {
  float: right;
  font-weight: 450;
}
</style>