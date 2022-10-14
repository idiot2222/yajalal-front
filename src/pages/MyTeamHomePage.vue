<template>
  <div>
    <TeamInfoTitle>{{ teamName }} 페이지</TeamInfoTitle>
    <v-row>
      <RankingBox
          v-for="(item, n) in batting"
          :key="n"
          :item="item"
          :isBatting="true"
      />
    </v-row>
    <v-row>
      <RankingBox
          v-for="(item, n) in pitching"
          :key="n"
          :item="item"
          :isBatting="false"
      />
    </v-row>
  </div>
</template>

<script>
import RankingBox from "@/components/RankingBox";
import TeamInfoTitle from "@/components/TeamInfoTitle";
import apiUtils from "@/apiUtils";
import {mapState} from "vuex";

export default {
  name: "MyTeamHomePage",

  data() {
    return {
      tabs: [
        ["home", "/myteam-home"],
        ["info", "/myteam-info"]
      ],
      batting: [],
      pitching: [],
      teamName: "",
    }
  },

  methods: {
    setTabs() {
      this.$store.commit("setTabs", this.tabs);
    },
    async setStatBoard() {
      this.batting = await apiUtils.getTeamDashBoardBattingByPlayerId(this.currentPlayerId);
      this.pitching = await apiUtils.getTeamDashBoardPitchingByPlayerId(this.currentPlayerId);
    },
    async getTeamName() {
      this.teamName = await apiUtils.getTeamNameById(this.currentPlayerId);
    },
    statParsing(data) {
      const array = [];

      data.forEach(x => {
        const temp = [];

        temp[0] = x.stat;
        temp[1] = x.stats;

        array.push(temp);
      });

      return array;
    },
  },

  components: {TeamInfoTitle, RankingBox},

  mounted() {
    this.setTabs();

    this.getTeamName();
    this.setStatBoard();
  },

  watch: {
    $route() {
      this.getTeamName();
      this.setStatBoard();
    }
  },

  computed: {
    ...mapState({
      currentPlayerId: state => state.currentPlayerId,
    })
  }
}
</script>

<style>
.team-main {
  width: 1050px;
  height: 800px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>