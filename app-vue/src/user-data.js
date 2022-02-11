/*export const state = () => ({
    userTokens: null
})

export const mutations = {
    setUserTokens(state, userTokens) {
        state.userTokens = userTokens
    }
}

this.$store.commit("setUserTokens", userTokens);
console.log(this.$store.state)
this.$store.commit("setUsername", name)
*/

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