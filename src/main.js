import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import App from './App.vue'

window.eventHub = new Vue();


new Vue({
  el: '#app',
  render: h => h(App),
})
