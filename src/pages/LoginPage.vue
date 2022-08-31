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
        @click="username = ''"
        required
    ></v-text-field>

    <v-text-field
        type="password"
        v-model="password"
        :rules="passwordRules"
        label="비밀번호"
        @click="password = ''"
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
        @click="login"
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
import apiUtils from "@/apiUtils";

export default {
  name: "LoginPage",
  data() {
    return {
      valid: true,
      username: '',
      usernameRules: [
        v => !!v || '아이디를 입력해 주세요.',
        v => (v && v.length <= 20) || '아이디는 20자 이하입니다.',
        () => !this.loginFail || "아이디 또는 비밀번호를 다시 확인해주세요."
      ],
      password: '',
      passwordRules: [
        v => !!v || '비밀번호를 입력해 주세요.',
        v => (v && v.length >= 10) || '비밀번호는 10자 이상입니다.',
        () => !this.loginFail || "아이디 또는 비밀번호를 다시 확인해주세요."
      ],
      loginFail: false,
      checkbox: false,
    }
  },
  methods: {
    login() {
      if (!this.$refs.form.validate()) {
        return;
      }

      const dto = {
        username: this.username,
        password: this.password
      }

      this.loginHandler(dto);
    },
    async loginHandler(dto) {
      const result = await apiUtils.login(dto);

      if (result.status === 200) {
        this.$store.commit('loginSuccessHandler', {
          auth: result.headers.authorization,
          currentUser: result.data,
        });

        await this.$router.push('/');
      } else {
        await this.loginFailHandler();
      }
    },
    async loginFailHandler() {
      this.loginFail = true;

      await this.$refs.form.validate();

      this.loginFail = false;
    },
    reset() {
      this.$refs.form.reset();
    },
  },
  components: {},
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