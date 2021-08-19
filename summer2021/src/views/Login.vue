<template>
  <div>
    <div class="content1"></div>
    <div class="content2">
      <!--    <div class="bg bg-blur"></div>-->
      <el-container class="content2">
        <!--      <el-header>-->
        <!--        <img class="mlogo" src="http://o.bookschina.com/images/logo0508.png" alt="">-->
        <!--      </el-header>-->

        <!--      <el-main>-->
        <el-tabs v-model="activeName" type="border-card" style="width: 340px; margin:100px auto auto;">
          <el-tab-pane name="login">
            <div slot="label" style="width: 129px; color: #333333;">登录</div>
            <el-form :model="ruleFormLogin" status-icon :rules="rulesLogin" ref="ruleFormLogin" label-width="100px"
                     class="demo-ruleForm">
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
                ></el-input>
              </el-form-item>
              <el-form-item style="margin-left: -70px;">
                <el-row style="text-align: center; margin-top: -10px;">
                  <el-checkbox v-model="remember_me" style="float: left; padding-top: 1px">记住我</el-checkbox>
                  <el-link :underline="false" style="float: right; padding-bottom: 130px">忘记密码？</el-link>
                  <!--                <el-link type="primary">g</el-link>-->
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitFormLogin('ruleFormLogin')" style="background-color: #333333">登录
                </el-button>
                <el-button @click="resetForm('ruleFormLogin')">重置</el-button>
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
                <el-input maxlength="19" placeholder="请输入密码(6-18位)" type="password" v-model="ruleFormSignup.pass"
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
                    <el-link :underline="false" style="padding-top: 10px; float: right;">发送验证码</el-link>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitFormSignup('ruleFormSignup')" style="background-color: #333333">
                  立即注册
                </el-button>
                <el-button @click="resetForm('ruleFormSignup')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-container>
    </div>
  </div>

</template>

<script>
export default {
  name: "Login",
  data() {
    const checkUsername = (rule, value, callback) => {
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
    const validateCheckCode = (rule, value, callback) => {
      if (value === '' || (value + '').toString().length !== 4) {
        callback(new Error('请输入邮箱的4位验证码'));
      } else {
        callback();
      }
    };
    return {
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
      isLogin: true,
      remember_me: false,
    };
  },
  created() {
    this.isLogin = true
  },
  methods: {
    submitFormLogin(formName) {
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

            this.$message({
              showClose: true,
              message: '登录成功',
              type: 'success',
              duration: 2000
            })

            this.$router.push('/books')
          })
        } else {
          console.log('error submit!!!');
          return false;
        }
      });
    },
    submitFormSignup(formName) {
      console.log('signup')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          const _this = this
          this.$axios.post('/signup', this.ruleFormSignup).then(res => {
            const jwt = res.headers['authorization']
            const userInfo = res.data.data
            console.log(userInfo)

            // Share the data
            _this.$store.commit('SET_TOKEN', jwt)
            _this.$store.commit('SET_USERINFO', userInfo)

            console.log(_this.$store.getters.getUser)
            this.$message({
              showClose: true,
              message: '注册成功，请重新登录',
              type: 'success',
              duration: 2000
            })
            // _this.$router.go(0)
            this.activeName = 'login'
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
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

.content1 {
  height: 100%;
  width: 100%;
  /*border: 0px solid green;*/
  position: fixed;
  /* background: url(../../public/register.jpeg) 0 0 no-repeat; */
  background-size: 100% 100%;
  opacity: 0.8;
  text-align: center;
  -webkit-filter: blur(8px);
  -ms-filter: blur(8px);
  filter: blur(8px);
}

.content2 {
  height: 100%;
  width: 100%;
  /*border: 0px solid green;*/
  position: fixed;
  background-size: 100% 100%;
  text-align: center;
}

.el-input__inner {
  border-top-width: 0 !important;
  border-left-width: 0 !important;
  border-right-width: 0 !important;
  border-bottom-width: 1px !important;
  outline-color: #333333 !important;
}

.el-input__inner:focus {
  border-top-width: 0 !important;
  border-left-width: 0 !important;
  border-right-width: 0 !important;
  border-bottom-width: 1px !important;
  outline-color: #333333 !important;
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

.el-link:hover {
  color: #333333 !important;
}
</style>


<!--  <div class="content content-front">我是内容</div>-->