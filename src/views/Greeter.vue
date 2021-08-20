<template>
  <div class="login">
    <el-card>
      <div class="logo"><img
          src="../assets/logo.png"
          class="img"
        ></div>
      <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        label-width="23%"
        id="form"
      >
        <el-form-item
          label="昵称"
          prop="nickname"
          key="nick_item"
        >
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <!-- <el-form-item
          v-if="register"
        >
          <el-input
            v-model="form.nickname"
            key="nickname"
          ></el-input>
        </el-form-item> -->
        <el-form-item
          label="密码"
          prop="pass"
          key="pass_item"
        >
          <el-input
            type="password"
            v-model="form.pass"
            :autocomplete="this.register?'new-password':'current-password'"
            key="pass"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          v-if="register"
          label="确认密码"
          prop="checkPass"
        >
          <el-input
            type="password"
            v-model="form.checkPass"
            autocomplete="new-password"
          ></el-input>
        </el-form-item>
        <el-form-item class="button-container">
          <el-button
            type="primary"
            round
            @click="submitForm()"
          >
            <span v-if="this.register">注册</span>
            <span v-else>登录</span>
          </el-button>
          <el-button
            @click="resetForm()"
            type="primary"
            round
          >重置</el-button>
        </el-form-item>
        <el-form-item id='bott'>
          <el-button
            type="text"
            @click="register = !register"
          >
            <div
              v-if="register"
              class="text-grey"
            >返回登录</div>
            <div
              v-else
              class="text-grey"
            >
              没有账号？点此注册
            </div>
          </el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            @click="$router.push('/resetpassword')"
          >
            <div class="text-grey">重置密码</div>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
import QS from 'qs'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.register && this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (!this.register) {
        callback()
      }
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不匹配!'))
      } else {
        callback()
      }
    }
    return {
      register: false,
      form: {
        email: '',
        nickname: '',
        pass: '',
        checkPass: ''
      },
      responseResult: {},
      rules: {
        email: [
          { required: true, message: "请输入邮箱" },
          { pattern: /.+@.+/, message: "您输入的邮箱不正确" },
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      var password1 = this.form.pass;
      var Data = new FormData();
      var url1 = ''
      if (this.register) {
        Data.append("password", password1)
        Data.append("username", this.form.nickname)
        Data.append('checkPassword', password1)
        url1 = 'http://82.157.97.70/api/sign_up_username_password'
      }
      else {
        Data.append("password", password1)
        Data.append("username", this.form.nickname)
        url1 = 'http://82.157.97.70/api/login_username_password'
      }
      console.log(this.form.pass)
      axios({
        url: url1,
        method: 'post',
        data: Data
      }).then((res) => {
        console.log(res)
        if (this.register) {
          this.register = false
          alert('注册成功')
        }
        else {
          this.responseResult = JSON.stringify(res.data)
          if (res.data.code === 200) {
            localStorage.setItem
          }

          localStorage.setItem('userName', this.form.nickname)
          // localStorage.setItem('userName',this.ruleForm.userName);
          //获取并存储服务器返回的AuthorizationToken信息
          var authorization = res.headers['authorization'];
          localStorage.setItem('authorization', authorization);
          localStorage.setItem('user_id', res.data.data.user_id)
          //登录成功跳转页面
          this.$router.push('/')
        }
      })
    },
    resetForm() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped>
.login {
  text-align: center;
}
.el-card {
  width: 30%;
  margin: 10vh auto;
  padding: 0 4% 0 0;
}
.logo {
  position: relative;
  margin: 0 0 5% 20%;
}
.img {
  width: 50%;
}
.el-form-item {
  padding: 1%;
}
.button-container .el-button {
  margin: 0 10% 0 10%;
  width: 30%;
  min-width: min-content;
}
#bott {
  text-align: center;
  margin-bottom: 0%;
}
</style>
