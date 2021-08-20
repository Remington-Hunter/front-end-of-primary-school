<template>
  <v-card>
    <v-card-title>
      回收站
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          text
          color="primary"
          @click="recoveryItem(item)"
        >
          <v-icon small>
            mdi-restore
          </v-icon> <span style="padding-left:5px">恢复 </span>
        </v-btn>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-btn
        color="primary"
        class="mr-2"
        @click="toggleOrder"
      >切换排序顺序</v-btn>
      <v-btn
        color="primary"
        @click="nextSort"
      >对下一列进行排序</v-btn>
    </div>

  </v-card>
</template>


<script>
export default {
  data() {
    return {
      sortBy: 'date',
      sortDesc: false,
      search: '',
      headers: [
        {
          text: '问卷名称',
          align: 'start',
          value: 'name',
        },
        { text: '状态', value: 'state', sortable: false },
        { text: 'ID', value: 'id' },
        { text: '回收量', value: 'num' },
        { text: '创建时间', value: 'date' },
        { text: '操作', value: 'actions', sortable: false },
      ],
      desserts: [
        {
          name: '问卷1',
          state: 0,
          id: 123456,
          num: 2,
          date: '2020 - 8 - 1',
        },
        {
          name: '问卷2',
          state: 1,
          id: 234567,
          num: 24,
          date: '2021 - 8 - 1',
        },

      ],
    }
  },
  methods: {
    toggleOrder() {
      this.sortDesc = !this.sortDesc
    },
    nextSort() {
      let index = this.headers.findIndex(h => h.value === this.sortBy)
      index = (index + 1) % this.headers.length
      this.sortBy = this.headers[index].value
    },
    recoveryItem(item) {
      const index = this.desserts.indexOf(item)
      confirm('您是否确定要恢复该问卷') && this.desserts.splice(index, 1)
    },
  },
}
</script>

<style scoped>
.v-card {
  margin: 0 5%;
}
</style>