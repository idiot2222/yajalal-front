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

export default {
  name: "MatchAddPage",
  data() {
    return {
      players: ['자이언츠1', '자이언츠2', '자이언츠3', '자이언츠4']
    }
  },
  methods: {
    submit() {
      this.$refs.battingStats.getBatters();
    },
  },
  components: {
    BattingStatBoard,
    TabTitle
  },
}
</script>

<style>
</style>