<template>
  <v-form ref="form">
    <v-divider class="my-2"></v-divider>

    <v-card class="mx-12">
      <v-simple-table>
        <thead>
        <tr>
          <th>상대 팀</th>
          <th>경기 날짜</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <v-select
                :items="teamList"
                :rules="selectRules"
                placeholder="상대 팀"
                item-text="name"
                item-value="id"
                v-model="selectedTeam"
            >
              <template v-slot:prepend>
                <v-icon>mdi-baseball-diamond-outline</v-icon>
              </template>
            </v-select>
          </td>
          <td>
            <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                persistent
                width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="date"
                    label="경기 날짜"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="dateRules"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="date"
                  scrollable
                  locale="ko"
                  :min="minDate"
                  :max="maxDate"
              >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(date)"
                >
                  확인
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="modal = false"
                >
                  취소
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </td>
        </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </v-form>
</template>

<script>
import apiUtils from "@/apiUtils";
import {mapState} from "vuex";

export default {
  name: "MatchInfoBoard",
  data() {
    return {
      date: '',
      dateRules: [
        v => !!v || '경기 날짜를 입력해 주세요.'
      ],
      minDate: (new Date(new Date().setFullYear(1900, 0, 1)).toISOString()),
      maxDate: new Date(Date.now()).toISOString(),
      modal: false,
      teams: [],
      selectedTeam: '',
      selectRules: [
          v => !!v || '상대팀을 선택해 주세요.'
      ]
    }
  },

  methods: {
    validate() {
      return this.$refs.form.validate();
    }
  },

  mounted() {
    apiUtils
        .getLeagueTeamListByTeamId(this.currentTeamId)
        .then(res => {
          this.teams = res.data.content;
        });
  },

  computed: {
    ...mapState({
      currentTeamId: state => state.currentTeamId,
    }),
    teamList() {
      const teamList = [];

      this.teams.forEach(value => {
        if (this.currentTeamId !== value.id) {
          teamList.push(value);
        }
      })

      return teamList;
    }
  }
}
</script>

<style>
</style>