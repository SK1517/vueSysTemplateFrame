<template>
    <div class="login-page">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" class="login-form" :style="{width:formWidth+'px'}">
            <div class="login-box">
                <div class="line line-left"></div>
                <div class="text">用户登录</div>
                <div class="line line-right"></div>
            </div>
            <el-form-item :prop="username.prop">
                <el-input v-model="loginForm[username.prop]" clearable :placeholder="'请输入'+username.label"
                          v-if="!username.append" prefix-icon="el-icon-user"></el-input>
                <el-input v-model="loginForm[username.prop]" clearable :placeholder="'请输入'+username.label"
                          prefix-icon="el-icon-user" v-else>
                    <template slot="append">{{username.append}}</template>
                </el-input>
            </el-form-item>
            <el-form-item :prop="password.prop">
                <el-input type="password" clearable v-model="loginForm[password.prop]"
                          :placeholder="'请输入'+password.label" prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="login-btn" type="primary" @click="submitLogin('loginForm')" v-loading="submitLoading">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import axs from '../../axios.service';
  import md5 from './md5';
  import utils from '../utils';
  import config from '../config';
  export default {
    name: "Login",
    props: {
      username: {
        type: Object,
        default: function () {
          return {
            label: '用户名',
            prop: 'username',
            append: ''
          }
        }
      },
      password: {
        type: Object,
        default: function () {
          return {
            label: '密码',
            prop: 'password'
          }
        }
      },
      fetchProp:{
        type:Object,
        default:function(){
          return {
            url:'',
            method:'post',
            statusKey: 'status',
            successCode: 200,
            tokenKey:'res.data.token',
            authKey:'res.data.authority',
            userInfoKey:'res.data.user',
          }
        }
      },
    },
    data () {
      return {
        formWidth: 320,
        submitLoading:false,
        loginForm: {},
        rules: {}
      }
    },
    created () {
      if (this.username.append) {
        this.formWidth = 400
      }
      this.$set(this.loginForm, this.username.prop, '');
      this.$set(this.loginForm, this.password.prop, '');
      this.$set(this.rules, this.username.prop, [
        {required: true, message: '请输入' + this.username.label, trigger: 'blur'},
      ]);
      this.$set(this.rules, this.password.prop, [
        {required: true, message: '请输入' + this.password.label, trigger: 'blur'},
      ]);
    },
    methods: {
      submitLogin (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoading = true;
            const params = {};
            params[this.username.prop] = this.loginForm[this.username.prop]+this.username.append;
            params[this.password.prop] = md5(this.loginForm[this.password.prop]);
            console.log('params',params)
            axs.request(this.fetchProp.url,params,this.fetchProp.method).then(res=>{
              if(res[this.fetchProp.statusKey] == this.fetchProp.successCode){
                const token = eval(`${this.fetchProp.tokenKey}`);
                const auth = eval(`${this.fetchProp.authKey}`);
                const userInfo = eval(`${this.fetchProp.userInfoKey}`);
                if(token){
                  utils.setToken(token)
                }
                if(auth){
                  utils.setUserAuthority(auth)
                }
                if(userInfo){
                  utils.setUserInfo(userInfo)
                }
                window.gVueInterceptor = false;
                if(config.remainRedirect){
                  this.$router.push({path:this.$route.query.redirect_url||'/'})
                }else{
                  this.$router.push({path:config.loginRedirect||'/'})
                }
              }else{
                this.$message.warning('登录失败');
              }
              this.submitLoading = false;
            }).catch(e=>{
              this.submitLoading = false;
              this.$message.error('登录异常');
              console.log(e);
            })
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
    .login-page {
        position: relative;
        width: 100%;
        height: 100%;
        background: url("../assets/login_bg.jpg") no-repeat;
        background-size: 100% 100%;
    }

    .login-form {
        position: relative;
        width: 320px;
        padding: 3px 35px 10px;
        box-sizing: border-box;
        background: #fff;
        border-radius: 3px;
        box-shadow: 0px 0px 3px #333;
        top: 15%;
        left: 40%;
    }

    .login-box {
        line-height: 60px;
        color: #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        text-shadow: -1px -1px 0px #ececec;
    }

    .login-box .line {
        flex-basis: 80px;
        width: 80px;
        height: 2px;
        border-radius: 2px;
    }

    .login-box .line-left {
        background: -webkit-gradient(linear, 0% 0%, 100% 100%, from(#f9f9f9), to(#bdbdbd));
    }

    .login-box .line-right {
        background: -webkit-gradient(linear, 0% 0%, 100% 100%, from(#bdbdbd), to(#f9f9f9));
    }

    .login-btn {
        display: block;
        width: 100%;
    }
</style>