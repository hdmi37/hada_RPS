import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        score: [],
        resultMessage: ''
    },
    mutations: {
        setScore: state => state.score.score.push(state.resultMessage),
        resetScore: state => state.score.splice(0)
    },
    actions: {},
    modules: {},
    getters: {
        score: state => {return state.score},
        resultMessage: state => {return state.resultMessage}
    }
})