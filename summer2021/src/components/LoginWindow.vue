<template>
  <div>
    <!--    <div class="content1_window" v-show="this.$store.state.wantLogin"></div>-->
    <!--    <div class="content2_window" v-show="this.$store.state.wantLogin">-->

    <div class="content1_window"
         ></div>
    <div class="content2_window"
        >
      <!--    <div class="bg bg-blur"></div>-->
      <el-container class="content2">
        <!--      <el-main>-->
        <el-tabs v-model="activeName" type="border-card" style="width: 340px; margin:100px auto auto;">
          <el-tab-pane name="login">
            <div slot="label" style="width: 129px; color: #333333;" v-show="!wantChangePass">登录</div>
            <el-form :model="ruleFormLogin" status-icon :rules="rulesLogin" ref="ruleFormLogin" label-width="100px"
                     class="demo-ruleForm" v-show="!wantChangePass">
              <el-form-item prop="username" style="margin-left: -70px;">
                <el-input maxlength="16" placeholder="请输入用户名" v-model="ruleFormLogin.username" clearable
                          prefix-icon="el-icon-user-solid"
                          style="outline: 0"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password" style="margin-left: -70px;">
                <el-input maxlength="19" placeholder="请输入密码" type="password" v-model="ruleFormLogin.password"
                          show-password
                          clearable prefix-icon="el-icon-s-goods"
                          @keyup.enter.native="submitFormLogin('ruleFormLogin')"
                ></el-input>
              </el-form-item>
              <el-form-item style="margin-left: -70px;">
                <el-row style="text-align: center; margin-top: -10px;">
                  <el-checkbox v-model="remember_me" style="float: left; padding-top: 1px">记住我</el-checkbox>
                  <el-link :underline="false" style="float: right; padding-bottom: 130px" @click="changePass()">忘记密码？
                  </el-link>
                  <!--                <el-link type="primary">g</el-link>-->
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitFormLogin('ruleFormLogin')"
                           style="background-color: #333333">
                  登录
                </el-button>
                <el-button @click="resetForm('ruleFormLogin')">重置</el-button>
              </el-form-item>
              <el-form-item style="margin-top: -20px">
                <el-link @click="cancelLogin" :underline="false" style="margin-left: -70px">游客登录</el-link>
              </el-form-item>
            </el-form>

            <div slot="label" style="width: 129px; color: #333333;" v-show="wantChangePass">修改密码</div>
            <el-form :model="ruleFormChangePass" status-icon :rules="rulesChangePass" ref="ruleFormChangePass"
                     label-width="100px"
                     class="demo-ruleForm" v-show="wantChangePass">
              <el-form-item prop="username" style="margin-left: -70px;">
                <el-input maxlength="16" placeholder="请输入用户名" v-model="ruleFormChangePass.username" clearable
                          prefix-icon="el-icon-user-solid"
                          autocomplete="new-password"
                ></el-input>
              </el-form-item>
              <el-form-item prop="pass" style="margin-left: -70px;">
                <el-input maxlength="19" placeholder="请输入新密码(6-18位)" type="password"
                          v-model="ruleFormChangePass.pass"
                          autocomplete="new-password"
                          show-password
                          clearable prefix-icon="el-icon-goods"
                ></el-input>
              </el-form-item>
              <el-form-item prop="checkPass" style="margin-left: -70px;">
                <el-input maxlength="19" placeholder="请输入确认新密码" type="password"
                          v-model="ruleFormChangePass.checkPass"
                          show-password clearable
                          autocomplete="new-password"
                          prefix-icon="el-icon-s-goods"
                ></el-input>
              </el-form-item>
              <el-form-item prop="email" style="margin-left: -70px;">
                <el-input maxlength="321" placeholder="请输入邮箱" type="email" v-model="ruleFormChangePass.email" clearable
                          prefix-icon="el-icon-message"
                          autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item prop="checkCode" style="margin-left: -70px; width: 340px;">
                <el-row>
                  <el-col :span="13">
                    <el-input maxlength="4" placeholder="邮件验证码" type="text" v-model="ruleFormChangePass.checkCode"
                              clearable
                              autocomplete="new-password"></el-input>
                  </el-col>
                  <el-col :span="11">
                    <el-link :underline="false" style="padding-top: 10px; float: right;"
                             @click="submitEmailChangePass('ruleFormChangePass')"
                             :disabled="linkValue !== '发送验证码'">{{ this.linkValue }}
                    </el-link>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitFormChangePass('ruleFormChangePass')"
                           style="background-color: #333333">
                  立即修改
                </el-button>
                <el-button @click="resetForm('ruleFormChangePass')">重置</el-button>
              </el-form-item>
              <el-form-item style="margin-top: -20px">
                <el-link @click="cancelChangePass" :underline="false" style="margin-left: -70px">取消</el-link>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane name="signup">
            <div slot="label" style="width: 129px; color: #333333;">注册</div>
            <el-form :model="ruleFormSignup" status-icon :rules="rulesSignup" ref="ruleFormSignup" label-width="100px"
                     class="demo-ruleForm">
              <el-form-item prop="username" style="margin-left: -70px;">
                <el-input maxlength="16" placeholder="请输入用户名" v-model="ruleFormSignup.username" clearable
                          prefix-icon="el-icon-user-solid"
                          autocomplete="new-password"
                ></el-input>
              </el-form-item>
              <el-form-item prop="pass" style="margin-left: -70px;">
                <el-input maxlength="19" placeholder="请输入密码(6-18位)" type="password"
                          v-model="ruleFormSignup.pass"
                          autocomplete="new-password"
                          show-password
                          clearable prefix-icon="el-icon-goods"
                ></el-input>
              </el-form-item>
              <el-form-item prop="checkPass" style="margin-left: -70px;">
                <el-input maxlength="19" placeholder="请输入确认密码" type="password"
                          v-model="ruleFormSignup.checkPass"
                          show-password clearable
                          autocomplete="new-password"
                          prefix-icon="el-icon-s-goods"
                ></el-input>
              </el-form-item>
              <el-form-item prop="email" style="margin-left: -70px;">
                <el-input maxlength="321" placeholder="请输入邮箱" type="email" v-model="ruleFormSignup.email" clearable
                          prefix-icon="el-icon-message"
                          autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item prop="checkCode" style="margin-left: -70px; width: 340px;">
                <el-row>
                  <el-col :span="13">
                    <el-input maxlength="4" placeholder="邮件验证码" type="text" v-model="ruleFormSignup.checkCode" clearable
                              autocomplete="new-password"></el-input>
                  </el-col>
                  <el-col :span="11">
                    <el-link :underline="false" style="padding-top: 10px; float: right;"
                             @click="submitEmail('ruleFormSignup')"
                             :disabled="linkValue !== '发送验证码'">{{ this.linkValue }}
                    </el-link>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitFormSignup('ruleFormSignup')" style="background-color: #333333">
                  立即注册
                </el-button>
                <el-button @click="resetForm('ruleFormSignup')">重置</el-button>
              </el-form-item>
              <el-form-item style="margin-top: -20px">
                <el-link @click="cancelLogin" :underline="false" style="margin-left: -70px">游客登录</el-link>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-container>
    </div>
  </div>

