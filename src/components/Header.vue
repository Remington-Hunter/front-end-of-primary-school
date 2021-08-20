<template>
  <div class="header-container">
    <div class="header_nav">
      <router-link to="/">
        <p id="head-title">问卷星球</p>
      </router-link>
      <ul>
        <li>
          <router-link to="/mine">
            <v-icon color="blue darken-2">mdi-file-multiple-outline</v-icon> 我的问卷
          </router-link>
        </li>
        <li>
          <router-link to="/personInfo">
            <v-icon color="blue darken-2">mdi-account</v-icon> 个人中心
          </router-link>
        </li>
        <li v-if="$route.path != '/'">
          <router-link to="/">
            <v-icon color="blue darken-2"> mdi-home-variant</v-icon> 返回首页
          </router-link>
        </li>
        <li v-if="!hasLogin">
          <router-link to="/login"> 登录</router-link>
        </li>
        <li v-else>
          <a @click="logout">退出</a>
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
        username: '请先登录',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        // avatar: 'http://101.200.164.148/assets/avatars/khKXwpT86OF3hj3K.png'
      },
      hasLogin: false
    }
  },
  methods: {
    logout() {
      const _this = this
      _this.$axios.get("/logout", {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        _this.$store.commit("REMOVE_INFO")
        _this.$router.push("/login")
      })
    }
  },
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
  background: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  top: 0;
}

#head-title {
  margin-left: 3vw;
  font-size: 1.2em;
  color: #333333;
  margin-top: 3vh;
}
.header_nav > ul {
  margin: 0 2cm;
  list-style: none;
  display: flex;
  align-items: center;
}
.header_nav > ul > li * {
  display: inline-block;
  padding: 0 0 0.1em 1.5em;
  font-size: 1em;
  color: #333333;
  text-decoration: none;
  cursor: pointer;
}
.header_nav > ul > li *:hover {
  color: #008fff;
}
</style>