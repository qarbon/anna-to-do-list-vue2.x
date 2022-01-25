import Vue from 'vue'
import App from './App.vue'
import store from './store';
import mdiVue from 'mdi-vue/v2'
import * as mdijs from '@mdi/js'
import './styles/index.css'
Vue.config.productionTip = false

Vue.use(mdiVue, {
  icons: mdijs
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
