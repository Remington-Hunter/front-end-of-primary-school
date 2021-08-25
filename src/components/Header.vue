<template>
  <div class="header-container">
    <div class="header_nav">
      <div id="left">
        <router-link
          to="/"
          id="head-title"
        >
          <v-icon color="blue darken-2">mdi-earth</v-icon> 问卷星球
        </router-link>
        <router-link
          to="/mine"
          id="my"
        >
          <v-icon color="blue darken-2">mdi-file-multiple-outline</v-icon> 我的问卷
        </router-link>
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
              <span>
                {{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link to="/personInfo">个人中心</router-link>
                </el-dropdown-item>
                <el-dropdown-item><a @click="logout">退出登录</a></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </div>
        <li
          v-if="$route.path != '/'"
          id="h-home"
        >
          <router-link to="/">
            <!-- <v-icon color="blue darken-2"> mdi-home-variant</v-icon>  -->
            返回首页
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
      user: {
        username: window.localStorage.getItem('userName'),
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        // avatar: 'http://101.200.164.148/assets/avatars/khKXwpT86OF3hj3K.png'
      },
      hasLogin: false
    }
  },
  methods: {
    logout() {
      window.localStorage.removeItem('user_id')
      window.localStorage.removeItem('authorization')
      window.localStorage.removeItem('userName')
      this.check_is_login();
    },
    check_is_login() {
      if (window.localStorage.getItem('user_id') != null) {
        this.hasLogin = true
      }
      else {
        this.hasLogin = false
      }
      // this.$router.go(0)
    }
  },
  mounted() {
    this.check_is_login();
  },
  updated() {
    this.check_is_login();
  },
  // create(){
  //   this.check_is_login();
  // }
  created() {
    if (this.$store.getters.getUser.username) {
      this.user.username = this.$store.getters.getUser.username
      this.hasLogin = true
    }
  }
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
  background: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  top: 0;
}

#head-title {
  margin-left: 1vw;
  font-size: 1.2em;
  color: #333333;
}
.header_nav > ul {
  margin: 0;
  list-style: none;
  display: flex;
  align-items: center;
}
.header_nav > ul > li * {
  display: inline-block;
  font-size: 1em;
  color: #333333;
  text-decoration: none;
  cursor: pointer;
  padding-right: 20px;
}
.header_nav > ul > li *:hover {
  color: #008fff;
}
#my {
  font-size: 1em;
  color: #333333;
  padding-left: 30px;
}
.dropdown {
  padding-right: 30px;
}
</style>