</template>

<script>
import Element from "element-ui";
import axios from "axios";

export default {
  name: "LoginWindow",
  data() {
    const checkUsername = (rule, value, callback) => {
      // alert(this.$store.state.doNotWantLogin)
      console.log("checkUsername")
      if (value === '') {
        console.log('value')
        return callback(new Error('用户名不能为空'))
      } else if (value.toString().length > 15) {
        return callback(new Error('用户名长度不超过15'))
      } else {
        return callback()
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else if ((value + "").toString().length > 18 || (value + "").toString().length < 6) {
        callback(new Error('密码长度为6-18位'));
      } else {
        callback();
      }
    };
    const checkUsername2 = (rule, value, callback) => {
      console.log("checkUsername2:", value)
      if (value === '') {
        return callback(new Error('用户名不能为空'))
      } else if (value.toString().length > 15) {
        return callback(new Error('用户名长度不超过15'))
      } else {
        return callback()
      }
    }
    const checkEmail = (rule, value, callback) => {
      const mailReg = /^.+@.+\.+.+/
      if (value === '') {
        return callback(new Error('邮箱不能为空'))
      }
      if (value.toString().length > 320) {
        return callback(new Error('邮箱长度不超过320'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    const validatePass1 = (rule, value, callback) => {
      // alert('nmsl9')
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else if ((value + "").toString().length > 18 || (value + "").toString().length < 6) {
        callback(new Error('密码长度为6-18位'));
      } else {
        if (this.ruleFormSignup.checkPass !== '') {
          this.$refs.ruleFormSignup.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认密码不能为空'));
      } else if (value !== this.ruleFormSignup.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const validateChangePass1 = (rule, value, callback) => {
      // alert('nmsl')
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else if ((value + "").toString().length > 18 || (value + "").toString().length < 6) {
        callback(new Error('密码长度为6-18位'));
      } else {
        if (this.ruleFormChangePass.checkPass !== '') {
          this.$refs.ruleFormChangePass.validateField('checkPass');
        }
        callback();
      }
    };
    const validateChangePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认密码不能为空'));
      } else if (value !== this.ruleFormChangePass.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const validateCheckCode = (rule, value, callback) => {
      if (value === '' || (value + '').toString().length !== 4) {
        callback(new Error('请输入邮箱的4位验证码'));
      } else {
        callback();
      }
    };
    return {
      linkValue: '发送验证码',
      checkTime: 60,
      wantChangePass: false,
      wantLogin: true,
      ruleFormLogin: {
        username: '',
        password: ''
      },
      ruleFormSignup: {
        username: '',
        pass: '',
        checkPass: '',
        email: '',
        checkCode: ''
      },
      ruleFormChangePass: {
        username: '',
        pass: '',
        checkPass: '',
        email: '',
        checkCode: ''
      },
      activeName: 'login',
      rulesLogin: {
        username: [
          {validator: checkUsername, trigger: 'change'},
        ],
        password: [
          {validator: validatePass, trigger: 'change'}
        ]
      },

      rulesSignup: {
        username: [
          {validator: checkUsername2, trigger: 'change'},
        ],
        pass: [
          {validator: validatePass1, trigger: 'change'},
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'change'},
        ],
        email: [
          {validator: checkEmail, trigger: 'change'},
        ],
        checkCode: [
          {validator: validateCheckCode, trigger: 'change'},
        ]
      },
      rulesChangePass: {
        username: [
          {validator: checkUsername2, trigger: 'change'},
        ],
        pass: [
          {validator: validateChangePass1, trigger: 'change'},
        ],
        checkPass: [
          {validator: validateChangePass2, trigger: 'change'},
        ],
        email: [
          {validator: checkEmail, trigger: 'change'},
        ],
        checkCode: [
          {validator: validateCheckCode, trigger: 'change'},
        ]
      },
      isLogin: true,
      remember_me: false,
    };
  },
  created() {
    this.isLogin = true
    this.wantLogin = true
    this.wantChangePass = false
  },
  methods: {

    sleep(delay) {
      return new Promise((resolve) => setTimeout(resolve, delay));
    },
    countDown() {

      for (let i = 0; i < 60; i++) {
        setTimeout(() => {
          this.linkValue = (60 - i) + 's后重新发送'
          console.log(this.linkValue)
          if (i === 59) {
            this.linkValue = '发送验证码'
          }
        }, 1000*i)

      }

    },
    getMessageNum(){
      if(this.$store.state.userInfo===null){
        this.count=0;
      }
      else{
        axios({
          url: "/getMessageNum",
          method: "get",
          params: {
            user_id:JSON.parse(this.$store.state.userInfo).id
          },
        }).then((res) => {
          this.count=res.data.data;
          this.$store.commit('modifyMessageNum',this.count);
        });
      }
    },
    cancelChangePass() {
      this.wantChangePass = false
    }
    ,
    changePass() {
      this.wantChangePass = true
    }
    ,
    cancelLogin() {
      this.$store.commit('DONT_WANT_LOGIN')
    }
    ,
    submitEmail(formName) {
      // ifthis.$refs[formName].((valid)=>{
      //   if (valid) {
      //     const _this = this
      //     this.$axios.post('/sendVerificationCode',this.email)
      //   } else {
      //     return false;
      //   }
      // })
      const mailReg = /^.+@.+\.+.+/
      const _this = this
      if (!mailReg.test(this.ruleFormSignup.email)) {
        Element.Message({
          showClose: true,
          message: '邮箱格式不正确',
          type: 'error',
          duration: 2000
        })
        return
      }
      this.countDown()

      this.$axios.post('/sendVerificationCode', this.ruleFormSignup).then(res => {
        const jwt = res.headers['authorization']
        const userInfo = res.data.data
        console.log(userInfo)


        console.log(this.$store.getters.getUser)
        // this.$message({
        //   showClose: true,
        //   message: '发送成功，请邮箱查收',
        //   type: 'success',
        //   duration: 2000
        // })
        // _this.$router.go(0)
        this.activeName = 'signup'
      })
    }
    ,
    submitEmailChangePass(formName) {
      // ifthis.$refs[formName].((valid)=>{
      //   if (valid) {
      //     const _this = this
      //     this.$axios.post('/sendVerificationCode',this.email)
      //   } else {
      //     return false;
      //   }
      // })
      const mailReg = /^.+@.+\.+.+/
      const _this = this
      if (!mailReg.test(this.ruleFormChangePass.email)) {
        Element.Message({
          showClose: true,
          message: 'mail eeee',
          type: 'error',
          duration: 2000
        })
        return
      }
      this.countDown()
      this.$axios.post('/sendVerificationCode', this.ruleFormChangePass).then(res => {
        const jwt = res.headers['authorization']
        const userInfo = res.data.data
        console.log(userInfo)


        console.log(this.$store.getters.getUser)
        // this.$message({
        //   showClose: true,
        //   message: '发送成功，请邮箱查收',
        //   type: 'success',
        //   duration: 2000
        // })
        // _this.$router.go(0)

        // this.activeName = 'login'

      })
    }
    ,
    submitFormLogin(formName) {
      this.ruleFormLogin.username = this.ruleFormLogin.username.trim()
      this.ruleFormLogin.password = this.ruleFormLogin.password.trim()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          const _this = this
          this.$axios.post('/login', this.ruleFormLogin).then(res => {
            const jwt = res.headers['authorization']
            const userInfo = res.data.data
            console.log(userInfo)

            // Share the data
            this.$store.commit('SET_TOKEN', jwt)
            this.$store.commit('SET_USERINFO', userInfo)

            console.log(_this.$store.getters.getUser)
            // this.$router.go(0)
            // this.$message({
            //   showClose: true,
            //   message: '登录成功',
            //   type: 'success',
            //   duration: 2000
            // })
            this.$store.state.is_login = userInfo.identity
            this.getMessageNum()
            // this.$router.push('/books')

          })
        } else {
          console.log('error submit!!!');
          return false;
        }
      });
    }
    ,
    submitFormSignup(formName) {
      this.ruleFormSignup.username = this.ruleFormSignup.username.trim()
      this.ruleFormSignup.checkCode = this.ruleFormSignup.checkCode.trim()
      this.ruleFormSignup.pass = this.ruleFormSignup.pass.trim()
      this.ruleFormSignup.checkPass = this.ruleFormSignup.checkPass.trim()
      this.ruleFormSignup.email = this.ruleFormSignup.email.trim()
      console.log('signup')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          this.$axios.post('/signup', this.ruleFormSignup).then(res => {
            const jwt = res.headers['authorization']
            const userInfo = res.data.data
            console.log(userInfo)
            this.activeName = 'login'
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
    ,
    submitFormChangePass(formName) {
      this.ruleFormChangePass.username = this.ruleFormChangePass.username.trim()
      this.ruleFormChangePass.checkCode = this.ruleFormChangePass.checkCode.trim()
      this.ruleFormChangePass.pass = this.ruleFormChangePass.pass.trim()
      this.ruleFormChangePass.checkPass = this.ruleFormChangePass.checkPass.trim()
      this.ruleFormChangePass.email = this.ruleFormChangePass.email.trim()
      console.log('changePass')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          this.$axios.post('/changePass', this.ruleFormChangePass).then(res => {
            const jwt = res.headers['authorization']
            const userInfo = res.data.data
            console.log(userInfo)
            this.activeName = 'login'
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
    ,
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}

const shuijiao = async () => {
  await sleep(100000)
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
</script>

<style scoped>

</style>
<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  /*background-color: #E9EEF3;*/
  color: #333;
  text-align: center;
  line-height: 60px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.mlogo {
  height: 60%;
  margin-top: 10px;
}

/*.demo-ruleForm {*/
/*  max-width: 220px;*/
/*  margin: 0 auto;*/
/*}*/
.demo-ruleForm {
  background-color: #fff;
  max-width: 320px;
  padding-right: 30px;
  padding-bottom: 30px;
  padding-top: 30px;
  border-radius: 10px;
  margin: auto auto;
}

.content1_window {
  height: 100%;
  width: 100%;
  background-color: #333333;
  /*border: 0px solid green;*/
  opacity: 0.6;
  text-align: center;
  /*-webkit-filter: blur(8px);*/
  /*-ms-filter: blur(8px);*/
  /*filter: blur(8px);*/
  position: fixed;
}

.content2_window {
  height: 100%;
  width: 100%;
  background-color: #333333;
  /*opacity: 0.5;*/
  /*border: 0px solid green;*/
  /*position: fixed;*/
  background-size: 100% 100%;
  text-align: center;
}

.el-input__inner {
  border-top-width: 0 !important;
  border-left-width: 0 !important;
  border-right-width: 0 !important;
  border-bottom-width: 1px !important;
  outline-color: #333333 !important;
  border-radius: 0 !important;
}

.el-input__inner:focus {
  border-top-width: 0 !important;
  border-left-width: 0 !important;
  border-right-width: 0 !important;
  border-bottom-width: 1px !important;
  outline-color: #333333 !important;
  border-block-color: #33333350 !important;
}

.el-input {
  outline: 0 !important;
}


.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border-color: #333333 !important;
  background-color: #333333 !important;
}

.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #333333 !important;
}

.el-checkbox__inner:hover {
  border-color: #333333 !important;
}

.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #333333 !important;
}



.my_link:hover {
  color: #333333 !important;
}

.your_link {
  color: red!important;
}

</style>


<!--  <div class="content content-front">我是内容</div>-->