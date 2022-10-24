<template>
  <v-card>
    <v-simple-table
        dense
    >
      <thead>
      <tr>
        <th>팀 타율</th>
        <th>타수</th>
        <th>단타</th>
        <th>2루타</th>
        <th>3루타</th>
        <th>홈런</th>
        <th>사사구</th>
        <th>타점</th>
        <th>득점</th>
        <th>도루</th>
        <th>도실</th>
        <th>삼진</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{ avg }}</td>
        <td>{{ $props.stats.ab }}</td>
        <td>{{ $props.stats.h }}</td>
        <td>{{ $props.stats.h2 }}</td>
        <td>{{ $props.stats.h3 }}</td>
        <td>{{ $props.stats.hr }}</td>
        <td>{{ $props.stats.bb }}</td>
        <td>{{ $props.stats.rbi }}</td>
        <td>{{ $props.stats.r }}</td>
        <td>{{ $props.stats.sb }}</td>
        <td>{{ $props.stats.cs }}</td>
        <td>{{ $props.stats.k }}</td>
      </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  name: "BattingStatTotal",
  data() {
    return {

    }
  },

  computed: {
    avg() {
      const temp = this.$props.stats;

      if(temp.ab === 0) {
        return temp.ab.toFixed(3);
      }

      return ((temp.h + temp.h2 + temp.h3 + temp.hr) / temp.ab).toFixed(3);
    }
  },

  props: [
      'stats'
  ]
}
</script>

<style>
</style>