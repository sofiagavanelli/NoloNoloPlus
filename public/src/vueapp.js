//import Vue from 'vue'
//import App from './App.Vue'
/*import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

/* Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false

/*import App from './App.Vue';

  new Vue({
    render: h => h(App),
  }).$mount('#app')


/*new Vue({
  el: "#app",
  data() {
    return {
      name: "World!"
    };
  }
});

new Vue({
  //data: () => ({ message: 'Row' }),
  template: `
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Nolo Nolo Plus</b-navbar-brand>
    <b-col cols='6'>
      <b-input-group class="noborder">
        <b-form-input id="ricerca" placeholder="Search..."></b-form-input>
        <b-input-group-append>
          <b-button class="bg-primary">Cerca</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-col>
  </b-navbar>
  `
}).$mount('#app');*/


import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

