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

    <div
    >
      <v-btn
          class="ma-5"
          style="float: right"
          depressed
          color="primary"
          @click="submit"
      >
        확인
      </v-btn>
    </div>

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
    }
  },
  methods: {
    submit() {
      if(!this.$refs.battingStats.validate()) {
        return;
      }

      const batters = this.$refs.battingStats.batters;
      const pitchers = this.$refs.pitchingStats.pitchers;

      const result = apiUtils.createNewMatch(0, batters, pitchers).then(res => res);

      console.log(result);
    },
    getPlayers() {
      apiUtils.getMyTeamPlayers(this.currentTeamId)
      .then(res => {
        this.players = res.data.content
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