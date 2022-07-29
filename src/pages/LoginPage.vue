<template>
  <v-form
      class="login-main"
      ref="form"
      v-model="valid"
      lazy-validation
  >
    <h1 class="mb-5 headline">Log in</h1>
    <v-text-field
        v-model="username"
        :counter="20"
        :rules="usernameRules"
        label="사용자 아이디"
        required
    ></v-text-field>

    <v-text-field
        type="password"
        v-model="password"
        :rules="passwordRules"
        label="비밀번호"
        required
    ></v-text-field>


    <v-checkbox
        v-model="checkbox"
        label="로그인 유지"
        required
    ></v-checkbox>

    <v-btn
        :disabled="!valid"
        color="primary"
        class="mr-4"
        @click="validate"
    >
      로그인
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
  name: "LoginPage",
  data() {
    return {
      tabs: [],
      valid: true,
      username: '',
      usernameRules: [
        v => !!v || '아이디를 입력해 주세요.',
        v => (v && v.length <= 20) || '아이디는 20자 이하입니다.',
      ],
      password: '',
      passwordRules: [
        v => !!v || '비밀번호를 입력해 주세요.',
        v => (v && v.length >= 10) || '비밀번호는 10자 이상입니다.',
      ],
      checkbox: false,
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
  },
  components: {},
  mounted() {
    this.$store.commit("setTabs", this.tabs);
  }
}
</script>

<style>
.login-main {
  width: 400px;
  height: 400px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>