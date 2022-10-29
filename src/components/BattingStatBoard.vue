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
            ref="stats"
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
            :stats="totalBatting"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BattingStat from "@/components/BattingStat";
import BattingStatTotal from "@/components/BattingStatTotal";
import {Batter} from "@/class";

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
    validate() {
      const stats = this.$refs.stats;
      const len = stats.length;
      let validate = true;

      for(let i = 0 ; i < len ; i++) {
        const temp = stats[i].validate();

        if(!temp) {
          validate = false;

          break;
        }
      }

      return validate;
    }
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

    totalBatting() {
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
    },
  },

  props: [
    'players'
  ],

}

</script>

<style>
.center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>