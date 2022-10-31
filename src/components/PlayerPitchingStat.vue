<template>
  <v-card>
    <v-simple-table>
      <thead>
      <tr>
        <th>#</th>
        <th>팀</th>
        <th>경기(선발)</th>
        <th>평균자책점</th>
        <th>승</th>
        <th>패</th>
        <th>홀드</th>
        <th>세이브</th>

        <th>탈삼진</th>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <th
                v-bind="attrs"
                v-on="on"
            >
              탈삼진/9
            </th>
          </template>
          <span>9이닝 당 탈삼진</span>
        </v-tooltip>

        <th>사사구</th>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <th
                v-bind="attrs"
                v-on="on"
            >
              사사구/9
            </th>
          </template>
          <span>9이닝 당 사사구</span>
        </v-tooltip>

        <th>이닝</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>-</td>
        <td>{{ stats.teamName }}</td>
        <td>{{ stats.g }} ({{ stats.gs }})</td>
        <td>{{ stats.era }}</td>
        <td>{{ stats.w }}</td>
        <td>{{ stats.l }}</td>
        <td>{{ stats.h }}</td>
        <td>{{ stats.sv }}</td>
        <td>{{ stats.k }}</td>
        <td>{{ kRate }}</td>
        <td>{{ stats.bb }}</td>
        <td>{{ bbRate }}</td>
        <td>{{ inning }}</td>
      </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
import apiUtils from "@/utils/apiUtils";
import {mapState} from "vuex";
import {calBBRate, calKRate, formatInning} from "@/utils/statCalculator";

export default {
  name: "PlayerPitchingStat",
  data() {
    return {
      stats: '',
    }
  },

  computed: {
    ...mapState({
      currentPlayerId: state => state.currentPlayerId,
    }),
    inning() {
      return formatInning(this.stats.ip);
    },
    kRate() {
      return calKRate(this.stats.k, this.stats.ip);
    },
    bbRate() {
      return calBBRate(this.stats.bb, this.stats.ip);
    }

  },

  mounted() {
    apiUtils
        .getPlayerPitchingStats(this.currentPlayerId)
        .then(res => this.stats = res.data.content);
  },
}
</script>

<style>
</style>