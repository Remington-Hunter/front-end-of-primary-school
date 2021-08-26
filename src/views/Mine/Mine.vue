<template>
  <div>
    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant="miniVariant"
      :width="170"
    >
      <v-list
        dense
        nav
        class="py-0"
      >
        <v-list-item>
          <v-btn
            class="btn"
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

    <v-main style="margin:30px 0">
      <questionnaire v-if="path===1" />
      <dele v-else />
    </v-main>
  </div>
</template>

<script>
import questionnaire from "./Children/Questionnaires.vue"
import dele from "./Children/DeletedQuest.vue"
export default {
  components: {
    dele,
    questionnaire
  },
  data() {
    return {
      path: 1,
      drawer: true,
      items: [
        { title: '个人问卷', icon: 'mdi-file-document-outline', link: 1 },
        { title: '回收站', icon: 'mdi-trash-can-outline', link: 2 },
      ],
      permanent: true,
      miniVariant: false,
      background: false,
    }
  },
  methods:
  {
    goTo(path) {
      this.path = path;
    },

  }
}
</script>

<style scoped>
.v-navigation-drawer {
  margin-top: 8vh;
}
.btn {
  margin-top: 25px;
  margin-bottom: 10px;
}
</style>