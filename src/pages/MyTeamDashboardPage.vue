<template>
  <div>
    <TeamInfoTitle>{{ teamName }} 대시보드</TeamInfoTitle>
    <v-row
        class="mx-4"
    >
      <v-col>
<!--        batting stat-->
        <v-row>
          <v-col
              v-for="(item, n) in batting"
              :key="n"
          >
            <RankingBox
                :item="item"
                :isBatting="true"
            />
          </v-col>
        </v-row>
<!--        pitching stat-->
        <v-row>
          <v-col
              v-for="(item, n) in pitching"
              :key="n"
          >
            <RankingBox
                :item="item"
                :isBatting="false"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col
          cols="3"
      >
        <v-row>
          <NoticeBoard />
        </v-row>
        <v-row>
          <NoticeBoard />
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RankingBox from "@/components/RankingBox";
import TeamInfoTitle from "@/components/TeamInfoTitle";
import apiUtils from "@/apiUtils";
import {mapState} from "vuex";
import NoticeBoard from "@/components/NoticeBoard";

export default {
  name: "MyTeamDashboardPage",

  data() {
    return {
      tabs: [
        ["dashboard", "/myteam-dashboard"],
        ["home", "/myteam-home"]
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

  components: {NoticeBoard, TeamInfoTitle, RankingBox},

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