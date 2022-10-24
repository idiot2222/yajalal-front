<template>
  <div>
    <v-divider class="mb-2"></v-divider>
    <v-row
        v-for="(batter, n) in batters"
        :key="n"
    >
      <v-col cols="11">
        <BattingStat
            :players="remainedPlayerList"
            :seq="n"
            :batter="batter"
            ref="battingStats"
        />
      </v-col>
      <!--      버튼-->
      <v-col cols="1">
        <v-btn
            v-if="n === 8"
            text
            icon
            color="green lighten-2"
            @click="addBattingStat"
            class="center"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn
            v-if="n >= 9"
            text
            icon
            color="red lighten-2"
            @click="removeBattingStat(n)"
            class="center"
        >
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="11">
        <BattingStatTotal
            :stats="totalStats"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BattingStat from "@/components/BattingStat";
import BattingStatTotal from "@/components/BattingStatTotal";

export default {
  name: "BattingStatBoard",
  data() {
    return {
      batters: [new Batter(), new Batter(), new Batter(), new Batter(), new Batter(), new Batter(), new Batter(), new Batter(), new Batter()],
      seq: -1,
    }
  },

  methods: {
    addBattingStat() {
      this.batters.push(new Batter());
    },
    removeBattingStat(n) {
      if (this.batters.length !== 9) {
        this.batters.splice(n, 1);
      }
    },
  },
  components: {BattingStatTotal, BattingStat},

  computed: {
    remainedPlayerList() {
      return this.$props.players.filter(
          (val) => {
            let len = this.batters.length;

            for(let i = 0 ; i < len ; i++) {
              const now = this.batters[i];

              if(now.player.id === val.id) {
                return false;
              }
            }

            return true;
          }
      );
    },
    totalStats() {
      const total = new Batter();
      const len = this.batters.length;

      for(let i = 0 ; i < len ; i++) {
        const now = this.batters[i];

        total.ab += parseInt(now.ab);
        total.h += parseInt(now.h);
        total.h2 += parseInt(now.h2);
        total.h3 += parseInt(now.h3);
        total.hr += parseInt(now.hr);
        total.bb += parseInt(now.bb);
        total.rbi += parseInt(now.rbi);
        total.r += parseInt(now.r);
        total.sb += parseInt(now.sb);
        total.cs += parseInt(now.cs);
        total.k += parseInt(now.k);
      }

      return total;
    }
  },

  props: [
    'players'
  ],

}

class Batter {
  constructor() {
    this.player = '';
    this.ab = 0;
    this.h = 0;
    this.h2 = 0;
    this.h3 = 0;
    this.hr = 0;
    this.bb = 0;
    this.rbi = 0;
    this.r = 0;
    this.sb = 0;
    this.cs = 0;
    this.k = 0;
  }
}
</script>

<style>
.center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>