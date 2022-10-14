import Vue from 'vue';
import Vuex from 'vuex';
import apiUtils from "@/apiUtils";
import {createVuexPersistedState} from "vue-persistedstate/src/main";

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [
        createVuexPersistedState({
            key: 'vuex',
            storage: window.localStorage,
            whiteList: [
                'mainColor',
                'subColor',
                'currentUserId',
                'currentUserNickname',
                'currentUsername',
                'currentPlayerId'
            ],
            blackList: []
        }),
    ],

    state: {
        mainColor: "#74b9ff",
        subColor: "#0984e3",
        currentUserId: -1,
        currentUserNickname: "",
        currentUsername: "",
        currentPlayerId: -1,
        positions: ['투수', '포수', '1루수', '2루수', '3루수', '유격수', '좌익수', '중견수', '우익수'],
        positionMap: getPositionMap(),
        battingStatMap: getBattingStatMap(),
        pitchingStatMap: getPitchingStatMap(),
        tabs: [],
    },
    mutations: {
        setColor(state, color) {
            let arr = colorMap.get(color);

            this.state.mainColor = arr[0];
            this.state.subColor = arr[1];
        },
        setTabs(state, tabs) {
            this.state.tabs = tabs;
        },
        loginSuccessHandler(state, key) {
            this.state.currentUserId = key.currentUser.id;
            this.state.currentUsername = key.currentUser.username;
            this.state.currentUserNickname = key.currentUser.nickname;
            apiUtils.getPlayerId(key.currentUser.id)
                .then(res => {
                    this.state.currentPlayerId = res.data
                });
        },
        logout() {
            apiUtils.logout();

            localStorage.removeItem('auth');
            this.state.currentUserId = -1;
            this.state.currentUsername = '';
            this.state.currentUserNickname = '';
            this.state.currentPlayerId = -1;
        },
    }
});


function getPositionMap() {
    const positionMap = new Map();

    positionMap.set('투수', 'P');
    positionMap.set('포수', 'C');
    positionMap.set('1루수', 'FB');
    positionMap.set('2루수', 'SB');
    positionMap.set('3루수', 'TB');
    positionMap.set('유격수', 'SS');
    positionMap.set('좌익수', 'LF');
    positionMap.set('중견수', 'CF');
    positionMap.set('우익수', 'RF');

    positionMap.set('P', '투수');
    positionMap.set('C', '포수');
    positionMap.set('FB', '1루수');
    positionMap.set('SB', '2루수');
    positionMap.set('TB', '3루수');
    positionMap.set('SS', '유격수');
    positionMap.set('LF', '좌익수');
    positionMap.set('CF', '중견수');
    positionMap.set('RF', '우익수');

    return positionMap;
}

function getBattingStatMap() {
    const battingStatMap = new Map();
    battingStatMap.set('G', '경기 수');
    battingStatMap.set('PA', '타석 수');
    battingStatMap.set('AB', '타수');
    battingStatMap.set('H', '안타');
    battingStatMap.set('H2', '2루타');
    battingStatMap.set('H3', '3루타');
    battingStatMap.set('HR', '홈런');
    battingStatMap.set('RBI', '타점');
    battingStatMap.set('R', '득점');
    battingStatMap.set('SO', '삼진');
    battingStatMap.set('BB', '사사구');
    battingStatMap.set('SB', '도루');
    battingStatMap.set('CS', '도루 실패');

    return battingStatMap;
}

function getPitchingStatMap() {
    const pitchingStatMap = new Map();
    pitchingStatMap.set('G', '경기 수');
    pitchingStatMap.set('GS', '선발');
    pitchingStatMap.set('W', '승');
    pitchingStatMap.set('L', '패');
    pitchingStatMap.set('H', '홀드');
    pitchingStatMap.set('SV', '세이브');
    pitchingStatMap.set('IP', '이닝');
    pitchingStatMap.set('R', '실점');
    pitchingStatMap.set('ER', '자책점');
    pitchingStatMap.set('K', '탈삼진');
    pitchingStatMap.set('BB', '볼넷');

    return pitchingStatMap;
}

const colorMap = new Map();
colorMap.set('파랑색', ["#74b9ff", "#0984e3"]);
colorMap.set('초록색', ["#55efc4", "#00b894"]);
colorMap.set('보라색', ["#a29bfe", "#6c5ce7"]);
colorMap.set('주황색', ["#fab1a0", "#e17055"]);
colorMap.set('빨간색', ["#ff7675", "#d63031"]);
colorMap.set('분홍색', ["#fd79a8", "#e84393"]);
colorMap.set('청록색', ["#81ecec", "#00cec9"]);
colorMap.set('검정색', ["#636e72", "#2d3436"]);

export default store;