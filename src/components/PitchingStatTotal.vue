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
      let temp = (this.stats.er * 27 / this.stats.ip).toFixed(2);

      if(temp > 99.99) {
        return 99.99;
      }
      else if(isNaN(temp)) {
        return Number(0).toFixed(2);
      }

      return temp;
    },

    inningInput: {
      get() {
        if (this.isInputActive) {
          return this.$props.stats.ip;
        } else {
          let I = parseInt(this.$props.stats.ip / 3);
          let i = this.$props.stats.ip % 3;

          if (i > 0) {
            I += '.' + i;
          }

          return I;
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