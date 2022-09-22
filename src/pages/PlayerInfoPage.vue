<template>
  <v-form
      class="player-info-main"
      ref="form"
      lazy-validation
      v-if="playerInfo !== null"
  >
    <h1 class="mb-5 headline">선수 정보</h1>
    <v-text-field
        label="이름"
        :value="playerInfo.name"
        readonly
    >
    </v-text-field>
    <v-row>
      <v-col>
        <v-text-field
            label="신장"
            :value="playerInfo.height"
            readonly
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
            label="체중"
            :value="playerInfo.weight"
            readonly
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col
          cols="3"
      >
        <v-text-field
            label="메인 포지션"
            :value="playerInfo.mainPosition"
            readonly
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
            label="서브 포지션"
            :value="playerInfo.subPositions"
            readonly
        >
        </v-text-field>
      </v-col>
    </v-row>


    <v-textarea
        name="input-7-4"
        label="자기소개"
        readonly
        :value="playerInfo.description"
    ></v-textarea>


    <DialogBox
        title="선수 생성"
        text="선수 정보가 생성되었습니다."
        :isOpened="successDialog"
        redirectUrl="/player-info"
        reload="true"
    />

  </v-form>

  <v-form
      class="player-info-main"
      ref="form"
      lazy-validation
      v-else
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
        reload="true"
    />

  </v-form>
</template>

<script>
import apiUtils from "@/apiUtils";
import {mapState} from "vuex";
import DialogBox from "@/components/DialogBox";

export default {
  name: "PlayerInfoPage",

  data() {
    return {
      valid: true,
      playerInfo: null,
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
      positions: [
        '투수', '포수', '1루수', '2루수', '3루수', '유격수', '좌익수', '중견수', '우익수'
      ],
      positionMap: new Map(),
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

      if(result.status === 200) {
        this.successDialog=true;
      }
    },
    convertPosition(position) {
      return this.positionMap.get(position);
    },
    convertPositionAll(positions) {
      return positions.map(x => this.convertPosition(x));
    }
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
    })
  },

  created() {
    this.positionMap.set('투수', 'P');
    this.positionMap.set('P', '투수' );
    this.positionMap.set('포수', 'C');
    this.positionMap.set('C', '포수');
    this.positionMap.set('1루수', 'FB');
    this.positionMap.set('FB', '1루수');
    this.positionMap.set('2루수', 'SB');
    this.positionMap.set('SB', '2루수');
    this.positionMap.set('3루수', 'TB');
    this.positionMap.set('TB', '3루수');
    this.positionMap.set('유격수', 'SS');
    this.positionMap.set('SS', '유격수');
    this.positionMap.set('좌익수', 'LF');
    this.positionMap.set('LF', '좌익수');
    this.positionMap.set('중견수', 'CF');
    this.positionMap.set('CF', '중견수');
    this.positionMap.set('우익수', 'RF');
    this.positionMap.set('RF', '우익수');
  },

  async mounted() {
    const result = await apiUtils.getPlayerAllInfo(this.currentUserId);

    if(result.status === 200) {
      this.playerInfo = result.data.content;
      this.playerInfo.mainPosition = this.convertPosition(this.playerInfo.mainPosition);
      this.playerInfo.subPositions = this.convertPositionAll(this.playerInfo.subPositions);
    }
  },

  components: {
    DialogBox
  },
}
</script>

<style>
.player-info-main {
  width: 400px;
  height: 500px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>