<template>
  <div>
    <TabTitle>{{ leagueInfo.name }} 대시보드</TabTitle>
    <v-row
        class="mx-4"
    >
      <v-col
          cols="8"
      >
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
      <v-col>
        <TeamRankingBox
            :items="leagueRecords"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TabTitle from "@/components/TabTitle";
import {mapState} from "vuex";
import apiUtils from "@/apiUtils";
import TeamRankingBox from "@/components/TeamRankingBox";
import RankingBox from "@/components/PlayerRankingBox";

export default {
  name: "MyLeaguePage",
  data() {
    return {
      leagueInfo: {},
      leagueRecords: [],
      batting: [],
      pitching: [],
    }
  },
  methods: {
    getLeagueInfo() {
      apiUtils.getLeagueInfo(this.currentPlayerId)
          .then(res => {
            this.leagueInfo = res.data.leagueInfo;
            this.leagueRecords = res.data.teamRecords;
          });

    },
    getLeagueBattingTopPlayers() {
      apiUtils.getLeagueBattingTopPlayersByPlayerId(this.currentPlayerId)
          .then(res => this.batting = res.data.content);
    },
    getLeaguePitchingTopPlayers() {
      apiUtils.getLeaguePitchingTopPlayersByPlayerId(this.currentPlayerId)
          .then(res => this.pitching = res.data.content);
    },
  },
  components: {
    TeamRankingBox,
    TabTitle,
    RankingBox
  },

  computed: {
    ...mapState({
      currentPlayerId: state => state.currentPlayerId,
    })
  },

  created() {
    this.getLeagueInfo();
    this.getLeagueBattingTopPlayers();
    this.getLeaguePitchingTopPlayers();
  }
}
</script>

<style>
</style>