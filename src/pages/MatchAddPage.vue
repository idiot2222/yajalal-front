<template>
  <v-container>

    <TabTitle> 타자</TabTitle>
    <BattingStatBoard
        :players="players"
        ref="battingStats"
    />

    <v-divider class="my-2"></v-divider>

    <TabTitle>투수</TabTitle>
    <PitchingStatBoard
        :players="players"
        ref="pitchingStats"
    />

    <v-divider class="my-2"></v-divider>

    <v-row class="my-2">
      <v-btn
          depressed
          color="primary"
          @click="submit"
      >
        확인
      </v-btn>
    </v-row>

  </v-container>
</template>

<script>
import TabTitle from "@/components/TabTitle";
import BattingStatBoard from "@/components/BattingStatBoard";
import apiUtils from "@/apiUtils";
import {mapState} from "vuex";
import PitchingStatBoard from "@/components/PitchingStatBoard";

export default {
  name: "MatchAddPage",
  data() {
    return {
      players: [],
      batters: [],
      pitchers: [],
    }
  },
  methods: {
    submit() {
      this.batters = this.$refs.battingStats.batters;
      this.pitchers = this.$refs.pitchingStats.pitchers;

      console.log(this.batters);
      console.log(this.pitchers);
    },
    getPlayers() {
      apiUtils.getMyTeamPlayers(this.currentTeamId)
      .then(x => {
        this.players = x.data.content
      });
    }
  },
  components: {
    PitchingStatBoard,
    BattingStatBoard,
    TabTitle
  },
  computed: {
    ...mapState({
      currentTeamId: state => state.currentTeamId
    })
  },
  created() {
    this.getPlayers();
  }
}
</script>

<style>
</style>