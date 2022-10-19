<template>
  <div>
    <TabTitle>{{ leagueInfo.name }} 대시보드</TabTitle>
    <v-row
        class="mx-4"
    >
      <v-col
          cols="8"
      >
        babo
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
export default {
  name: "MyLeaguePage",
  data() {
    return {
      leagueInfo: {},
      leagueRecords: [],
    }
  },
  methods: {
    getLeagueInfo() {
       apiUtils.getLeagueInfo(this.currentPlayerId)
           .then(res => {
             this.leagueInfo = res.data.leagueInfo;
             this.leagueRecords = res.data.teamRecords;
           });

    }
  },
  components: {
    TeamRankingBox,
    TabTitle
  },

  computed: {
    ...mapState({
      currentPlayerId: state => state.currentPlayerId,
    })
  },

  created() {
    this.getLeagueInfo();
  }
}
</script>

<style>
</style>