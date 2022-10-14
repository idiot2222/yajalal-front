<template>
  <v-form
      class="join-main"
      ref="form"
      lazy-validation
  >
    <h1 class="mb-5 headline">내 정보</h1>
    <v-text-field
        label="닉네임"
        v-model="userInfo.nickname"
        outlined
    >
    </v-text-field>
    <v-row>
      <v-col>
        <v-text-field
            label="사용자 아이디"
            :value="userInfo.username"
            readonly
        ></v-text-field>
      </v-col>
      <v-col
          cols="4"
      >
        <v-text-field
            label="성별"
            :value="userInfo.gender === 'MALE' ? '남성' : '여성'"
            readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <v-text-field
        type="password"
        label="비밀번호"
        v-model="password"
        :rules="passwordRules"
        outlined
    ></v-text-field>
    <v-text-field
        label="생년월일"
        :value="userInfo.birthDate"
        readonly
    ></v-text-field>
    <v-text-field
        label="이메일"
        :value="userInfo.email"
        readonly
    ></v-text-field>

    <v-btn
        color="primary"
        class="mr-4"
        @click="updateUserInfo"
    >
      수정하기
    </v-btn>

    <DialogBox
        title="로그인 정보가 필요합니다."
        text="로그인 해주세요."
        :isOpened="redirectDialog"
        redirectUrl="/login"
    />

    <DialogBox
        title="수정 완료"
        text="정보가 수정 되었습니다."
        :isOpened="successDialog"
        redirectUrl="/"
    />

  </v-form>
</template>

<script>
import apiUtils from "@/apiUtils";
import {mapState} from "vuex";
import DialogBox from "@/components/DialogBox";

export default {
  name: "UserInfoPage",

  data() {
    return {
      tabs: [],
      nickname: "",
      userInfo: {},
      password: "",
      passwordRules: [
        v => (!v || v.length >= 10) || '비밀번호는 10자 이상입니다.'
      ],
      redirectDialog: false,
      successDialog: false,
    }
  },

  methods: {
    setTabs() {
      this.$store.commit("setTabs", this.tabs);
    },
    async getUserInfo() {
      return await apiUtils.getUserInfo(this.currentUserId) || {};
    },
    async updateUserInfo() {
      const result = await apiUtils.updateUserInfo(
          this.currentUserId,
          {
            nickname: this.userInfo.nickname === this.nickname ? "" : this.userInfo.nickname,
            password: this.password
          });

      if(result.status === 200) {
        this.successDialog = true;
      }
    },
    isLoggedIn() {
      if (this.currentUserId === -1) {
        this.redirectDialog = true;
      }
    }
  },

  async mounted() {
    this.setTabs();

    this.userInfo = await this.getUserInfo();
    this.nickname = this.userInfo.nickname;

    this.isLoggedIn();
  },

  components: {DialogBox},

  computed: {
    ...mapState({
      currentUserId: state => state.currentUserId,
    })
  }
}
</script>

<style>
</style>