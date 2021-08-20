<template>
  <div>
    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant="miniVariant"
      :permanent="permanent"
      :width="170"
    >
      <v-list
        dense
        nav
        class="py-0"
      >
        <v-list-item
          two-line
          :class="miniVariant && 'px-0'"
        >
          <v-btn
            class="mx-2"
            color="primary"
            to="/Questionnaire_type"
          >
            <v-icon>mdi-plus</v-icon>新建问卷
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title @click="goTo(item.link)">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </div>
</template>

<script>
export default {

  data() {
    return {
      drawer: true,
      items: [
        { title: '个人问卷', icon: 'mdi-file-document-outline', link: 'mine' },
        { title: '回收站', icon: 'mdi-trash-can-outline', link: '/deleted' },
      ],
      permanent: true,
      miniVariant: false,
      background: false,
    }
  },
  methods:
  {
    goTo(path) {
      this.$router.replace(path);
    },

  }
}
</script>

<style scoped>
.v-navigation-drawer {
  margin-top: 8vh;
}
</style>