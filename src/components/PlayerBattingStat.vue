<template>
<v-card>
  <v-simple-table>
    <thead>
      <tr>
        <th>#</th>
        <th>팀</th>
        <th>경기</th>
        <th>타율</th>
        <th>출루율</th>
        <th>장타율</th>
        <th>안타</th>
        <th>2루타</th>
        <th>3루타</th>
        <th>홈런</th>
        <th>사사구</th>
        <th>타점</th>
        <th>득점</th>
        <th>도루</th>
        <th>도루 성공율</th>
        <th>삼진</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>-</td>
        <td>{{ stats.teamName }}</td>
        <td>{{ stats.g }}</td>
        <td>{{ stats.avg }}</td>
        <td>{{ stats.obp }}</td>
        <td>{{ stats.slg }}</td>
        <td>{{ stats.h }}</td>
        <td>{{ stats.h2 }}</td>
        <td>{{ stats.h3 }}</td>
        <td>{{ stats.hr }}</td>
        <td>{{ stats.bb }}</td>
        <td>{{ stats.rbi }}</td>
        <td>{{ stats.r }}</td>
        <td>{{ stats.sb }}</td>
        <td>{{ stats.sbp }}</td>
        <td>{{ stats.so }}</td>
      </tr>
    </tbody>
  </v-simple-table>
</v-card>
</template>

<script>
import apiUtils from "@/utils/apiUtils";
import {mapState} from "vuex";

export default {
  name: "PlayerBattingStat",
  data() {
    return {
      stats: '',
    }
  },

  computed: {
    ...mapState({
      currentPlayerId: state => state.currentPlayerId,
    }),

  },

  mounted() {
    apiUtils
        .getPlayerBattingStats(this.currentPlayerId)
        .then(res => this.stats = res.data.content);
  }
}
</script>

<style>
</style>