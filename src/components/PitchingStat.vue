<template>
  <v-card>
    <v-simple-table dense>
      <thead>
      <tr>
        <th>{{ formatting(seq) }}</th>
        <th>평균자책점</th>
        <th>이닝</th>
        <th>탈삼진</th>
        <th>사사구</th>
        <th>자책점</th>
        <th>승</th>
        <th>패</th>
        <th>홀드</th>
        <th>세이브</th>
        <th>노디시전</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          <v-select
              dense
              :items="pitcherList"
              item-text="name"
              placeholder="투수"
              v-model="$props.pitcher.player"
              return-object
          >
          </v-select>
        </td>
        <td>
          {{ era }}
        </td>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <td>
              <v-text-field
                  dense
                  type="number"
                  placeholder="이닝"
                  :min="0"
                  v-model="inningInput"
                  @blur="isInputActive = false"
                  @focus="isInputActive = true"
                  v-bind="attrs"
                  v-on="on"
              />
            </td>
          </template>
          <span>잡아낸 아웃 카운트를 입력해주세요.
            <br/>예) 10 아웃 => 3.1 이닝
            <br/>예) 18 아웃 => 6이닝</span>
        </v-tooltip>
        <td>
          <v-text-field
              dense
              type="number"
              placeholder="탈삼진"
              v-model="$props.pitcher.k"
              :min="0"
          />
        </td>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <td>
              <v-text-field
                  dense
                  type="number"
                  placeholder="사사구"
                  v-model="$props.pitcher.bb"
                  :min="0"
                  v-bind="attrs"
                  v-on="on"
              />
            </td>
          </template>
          <span>볼넷 + 데드볼</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <td>
              <v-text-field
                  dense
                  type="number"
                  placeholder="자책점"
                  v-model="$props.pitcher.er"
                  :min="0"
                  v-bind="attrs"
                  v-on="on"
              />
            </td>
          </template>
          <span>본인 책임 주자의 실점</span>
        </v-tooltip>
        <td>
          <v-simple-checkbox
              @click="check('W', false)"
              :value="isChecked('W')"
              color="blue lighten-2"
              :ripple="false"
          />
        </td>
        <td>
          <v-simple-checkbox
              @click="check('L', false)"
              :value="isChecked('L')"
              color="red lighten-2"
              :ripple="false"
          />
        </td>
        <td>
          <v-simple-checkbox
              :disabled="!isReliever(seq)"
              @click="check('H', isStarter(seq)||isCloser(seq))"
              :value="isChecked('H')"
              color="teal lighten-3"
              :ripple="false"
          />
        </td>
        <td>
          <v-simple-checkbox
              :disabled="disable(!isCloser(seq), 'SV')"
              @click="check('SV', !isCloser(seq))"
              :value="isChecked('SV')"
              color="green lighten-2"
              :ripple="false"
          />
        </td>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <td>
              <v-simple-checkbox
                  @click="check('NO', false)"
                  :value="isChecked('NO')"
                  v-on="on"
                  v-bind="attrs"
                  color="orange lighten-3"
                  :ripple="false"
              />
            </td>
          </template>
          <span>해당 사항이 없는 경우입니다.</span>
        </v-tooltip>
      </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  name: "PitchingStat",
  data() {
    return {
      isInputActive: false,
    }
  },
  methods: {
    formatting(n) {
      if (this.isStarter(n)) {
        return '선발 투수';
      } else if (this.isCloser(n)) {
        return '마무리 투수'
      }

      return n + '번째 중계 투수';
    },
    isStarter(n) {
      return n === 0;
    },
    isReliever(n) {
      return !this.isStarter(n) && !this.isCloser(n);
    },
    isCloser(n) {
      return n !== 0 && n === this.$props.endSeq - 1;
    },
    check(val, isDisabled) {
      if (!isDisabled) {
        this.$props.pitcher.decision = val;
      }

      if(val === 'W' || val === 'SV') {
        this.$props.setIsWin(true);
      }
      else if(val === 'L') {
        this.$props.setIsWin(false);
      }

      if(val === 'W' || val === 'L') {
        this.$props.setDecidedSeq(this.$props.seq);
      }
    },
    isChecked(val) {
      const temp = this.$props.pitcher.decision;

      if(this.$props.isWin && temp === 'L') {
        this.$props.pitcher.decision = 'NO';
      }
      else if(!this.$props.isWin && (temp === 'W' || temp === 'SV')) {
        this.$props.pitcher.decision = 'NO';
      }

      if((temp === 'W' || temp === 'L') && this.$props.decidedSeq !== this.$props.seq) {
        this.$props.pitcher.decision = 'NO';
      }

      return this.$props.pitcher.decision === val;
    },
    disable(b, val) {
      if (b && this.$props.pitcher.decision === val) {
        this.$props.pitcher.decision = 'NO';
      }

      return b;
    }
  },

  components: {},

  props: [
    'seq', 'endSeq', 'players', 'pitcher', 'isWin', 'setIsWin', 'decidedSeq', 'setDecidedSeq'
  ],

  computed: {
    era() {
      if(this.pitcher.er === 0) {
        return this.pitcher.er.toFixed(3);
      }

      return (this.pitcher.er * 27 / this.pitcher.ip).toFixed(3);
    },

    inningInput: {
      get() {
        if (this.isInputActive) {
          return this.$props.pitcher.ip;
        } else {
          let I = parseInt(this.$props.pitcher.ip / 3);
          let i = this.$props.pitcher.ip % 3;

          if (i > 0) {
            I += '.' + i;
          }

          return I;
        }
      },
      set(newValue) {
        if (newValue >= 0) {
          this.$props.pitcher.ip = newValue;
        }
      }
    },

    pitcherList() {
      const temp = this.$props.players.slice();

      if (this.$props.pitcher.player !== '') {
        temp.unshift(this.$props.pitcher.player);
      }

      return temp;
    },
  }
}
</script>

<style>
</style>