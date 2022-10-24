<template>
  <div>
    <v-divider class="mb-2"></v-divider>
    <v-row
        v-for="(pitcher, n) in pitchers"
        :key="n"
    >
      <v-col cols="11">
        <PitchingStat
            :players="remainedPlayerList"
            :seq="n"
            :pitcher="pitcher"
            :endSeq="pitchers.length"
            :isWin="isWin"
            :setIsWin="setIsWin"
            :decidedSeq="decidedSeq"
            :setDecidedSeq="setDecidedSeq"
        />
      </v-col>
      <!--      버튼-->
      <v-col cols="1">
        <v-btn
            v-if="n === 0"
            text
            icon
            color="green lighten-2"
            @click="addPitchingStat"
            class="center"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn
            v-if="n >= 1"
            text
            icon
            color="red lighten-2"
            @click="removePitchingStat(n)"
            class="center"
        >
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="11">
        <PitchingStatTotal
          :stats="totalPitching"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PitchingStat from "@/components/PitchingStat";
import PitchingStatTotal from "@/components/PitchingStatTotal";
export default {
  name: "PitchingStatBoard",
  data() {
    return {
      pitchers: [
        new Pitcher(),
      ],
      isWin: false,
      decidedSeq: -1,
    }
  },
  methods: {
    addPitchingStat() {
      this.pitchers.push(new Pitcher());
    },
    removePitchingStat(n) {
      if (this.pitchers.length !== 1) {
        this.pitchers.splice(n, 1);
      }
    },
    setIsWin(b) {
      this.isWin = b;
    },
    setDecidedSeq(n) {
      this.decidedSeq = n;
    }
  },
  components: {PitchingStatTotal, PitchingStat},

  props: [
    'players'
  ],

  computed: {
    remainedPlayerList() {
      return this.$props.players.filter(
          (val) => {
            let len = this.pitchers.length;

            for(let i = 0 ; i < len ; i++) {
              const now = this.pitchers[i];

              if(now.player.id === val.id) {
                return false;
              }
            }

            return true;
          }
      );
    },
    totalPitching() {
      const total = new Pitcher();
      const len = this.pitchers.length;

      for(let i = 0 ; i < len ; i++) {
        const now = this.pitchers[i];

        total.ip += parseInt(now.ip);
        total.k += parseInt(now.k);
        total.bb += parseInt(now.bb);
        total.er += parseInt(now.er);
      }

      return total;
    }
  }
}

class Pitcher {
  constructor() {
    this.player = '';
    this.ip = 0;
    this.k = 0;
    this.bb = 0;
    this.er = 0;
    this.decision = 'NO';
  }
}
</script>

<style>
</style>