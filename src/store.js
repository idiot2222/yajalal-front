import Vue from 'vue';
import Vuex from 'vuex';
import persistedState from "vuex-persistedstate";
import apiUtils from "@/apiUtils";

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [
        persistedState()
    ],

    state: {
        appVarTabs: [],
        mainColor: "#74b9ff",
        subColor: "#0984e3",
        currentUser: "",
    },
    mutations: {
        setTabs(state, tabs) {
            this.state.appVarTabs = tabs;
        },
        setColor(state, color) {
            let arr = colorMap.get(color);

            this.state.mainColor = arr[0];
            this.state.subColor = arr[1];
        },
        async loginSuccessHandler(state, key) {
            await localStorage.setItem('auth', key.auth);
            this.state.currentUser = key.username;
        },
        logout() {
            apiUtils.logout();

            localStorage.removeItem('auth');
            this.state.currentUser = "";
        },
    }
});

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