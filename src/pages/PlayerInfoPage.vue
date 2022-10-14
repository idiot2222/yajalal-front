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
      tabs: [],
      playerInfo: {},
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
    goToModifyPage() {
      this.$router.push("/player-modify")
    }
  },

  computed: {
    ...mapState({
      currentUserId: state => state.currentUserId,
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