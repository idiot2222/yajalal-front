import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const colorMap = new Map();
colorMap.set('Blue', ["#74b9ff", "#0984e3"]);
colorMap.set('Green', ["#55efc4", "#00b894"]);
colorMap.set('Purple', ["#a29bfe", "#6c5ce7"]);
colorMap.set('Gray', ["#dfe6e9", "#b2bec3"]);
colorMap.set('Yellow', ["#ffeaa7", "#fdcb6e"]);
colorMap.set('Orange', ["#fab1a0", "#e17055"]);
colorMap.set('Red', ["#ff7675", "#d63031"]);
colorMap.set('Pink', ["#fd79a8", "#e84393"]);
colorMap.set('Mint', ["#81ecec", "#00cec9"]);
colorMap.set('Black', ["#636e72", "#2d3436"]);

const store = new Vuex.Store({

    state: {
        appVarTabs: [],
        mainColor: "#74b9ff",
        subColor: "#0984e3",
    },
    mutations: {
        setTabs(state, tabs) {
            this.state.appVarTabs = tabs;
        },
        setColor(state, color) {
            let arr = colorMap.get(color);

            this.state.mainColor = arr[0];
            this.state.subColor = arr[1];
        }
    }
})

export default store;