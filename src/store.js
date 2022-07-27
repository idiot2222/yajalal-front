import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        appVarTabs: 1,
    },
    mutations: {
        setTabs(state, tabs) {
            this.state.appVarTabs = tabs;
        },
    }
})

export default store;