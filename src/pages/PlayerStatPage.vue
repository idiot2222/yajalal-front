<template>
<v-container>
  <TabTitle>타자</TabTitle>
  <v-divider class="my-2"></v-divider>

  <PlayerBattingStat />

  <v-divider class="my-2"></v-divider>

  <TabTitle>투수</TabTitle>
  <v-divider class="my-2"></v-divider>

  <PlayerPitchingStat />

  <v-divider class="my-2"></v-divider>

</v-container>
</template>

<script>
import TabTitle from "@/components/TabTitle";
import PlayerBattingStat from "@/components/PlayerBattingStat";
import PlayerPitchingStat from "@/components/PlayerPitchingStat";
export default {
  name: "PlayerStatPage",
  data() {
    return {

    }
  },
  methods: {
  },
  components: {
    PlayerPitchingStat,
    PlayerBattingStat,
    TabTitle
  },
}
</script>

<style>
</style>