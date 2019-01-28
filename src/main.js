import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './store/store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import moment from 'moment'
Vue.config.productionTip = false
Vue.use(Antd)

Vue.prototype.$moment = moment;//赋值使用
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
