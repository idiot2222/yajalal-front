<template>
  <v-card>
    <v-simple-table
        dense
    >
      <thead>
      <tr>
        <th>{{ formatting(seq) }}</th>
        <th>타수</th>
        <th>단타</th>
        <th>2루타</th>
        <th>3루타</th>
        <th>홈런</th>
        <th>사사구</th>
        <th>타점</th>
        <th>득점</th>
        <th>도루</th>
        <th>도실</th>
        <th>삼진</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          <v-select
              dense
              placeholder="타자"
              :items="batterList"
              item-text="name"
              v-model="$props.batter.player"
              return-object
          />
        </td>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <td>
              <v-text-field
                  dense
                  type="number"
                  placeholder="타수"
                  :min="0"
                  v-model="$props.batter.ab"
                  :error="abRules"
                  v-bind="attrs"
                  v-on="on"
              />
            </td>
          </template>
          <span>사사구를 제외한 타격을 한 횟수<br/>
            희생 번트, 희생 플라이도 제외</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <td>
              <v-text-field
                  dense
                  type="number"
                  placeholder="단타"
                  v-model="$props.batter.h"
                  :min="0"
                  v-bind="attrs"
                  v-on="on"
              />
            </td>
          </template>
          <span>1루까지 진출한 안타</span>
        </v-tooltip>
        <td>
          <v-text-field
              dense
              type="number"
              placeholder="2루타"
              v-model="$props.batter.h2"
              :min="0"
          />
        </td>
        <td>
          <v-text-field
              dense
              type="number"
              placeholder="3루타"
              v-model="$props.batter.h3"
              :min="0"
          />
        </td>
        <td>
          <v-text-field
              dense
              type="number"
              placeholder="홈런"
              v-model="$props.batter.hr"
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
                  v-model="$props.batter.bb"
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
                  placeholder="타점"
                  v-model="$props.batter.rbi"
                  :min="0"
                  :rules="rbiRules"
                  v-bind="attrs"
                  v-on="on"
              />
            </td>
          </template>
          <span>타자로서 주자를 불러들인 점수</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <td>
              <v-text-field
                  dense
                  type="number"
                  placeholder="득점"
                  v-model="$props.batter.r"
                  :min="0"
                  :rules="rRules"
                  v-bind="attrs"
                  v-on="on"
              />
            </td>
          </template>
          <span>주자로서 홈에 들어온 점수<br/>
            홈런도 포함</span>
        </v-tooltip>
        <td>
          <v-text-field
              dense
              type="number"
              placeholder="도루"
              v-model="$props.batter.sb"
              :min="0"
          />
        </td>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <td>
              <v-text-field
                  dense
                  type="number"
                  placeholder="도실"
                  v-model="$props.batter.cs"
                  :min="0"
                  v-bind="attrs"
                  v-on="on"
              />
            </td>
          </template>
          <span>도루 실패</span>
        </v-tooltip>
        <td>
          <v-text-field
              dense
              type="number"
              placeholder="삼진"
              v-model="$props.batter.k"
              :min="0"
          />
        </td>
      </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  name: "BattingStat",
  data() {
    return {
      rbiRules: [
        v => v >= this.batter.hr || '타점은 홈런보다 적을 수 없습니다.'
      ],
      rRules: [
        v => v >= this.batter.hr || '득점은 홈런보다 적을 수 없습니다.'
      ],
    }
  },
  methods: {
    formatting(n) {
      if (n < 9) {
        return n + 1 + '번 타자';
      }

      return n - 8 + '번째 대타';
    }
  },

  components: {},

  computed: {
    abRules() {
      return this.$props.batter.ab < this.minAb;
    },
    minAb() {
      return parseInt(this.batter.h) + parseInt(this.batter.h2) + parseInt(this.batter.h3) + parseInt(this.batter.hr) + parseInt(this.batter.k);
    },
    batterList() {
      const temp = this.$props.players.slice();

      if (this.$props.batter.player !== '') {
        temp.unshift(this.$props.batter.player);
      }

      return temp;
    }
  },

  props: [
    'seq', 'players', 'batter'
  ],
}
</script>

<style>
</style>