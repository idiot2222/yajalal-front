<template>
<v-card>
  <v-card-title class="title">{{ title }}</v-card-title>
  <RankingLine
      v-for="(item, n) in item.stats"
      :key="n"
      class="line"
      :item="item"
      :seq="n+1"
  />
</v-card>
</template>

<script>
import RankingLine from "@/components/PlayerRankingLine";
import {mapState} from "vuex";
export default {
  name: "RankingBox",
  data() {
    return {
      title: '',
    }
  },
  methods: {
    convertStatName(stat) {
      if(this.isBatting) {
        return this.battingStatMap.get(stat)
      }

      return this.pitchingStatMap.get(stat);
    }
  },

  created() {
    this.title = this.convertStatName(this.$props.item.stat);
  },

  components: {
    RankingLine
  },

  computed: {
    ...mapState({
      battingStatMap: state => state.battingStatMap,
      pitchingStatMap: state => state.pitchingStatMap,
    })
  },

  props: [
      'item', 'isBatting'
  ]
}
</script>

<style>
.title {
  display: block;
  text-align: center;
}

.line {
  font-size: 18px;
}

</style>