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
import { faCalculator, faArrowLeft, faExclamationCircle, faCircle, faSignOutAlt, faUserEdit, faEdit, faPrint, faQuestionCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

//Vue.use(Vuex)

library.add(faCalculator)
library.add(faArrowLeft)
library.add(faExclamationCircle)
library.add(faQuestionCircle)
library.add(faCircle)
library.add(faSignOutAlt)
library.add(faUserEdit)
library.add(faEdit)
library.add(faPrint)
library.add(faTrash)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

//Vue.use(router)

new Vue({
  router,
  store,
  //posso usare: data {username: ''}
  render: h => h(App),
}).$mount('#app')
