<template>
  <v-container>

    <TabTitle>경기 정보</TabTitle>
    <MatchInfoBoard
        ref="matchInfo"
    />

    <v-divider class="my-2"></v-divider>

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

    <div>
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

    <AlertBox
        message="저장 완료"
        :value="alertState"
    />

  </v-container>
</template>

<script>
import TabTitle from "@/components/TabTitle";
import BattingStatBoard from "@/components/BattingStatBoard";
import apiUtils from "@/apiUtils";
import {mapState} from "vuex";
import PitchingStatBoard from "@/components/PitchingStatBoard";
import MatchInfoBoard from "@/components/MatchInfoBoard";
import AlertBox from "@/components/AlertBox";

export default {
  name: "MatchAddPage",
  data() {
    return {
      players: [],
      alertState: false,
    }
  },
  methods: {
    validate() {
      let b = true;

      if(!this.$refs.matchInfo.validate()) {
        b = false;
      }
      if(!this.$refs.battingStats.validate()) {
        b = false;
      }
      if(!this.$refs.pitchingStats.validate()) {
        b = false;
      }

      return b;
    },
    submit() {
      if(!this.validate()) {
        return;
      }

      const batters = this.$refs.battingStats.batters;
      const pitchers = this.$refs.pitchingStats.pitchers;

      const payload = {
        batters,
        pitchers,
        myTeamId: this.currentTeamId,
        yourTeamId: this.$refs.matchInfo.selectedTeam,
        matchDate: this.$refs.matchInfo.date,
      }

      apiUtils.createNewMatch(227, payload)
          .then(res => {
            if(res.data.message === 'ok') {
              this.success();
            }
          });
    },
    success() {
      this.alertState = true;

      setTimeout(() => {
        this.alertState = false

        window.location.reload();
      }, 1000);
    },
    getPlayers() {
      apiUtils.getMyTeamPlayers(this.currentTeamId)
      .then(res => {
        this.players = res.data.content
      });
    }
  },
  components: {
    AlertBox,
    MatchInfoBoard,
    PitchingStatBoard,
    BattingStatBoard,
    TabTitle
  },
  computed: {
    ...mapState({
      currentTeamId: state => state.currentTeamId
    }),
  },
  created() {
    this.getPlayers();
  }

}
</script>

<style>
</style>