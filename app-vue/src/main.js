import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
//import VueMq from 'vue-mq'
import router from "./routes"
import store from "./user-data"

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalculator, faArrowLeft, faExclamationCircle, faCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

//Vue.use(Vuex)

library.add(faCalculator)
library.add(faArrowLeft)
library.add(faExclamationCircle)
library.add(faCircle)
library.add(faSignOutAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

/*Vue.use(VueMq, {
  breakpoints: {
    mobile: 455,
    tablet: 900,
    laptop: 1250,
    desktop: Infinity,
  }
})*/

//Vue.prototype.$username = {value: false}
// e si accede: this.$username

Vue.config.productionTip = false

//Vue.use(router)

new Vue({
  router,
  store,
  //posso usare: data {username: ''}
  render: h => h(App),
}).$mount('#app')
  /*el: '#app', 
})*/



//per poterlo usare nelle get -- questo file deve diventare uguale a main_page


