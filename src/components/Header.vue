<template>
  <div class="header-container">
    <div class="header_nav">
      <div id="left">
        <router-link
          to="/"
          id="head-title"
        >
          <div class="logo"><img
              src="../assets/logo.png"
              class="img"
            /></div><span style="padding-left:8px">问卷星球</span>
        </router-link>
        <a
          @click="myquestionnaire"
          class="my"
        >
          <i class="el-icon-document"></i> 我的问卷
        </a>
        <a
          @click="toQuestionnaire_type()"
          to="/Questionnaire_type"
          class="my"
        >
          <i class="el-icon-document-add"></i> 新建问卷
        </a>
      </div>
      <ul>
        <li v-show="!hasLogin">
          <router-link to="/login"> 登录</router-link>
        </li>
        <div class="dropdown">
          <li
            v-show="hasLogin"
            id="person"
          >
            <el-dropdown>
              <span style="font-size:1.2em">
                {{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-show="ishow!=null">
                  <router-link to="/personInfo">个人中心</router-link>
                </el-dropdown-item>
                <el-dropdown-item><a @click="logout">退出登录</a></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </div>
        <li v-if="$route.path !== '/'">
          <router-link to="/">
            <span id="h-home">返回首页</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>

export default {
  name: "Header",
  data() {
    return {
      // usernames:window.localStorage.getItem('userName'),
      user: {
        username: window.localStorage.getItem('userName'),
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        // avatar: 'http://101.200.164.148/assets/avatars/khKXwpT86OF3hj3K.png'
      },
      hasLogin: false,
      ishow: window.localStorage.getItem('user_id')
    }
  },
  methods: {
    toQuestionnaire_type() {
      if (this.ishow != null) {
        this.$router.push('/Questionnaire_type')
      }
      else {
        this.$router.push('/login')
      }
    },
    logout() {
      window.localStorage.removeItem('user_id')
      window.localStorage.removeItem('authorization')
      window.localStorage.removeItem('userName')
      this.check_is_login();
      this.$message({
        message: '退出成功',
        type: 'success'
      });
      this.$router.push('/')
    },
    check_is_login() {
      if (window.localStorage.getItem('user_id') != null) {
        this.hasLogin = true
      }
      else {
        this.hasLogin = false
      }
      // this.$router.go(0)
    },
    myquestionnaire() {
      if (this.ishow != null) {
        this.$router.push('/mine')
      }
      else {
        this.$router.push('/login')
      }
    }
  },
  mounted() {
    this.check_is_login();
    this.user.username = window.localStorage.getItem('userName');
  },
  updated() {
    this.check_is_login();
    this.user.username = window.localStorage.getItem('userName');
    this.ishow = window.localStorage.getItem('user_id');
  },
  // create(){
  //   this.check_is_login();
  // }
  // created() {
  //   if (this.$store.getters.getUser.username) {
  //     this.user.username = this.$store.getters.getUser.username
  //     this.hasLogin = true
  //   }
  // }
}
</script>

<style scoped>
a {
  text-decoration: inherit;
}
.header_nav {
  position: fixed;
  z-index: 1500;
  width: 100%;
  height: 8vh;
  padding-right: 45px;
  background: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  top: 0;
}

#head-title {
  margin-left: 3vw;
  margin-right: 2vw;
  font-size: 3vh;
  font-family: YouYuan;
  font-weight: bold;
  color: #094299;
}
.header_nav > ul {
  margin: 0;
  list-style: none;
  display: flex;
  align-items: center;
}
.header_nav > ul > li * {
  display: inline-block;
  font-size: 1.1em;
  color: #333333;
  text-decoration: none;
  cursor: pointer;
  padding-right: 20px;
}

#h-home:hover,
.my:hover,
li :hover {
  color: #008fff;
}
.my {
  font-size: 1.1em;
  color: #333333;
  padding-left: 30px;
}
.dropdown {
  padding-right: 30px;
}
.img {
  height: 6vh;
  vertical-align: middle;
  padding-bottom: 8px;
}
#left {
  display: inline-flex;
  justify-items: stretch;
  align-items: center;
}
.logo {
  display: inline-block;
  height: 6vh;
  line-height: 6vh;
}
</style>