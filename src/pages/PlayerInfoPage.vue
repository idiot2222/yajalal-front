<template>
  <v-form
      class="player-info-main"
      ref="form"
      lazy-validation
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

    <v-btn
        color="primary"
        class="mr-4"
        @click="goToModifyPage"
    >
      수정
    </v-btn>

  </v-form>

</template>

<script>
import apiUtils from "@/apiUtils";
import {mapState} from "vuex";

export default {
  name: "PlayerInfoPage",

  data() {
    return {
      playerInfo: {},
      positionMap: new Map(),
    }
  },

  methods: {
    convertPosition(position) {
      return this.positionMap.get(position);
    },
    convertPositionAll(positions) {
      return positions.map(x => this.convertPosition(x));
    },
    goToModifyPage() {
      this.$router.push("/player-modify")
    }
  },

  computed: {
    ...mapState({
      currentUserId: state => state.currentUserId,
    })
  },

  created() {
    this.positionMap.set('P', '투수' );
    this.positionMap.set('C', '포수');
    this.positionMap.set('FB', '1루수');
    this.positionMap.set('SB', '2루수');
    this.positionMap.set('TB', '3루수');
    this.positionMap.set('SS', '유격수');
    this.positionMap.set('LF', '좌익수');
    this.positionMap.set('CF', '중견수');
    this.positionMap.set('RF', '우익수');
  },

  async mounted() {
    const result = await apiUtils.getPlayerAllInfo(this.currentUserId);

    if(result.status === 200) {
      this.playerInfo = result.data.content;
      this.playerInfo.mainPosition = this.convertPosition(this.playerInfo.mainPosition);
      this.playerInfo.subPositions = this.convertPositionAll(this.playerInfo.subPositions);
    }
    else if(result.status === 400) {
      await this.$router.push("/player-create");
    }
  },

  components: {
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