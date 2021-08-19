<template>
  <div class="content">
    <el-container>
      <!--      <el-header>-->
      <!--        <img class="mlogo" src="http://o.bookschina.com/images/logo0508.png" alt="">-->
      <!--      </el-header>-->
      <el-main>

        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username" >
            <el-input maxlength="16" placeholder="请输入用户名" v-model="ruleForm.username" clearable
                      prefix-icon="el-icon-user-solid"
                      style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>
          </el-form-item>
          <el-form-item label="密  码" prop="pass">
            <el-input maxlength="19" placeholder="请输入密码" type="password" v-model="ruleForm.pass" autocomplete="off"
                      show-password
                      clearable prefix-icon="el-icon-goods"
                      style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input maxlength="19" placeholder="请输入确认密码" type="password"
                      v-model="ruleForm.checkPass" autocomplete="off"
                      show-password clearable
                      prefix-icon="el-icon-s-goods"
                      style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>
          </el-form-item>
          <el-form-item label="邮  箱" prop="email">
            <el-input maxlength="321" placeholder="请输入邮箱" type="email" v-model="ruleForm.email" clearable
                      prefix-icon="el-icon-message"
                      style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "Signup",
  components: {Header},
  data() {
    const checkUsername = (rule, value, callback) => {
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
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else if ((value + "").toString().length > 18 || (value + "").toString().length < 6) {
        callback(new Error('密码长度为6-18位'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认密码不能为空'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {},
      rules: {
        username: [
          {validator: checkUsername, trigger: 'change'},
        ],
        pass: [
          {validator: validatePass, trigger: 'blur'},
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'},
        ],
        email: [
          {trigger: 'change', validator: checkEmail}
        ],
      }
    };
  }
  ,
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          const _this = this
          this.$axios.post('/signup', this.ruleForm).then(res => {
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
            _this.$router.push('/login')
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
</script>

<style scoped>

</style>
<style>
.el-header, .el-footer {
  background-color: #e3e7ec;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #15559a;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  margin-top: 200px;
  color: rgba(21, 6, 255, 0);
  text-align: center;
  line-height: 160px;
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

.content {
  /*background-color: #db5252;*/
  height: 100%;
  width: 100%;
  border: 1px solid green;
  position: fixed;
  /* background: url(../../public/login.jpeg) 0 0 no-repeat; */
  background-size: 100% 100%;
  text-align: center;
}

/*.demo-ruleForm {*/
/*  background-color: #e9ecde;*/
/*  max-width: 220px;*/
/*  padding-right: 30px;*/
/*  padding-bottom: 30px;*/
/*  padding-top: 30px;*/
/*  border-radius: 30px;*/
/*}*/

html, body {
  margin: 0;
  padding: 0;


}
</style>