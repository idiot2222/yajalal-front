<template>
  <div>
    <TabTitle>{팀 이름} 페이지</TabTitle>
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
import TabTitle from "@/components/TabTitle";

export default {
  name: "MyTeamPage",

  data() {
    return {
      tabs: [
        ["dashboard", "/myteam-dashboard"],
        ["home", "/myteam-home"]
      ]
    }
  },

  methods: {
    setTabs() {
      this.$store.commit("setTabs", this.tabs);
    },
  },

  components: {TabTitle, RankingBox},

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