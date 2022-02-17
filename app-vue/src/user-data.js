
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: null,
    discount: null
  },
  mutations: {
    setUsername(state, _user) {
      state.username = _user
    },
    setDiscount(state, value) {
      state.discount = value
    }
  }
})