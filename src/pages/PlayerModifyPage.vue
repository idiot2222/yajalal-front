<template>
  <v-form
      class="player-create-main"
      ref="form"
      lazy-validation
  >
    <h1 class="mb-5 headline">선수 정보 수정</h1>
    <v-text-field
        label="이름"
        v-model="playerInfo.name"
        :rules="nameRules"
        counter="10"
        outlined
    >
    </v-text-field>
    <v-row>
      <v-col>
        <v-text-field
            label="신장"
            v-model="playerInfo.height"
            outlined
            :min="50"
            :max="230"
            :rules="heightRules"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
            label="체중"
            v-model="playerInfo.weight"
            outlined
            :min="30"
            :max="200"
            :rules="weightRules"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-select
        v-model="position"
        :items="positions"
        label="포지션 선택"
        outlined
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
        outlined
        counter="100"
        :value="playerInfo.description"
        v-model="playerInfo.description"
    ></v-textarea>

    <v-btn
        :disabled="!valid"
        color="primary"
        class="mr-4"
        @click="modify"
    >
      확인
    </v-btn>

  </v-form>

</template>

<script>
import apiUtils from "@/apiUtils";
import {mapState} from "vuex";

export default {
  name: "PlayerModifyPage",

  data() {
    return {
      tabs: [],
      valid: true,
      playerInfo: {},
      position: "",

      nameRules: [
        v => !!v || '이름을 기입해주세요.',
        v => (v && v.length <= 10) || '이름은 최대 10자입니다.'
      ],
      heightRules: [
        v => !!v || '신장을 기입해주세요.',
        v => (v && v >= 50 && v <= 230) || '신장의 범위는 50이상 230이하입니다.'
      ],
      weightRules: [
        v => !!v || '체중을 기입해주세요.',
        v => (v && v >= 30 && v <= 200) || '체중의 범위는 30이상 200이하입니다.'
      ],
      positionRules: [
        v => !!v || '최소 1개의 포지션을 선택해주세요.'
      ],
      descriptionRules: [
        v => (v.length <= 100) || '자기소개는 최대 100자까지 입니다.'
      ],
    }
  },

  methods: {
    setTabs() {
      this.$store.commit("setTabs", this.tabs);
    },
    convertPosition(position) {
      return this.positionMap.get(position);
    },
    convertPositionAll(positions) {
      return positions.map(x => this.convertPosition(x));
    },
    setPosition() {
      this.position = new Array(this.playerInfo.mainPosition).concat(this.playerInfo.subPositions);
    },

    async modify() {
      this.playerInfo.mainPosition = this.convertPosition(this.mainPosition);
      this.playerInfo.subPositions = this.convertPositionAll(this.subPositions);

      const result = await apiUtils.updatePlayerInfo(this.currentUserId, this.playerInfo);

      if(result.status === 200) {
        await this.$router.push("/player-info")
      }
    },
  },

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

  async mounted() {
    this.setTabs();

    const result = await apiUtils.getPlayerAllInfo(this.currentUserId);

    if(result.status === 200) {
      this.playerInfo = result.data.content;
      this.playerInfo.mainPosition = this.convertPosition(this.playerInfo.mainPosition);
      this.playerInfo.subPositions = this.convertPositionAll(this.playerInfo.subPositions);
    }
    else if(result.status === 400) {
      await this.$router.push("/player-create");
    }

    this.setPosition();
  },

  components: {
  },
}
</script>

<style>
</style>