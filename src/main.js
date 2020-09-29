// 整个项目的入口文件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import axios from 'axios'
Vue.prototype.$http=axios
// 配置请求的根路径
axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'

// 导入全局样式
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

Vue.config.productionTip = false

// 一个vue的实例, 通过render函数把app根组件渲染到页面上，路由也挂载在vue实例上
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
