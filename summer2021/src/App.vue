<template>
<div>
    <div>
      <LoginWindow style="z-index: 999">31231</LoginWindow>
    </div>
    
    <!-- <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app> -->
</div>
</template>

<script>
import LoginWindow from './components/LoginWindow'
export default {
  name: 'App',
  components:{
    LoginWindow,
  },
  data: () => ({
    //
  }),
  methods: {
    login() {
      // this.$store.commit('WANT_LOGIN')
    },

  },
};
</script>
<style scoped>
.ivu-menu-horizontal .ivu-menu-item[data-v-7ba5bd90], .ivu-menu-horizontal .ivu-menu-submenu[data-v-7ba5bd90] {
  color: #000;
}

.el-menu :hover {
  color: #488ce9 !important;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.ivu-badge-count{
  /*height: 10px;*/
}
</style>
