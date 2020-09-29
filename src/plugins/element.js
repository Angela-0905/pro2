import Vue from 'vue'
import Element from 'element-ui'
import '../element-variables.scss'
// {表示按需导入}
import {Form, FormItem} from 'element-ui'
import {Input} from 'element-ui'
import {Button} from 'element-ui'
import {Message} from 'element-ui'



Vue.use(Element)
// 注册为全局可用的组件
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
// message的挂载方法和其他组件不同
// 把弹框组件挂载到了vue的原形对象上, 其他组件可以用this来访问到$message
Vue.prototype.$message=Message



