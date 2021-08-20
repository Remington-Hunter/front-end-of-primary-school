<template>
  <div>
    <!-- <Header /> -->
    <div>
      <v-app>
        <router-view />
      </v-app>
    </div>

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
.ivu-menu-horizontal .ivu-menu-item[data-v-7ba5bd90],
.ivu-menu-horizontal .ivu-menu-submenu[data-v-7ba5bd90] {
  color: #000;
}

.el-menu :hover {
  color: #488ce9 !important;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
