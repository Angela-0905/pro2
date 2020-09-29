<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单 -->
      <!--  ref="" 获取表单的实例对象, 值就是实例对象，获取之后就可以使用表单的方法 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rule"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <!-- 注意prop是加给item的不是加给文本框的 -->
        <el-form-item prop="username">
          <!-- 在输入框放入前置图标prefix-icon, iconfont 表示基础类必须要有 -->
          <el-input          
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prop=""
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: "",
        password: "",
      },
      // 表单的验证规则对象
      rule: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur" },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在3到10个字符", trigger: "blur" },
        ],
      },
    };
  },

  methods:{
      // 重置表单
      resetLoginForm(){
        // this指的是当前组件的实例
        // console.log(this)
        // resetFields()重置表单
        this.$refs.loginFormRef.resetFields()
      },
      login(){
          // 进行表单验证
          // validate 通过回调函数拿到验证结果
          // 1. 获取表单的引用对象，然后调用validate方法进行验证
          this.$refs.loginFormRef.validate( async valid=>{
                // console.log(valid)  第一个参数是函数，结果是一个布尔值, 根据结果确定是否发起请求
                // 2. 如果为false 就return 不发起请求
                if(!valid) return;
                // 如果是true则发起请求
                // 如果返回的是一个promise对象就要 用async进行优化
                // { } 解构赋值, data 重命名为res
                 const { data : res } = await this.$http.post('login', this.loginForm)
                // 3. 根据结果弹窗
                 if(res.meta.status!==200) return this.$message.error('登录失败！')
                 this.$message.success('登录成功')
                 // 4. 把后台返回的token保存到客户端sessionSrorage
                 // 记录token是为了在访问一些有权限的页面的时候提供一个身份信息
                 window.sessionStorage.setItem('token', res.data.token)
                 // 5. 登录成功后路由跳转
                 this.$router.push('/home')
          })
      }
  }
};
</script>

<style lang="less" scoped>
// scoped 只在当前节点内生效，去掉会全局生效，为了避免样式冲突
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  // 进行页面上的位移
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    // 根据头像盒子的宽高位移
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .btns {
    display: flex;
    //    flex-end  位于容器的最后
    justify-content: flex-end;
  }
}
</style>