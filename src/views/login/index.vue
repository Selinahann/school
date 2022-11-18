<template>
  <div class="login-page">
    <div class="video-bg">
      <video autoplay loop="loop" preload="auto" muted="muted" src="https://dc.xhscdn.com/9379abe0-7ad8-11e9-8794-9320f6c9d557/%E8%83%8C%E6%99%AF%E8%A7%86%E9%A2%91.mp4"></video>
    </div>
    <div class="login-wrap">
      <el-row>
        <el-col :span="12">
          <div class="bg"></div>
        </el-col>
        <el-col :span="12">
          <h2 class="title">惠农现代农场管理系统</h2>
          <el-form :model="loginForm" :rules="rules" status-icon ref="form" class="loginForm">
            <el-form-item prop="user_name">
              <el-input v-model="loginForm.user_name" placeholder="请输入账号名称"></el-input>
            </el-form-item>
            <el-form-item prop="user_pwd">
              <el-input type="password" v-model="loginForm.user_pwd"  placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="submit-btn" type="primary" @click="submitForm">登录</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        user_name: '',
        user_pwd: ''
      },
      rules: {
        user_name: [
          { required: true, message: '请输入账号名称', trigger: 'submit' }
        ],
        user_pwd: [
          { required: true, message: '请输入密码', trigger: 'submit' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.replace('/home')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  @include wh(100vw, 100vh);
  overflow: hidden;
  .video-bg {
    @include wh(100vw, 100vh);
    overflow: hidden;
    video {
      @include wh(100vw, auto);
    }
  }
  .login-wrap {
    @include wh(800px, 400px);
    background: #fff;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    position: absolute;
    border-radius: 10px;
    overflow: hidden;
    .el-row {
      height: 100%;
      .el-col {
        height: 100%;
      }
    }
    .bg {
      width: 100%;
      height: 100%;
      background: #f00;
    }
    .title {
      font-size: 24px;
      line-height: 100px;
      // text-align: center;
      padding-left: 40px;
    }
    .loginForm {
      padding: 0 40px;
      .submit-btn {
        width: 100%;
      }
    }
  }
}
</style>
