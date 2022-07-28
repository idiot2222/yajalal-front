<template>
  <v-form
      class="join-main"
      ref="form"
      v-model="valid"
      lazy-validation
  >
    <h1 class="mb-5 headline">Join</h1>
    <v-text-field
        v-model="username"
        :counter="10"
        :rules="usernameRules"
        label="사용자 아이디"
        required
    ></v-text-field>
    <v-text-field
        v-model="password"
        :rules="passwordRules"
        type="password"
        label="비밀번호"
        required
    ></v-text-field>

    <!--  생년월일 달력-->
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
            label="생년월일"
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

    <v-text-field
        v-model="email"
        :rules="emailRules"
        label="이메일"
        required
    ></v-text-field>

    <v-radio-group
        label="성별"
        v-model="gender"
        :rules="genderRules"
    >
      <v-row>
        <v-col>
          <v-radio
              label="남성"
              :value="'MALE'"
          ></v-radio>
        </v-col>
        <v-col>
          <v-radio
              label="여성"
              :value="'FEMALE'"
          ></v-radio>
        </v-col>
      </v-row>

    </v-radio-group>


    <v-btn
        :disabled="!valid"
        color="primary"
        class="mr-4"
        @click="validate"
    >
      회원가입
    </v-btn>

    <v-btn
        color="error"
        class="mr-4"
        @click="reset"
    >
      리셋
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "JoinPage",
  data() {
    return {
      tabs: [],
      valid: true,
      username: '',
      usernameRules: [
        v => !!v || '아이디를 입력해 주세요.',
        v => (v && v.length <= 10) || '아이디는 10자 이하입니다.',
      ],
      password: '',
      passwordRules: [
        v => !!v || '비밀번호를 입력해 주세요.',
        v => (v && v.length >= 10) || '비밀번호는 10자 이상입니다.',
      ],
      email: '',
      emailRules: [
        v => !!v || '이메일을 기입해 주세요.',
        v => /.+@.+\..+/.test(v) || '이메일 양식이 틀렸습니다.',
      ],
      date: '',
      dateRules: [
          v => !!v || '생년월일을 기입해 주세요.'
      ],
      minDate: (new Date(new Date().setFullYear(1900, 0, 1)).toISOString()),
      maxDate: new Date(Date.now()).toISOString(),
      gender: "",
      genderRules: [
        v => !!v || '성별을 체크해 주세요.'
      ],
      menu: false,
      modal: false,
      menu2: false,
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
      console.log(this.date);
      console.log(this.gender);
    },
    reset() {
      this.$refs.form.reset()
    },
  },
  components: {},
  mounted() {
    this.$store.commit("setTabs", this.tabs);
  }
}
</script>

<style>
.join-main {
  width: 400px;
  height: 500px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>