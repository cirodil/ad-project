import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
