import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    // 路由重定向
    // 访问根路径就自动跳转到登录页面
    redirect:'/login'
  },
   {
     path:"/login",
     component:Login
   },
   {
    path:"/home",
    component:Home
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由守卫
router.beforeEach( (to,from,next)=>{
  //1. 先判断是不是登录页，是就放行
   if(to.path === 'login') return next()
  //2. 不是就验证有没有token
  const tokenStr = window.sessionStorage.getItem('token')
  //2.1 如果没有token就强制跳转
  if(!tokenStr) return next('/login')
  // 如果存在就放行
  next()
})


export default router
