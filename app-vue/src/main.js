console.log("sono dentro main");

import Vue from 'vue'
import App from '../src/App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
