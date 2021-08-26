<template>
  <div id="app">
    <v-app>
      <Header v-show="!this.$route.path.includes('vj/')" />
      <div id="main">

        <router-view />

      </div>
    </v-app>
  </div>
</template>

<script>

import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
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
#app {
  background-color: #f4f6f9;
}
#main {
  margin-top: 8vh;
}
</style>

<style>
.v-select__selections {
  min-height: 20px;
}
</style>
