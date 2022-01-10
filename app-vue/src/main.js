import Vue from 'vue'
import App from './App.vue'
import VueMq from 'vue-mq'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalculator } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

library.add(faCalculator)
//library.add(fabars)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueMq, {
  breakpoints: {
    mobile: 455,
    tablet: 900,
    laptop: 1250,
    desktop: Infinity,
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

//per poterlo usare nelle get -- questo file deve diventare uguale a main_page


