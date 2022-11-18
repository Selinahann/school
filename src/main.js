import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUi from 'element-ui'
import api from './api'
import installComponent from './plugins/installComponent'
import mavonEditor from 'mavon-editor'
import MarkdownItVue from 'markdown-it-vue'

import './assets/scss/element-variables.scss'
import './assets/scss/reset.scss'
import 'mavon-editor/dist/css/index.css'
import 'markdown-it-vue/dist/markdown-it-vue.css'

Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.use(installComponent)
Vue.use(api)
Vue.use(mavonEditor)
Vue.use(MarkdownItVue)

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vm
