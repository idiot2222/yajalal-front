<template>
  <div class="bg">
    <div
        class="config-main"
    >
      <h1 class="mb-10 headline">Config</h1>
      <label>
        <v-icon>mdi-palette</v-icon>
        색상
      </label>
      <v-select
          class="mt-2"
          :items="colors"
          label="Color Theme"
          dense
          outlined
          v-model="selectedColor"
      >
      </v-select>

      <v-btn
          color="primary"
          absolute
          right
          @click="saveBtnHandler"
      >
        저장
      </v-btn>
    </div>

    <AlertBox
        message="저장 완료"
        :value="alertState"
    />
  </div>
</template>

<script>

import AlertBox from "@/components/AlertBox";

export default {
  name: "ConfigPage",
  data() {
    return {
      tabs: [],
      selectedColor: "",
      colors: [
        "파랑색", "초록색", "보라색", "주황색", "빨간색", "분홍색", "청록색", "검정색"
      ],
      alertState: false,

    };
  },

  methods: {
    setColor() {
      this.$store.commit('setColor', this.selectedColor);
    },
    setTabs() {
      this.$store.commit("setTabs", this.tabs);
    },
    saveBtnHandler() {
      if (this.selectedColor !== '') {
        this.setColor();
      }

      this.alertState = true;
      setTimeout(() => this.alertState = false, 1000);
    }
  },

  components: {AlertBox},

  mounted() {
    this.setTabs();
  }
}
</script>

<style>
.bg {
  position: relative;
  width: 100%;
  height: 100%
}

.config-main {
  width: 400px;
  min-width: 250px;
  height: 250px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>