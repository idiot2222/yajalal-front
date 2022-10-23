<template>
  <v-container>
    <TabTitle> 타자</TabTitle>
    <!--    <BattingStatBoard-->
    <!--      :players="batters"-->
    <!--    />-->
    <BattingStatBoard
        :players="players"
        ref="battingStats"
    />

    <v-divider class="my-2"></v-divider>

    <TabTitle>투수</TabTitle>

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

export default {
  name: "MatchAddPage",
  data() {
    return {
      players: [],
    }
  },
  methods: {
    submit() {
      this.$refs.battingStats.getBatters();
    },
    getPlayers() {
      apiUtils.getMyTeamPlayers(this.currentTeamId)
      .then(x => {
        this.players = x.data.content
      });
    }
  },
  components: {
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