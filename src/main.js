import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import BuyModalComponent from '@/components/Shared/BuyModal'
import * as fb from 'firebase'
import '@babel/polyfill'

Vue.component('app-buy-modal', BuyModalComponent)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyDlXy35rxb4hzjVFqRyyQ1qSnmuNYjr0ug',
      authDomain: 'itc-ad-e51c9.firebaseapp.com',
      databaseURL: 'https://itc-ad-e51c9.firebaseio.com',
      projectId: 'itc-ad-e51c9',
      storageBucket: 'itc-ad-e51c9.appspot.com',
      messagingSenderId: '45494270279',
      appId: '1:45494270279:web:48f224825940e188'
    })

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')
