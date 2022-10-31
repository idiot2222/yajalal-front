<template>
  <v-card>
    <v-simple-table
        dense
    >
      <thead>
      <tr>
        <th>평균자책점</th>
        <th>이닝</th>
        <th>탈삼진</th>
        <th>사사구</th>
        <th>자책점</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{ era }}</td>
        <td
            v-text="inningInput"
            @blur="isInputActive = false"
            @focus="isInputActive = true"
        />
        <td>{{ $props.stats.k }}</td>
        <td>{{ $props.stats.bb }}</td>
        <td>{{ $props.stats.er }}</td>
      </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
import {calERA, formatInning} from "@/utils/statCalculator";

export default {
  name: "PitchingStatTotal",
  data() {
    return {
      isInputActive: false,
    }
  },
  methods: {},

  computed: {
    era() {
      return calERA(this.stats.er, this.stats.ip);
    },

    inningInput: {
      get() {
        if (this.isInputActive) {
          return this.$props.stats.ip;
        } else {
          return formatInning(this.$props.stats.ip)
        }
      },
      set(newValue) {
        if (newValue >= 0) {
          this.$props.stats.ip = newValue;
        }
      }
    },
  },

  props: [
      'stats'
  ]
}
</script>

<style>
</style>