<template>
  <v-form
      class="player-create-main"
      ref="form"
      lazy-validation
  >
    <h1 class="mb-5 headline">선수 생성</h1>
    <v-text-field
        label="이름"
        v-model="name"
        :rules="nameRules"
        counter="10"
    >
    </v-text-field>
    <v-row>
      <v-col>
        <v-text-field
            type="number"
            label="신장"
            v-model="height"
            :min="50"
            :max="230"
            :rules="heightRules"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
            type="number"
            label="체중"
            v-model="weight"
            :min="30"
            :max="200"
            :rules="weightRules"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-alert
        border="left"
        color="#576574"
        dark
        dense
        type="info"
        :value="true"
    >
      첫 번째로 선택된 포지션이 메인 포지션이 됩니다.
    </v-alert>

    <v-select
        v-model="position"
        :items="positions"
        label="포지션 선택"
        multiple
    ></v-select>

    <v-row>
      <v-col
          cols="3"
      >
        <v-text-field
            label="메인 포지션"
            :value="mainPosition"
            readonly
            :rules="positionRules"
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
            label="서브 포지션"
            :value="subPositions"
            readonly
        >
        </v-text-field>
      </v-col>
    </v-row>


    <v-textarea
        name="input-7-4"
        label="자기소개"
        counter="100"
        v-model="description"
    ></v-textarea>

    <v-btn
        :disabled="!valid"
        color="primary"
        class="mr-4"
        @click="submit"
    >
      생성
    </v-btn>
    <v-btn
        color="error"
        class="mr-4"
        @click="reset"
    >
      리셋
    </v-btn>

    <DialogBox
        title="선수 생성"
        text="선수 정보가 생성되었습니다."
        :isOpened="successDialog"
        redirectUrl="/player-info"
    />

  </v-form>

</template>

<script>
import apiUtils from "@/apiUtils";
import {mapState} from "vuex";
import DialogBox from "@/components/DialogBox";

export default {
  name: "PlayerCreatePage",

  data() {
    return {
      tabs: [],
      valid: true,
      name: "",
      nameRules: [
        v => !!v || '이름을 기입해주세요.',
        v => (v && v.length <= 10) || '이름은 최대 10자입니다.'
      ],
      height: '',
      heightRules: [
        v => !!v || '신장을 기입해주세요.',
        v => (v && v >= 50 && v <= 230) || '신장의 범위는 50이상 230이하입니다.'
      ],
      weight: '',
      weightRules: [
        v => !!v || '체중을 기입해주세요.',
        v => (v && v >= 30 && v <= 200) || '체중의 범위는 30이상 200이하입니다.'
      ],
      position: "",
      positionRules: [
        v => !!v || '최소 1개의 포지션을 선택해주세요.'
      ],
      description: "",
      descriptionRules: [
        v => (v.length <= 100) || '자기소개는 최대 100자까지 입니다.'
      ],

      successDialog: false,
    }
  },

  methods: {
    setTabs() {
      this.$store.commit("setTabs", this.tabs);
    },
    reset() {
      this.$refs.form.reset()
    },
    submit() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.playerCreate();
    },
    async playerCreate() {
      const createDto = {
        name: this.name,
        height: this.height,
        weight: this.weight,
        description: this.description,
        mainPosition: this.convertPosition(this.mainPosition),
        subPositions: this.convertPositionAll(this.subPositions)
      }

      const result = await apiUtils.createPlayer(this.currentUserId, createDto);

      if (result.status === 200) {
        this.successDialog = true;
      }
    },
    convertPosition(position) {
      return this.positionMap.get(position);
    },
    convertPositionAll(positions) {
      return positions.map(x => this.convertPosition(x));
    },
  },

  components: {DialogBox},

  computed: {
    mainPosition() {
      return this.position[0] || "";
    },
    subPositions() {
      return this.position.slice(1) || "";
    },
    ...mapState({
      currentUserId: state => state.currentUserId,
      positions: state => state.positions,
      positionMap: state => state.positionMap,
    })
  },

  mounted() {
    this.setTabs();
  }
}
</script>

<style>
.player-create-main {
  width: 400px;
  height: 600px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>