<template>
  <div>
    <TeamInfoTitle>{팀 이름} 페이지</TeamInfoTitle>
    <v-row>
      <RankingBox
          title="타율"
      />
      <RankingBox
          title="타점"
      />
      <RankingBox
          title="홈런"
      />
      <RankingBox
          title="타자 WAR"
      />
    </v-row>
    <v-row>
      <RankingBox
          title="승리"
      />
      <RankingBox
          title="방어율"
      />
      <RankingBox
          title="탈삼진"
      />
      <RankingBox
          title="투수 WAR"
      />
    </v-row>
  </div>
</template>

<script>
import RankingBox from "@/components/RankingBox";
import TeamInfoTitle from "@/components/TeamInfoTitle";

export default {
  name: "MyTeamInfoPage",

  data() {
    return {
      tabs: [
        ["home", "/myteam-home"],
        ["info", "/myteam-info"]
      ]
    }
  },

  methods: {
    setTabs() {
      this.$store.commit("setTabs", this.tabs);
    },
  },

  components: {TeamInfoTitle, RankingBox},

  mounted() {
    this.setTabs();


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