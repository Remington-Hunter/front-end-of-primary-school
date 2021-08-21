<template>
  <v-card>
    <v-card-title>
      问卷列表
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
      :items-per-page="5"
      :page="page"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="copyItem(item)"
        >
          mdi-content-copy
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete-outline
        </v-icon>
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
import axios from 'axios'
export default {
  data() {
    return {
      sortBy: 'date',
      sortDesc: false,
      search: '',
      page:1,
      pageSize:10,
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
        {text:'发布时间',value:'date1'},
        { text: '操作', value: 'actions', sortable: false },
        { text: '更多功能' },
      ],
      desserts: [
        {
          name: '问卷1',
          state: 0,
          id: 123456,
          num: 2,
          date: '2020 - 8 - 1',
          date1:'2020 - 8 - 2',
        },
        {
          name: '问卷2',
          state: 1,
          id: 234567,
          num: 24,
          date: '2021 - 8 - 1',
          date1:'2020 - 8 - 2',
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
    deleteItem(item) {
      const index = this.desserts.indexOf(item)
      console.log(index)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      var Data=FormData();
      Data.append('id',index)
      axios({
        url:'',
        method:'',
        data:{
          'id':index
        }
      }).then((res)=>{
       console.log(res);
       this.getItem(); 
      })
    },
    copyItem(item) {
      const index = this.desserts.indexOf(item)
      // var Data=FormData();
      // name: '问卷2',
      //     state: 1,
      //     id: 234567,
      //     num: 24,
      //     date: '2021 - 8 - 1',
      var name1=item.name+'副本';
      var state1=item.state;
      var num1=item.num;
      var date1=new Date()
      // Data.append('name',name1);
      // Data.append('state',state1);
      // Data.append('num',num1);
      // Data.append('date',date1)
      axios({
        url:'',
        method:'',
        data:{
          'name':name1,
          'state':state1,
          'num':num1,
          'date':date1
        },
        headers:{
          'Authorization':window.localStorage.getItem('authorization')
        }
      }).then((res)=>{
       console.log(res);
      //  这里的思路应该是发送一个有关这个item的数据，数据库再加上一条,还要生成新的内容
       this.getItem(); 
      })
      //   复制问卷
    },
    getItem(){
      // var Data=new FormData()
      // Data.append('user_id',window.localStorage.getItem('user_id'))
      // Data.append('page',this.page)
      // Data.append('pageSize',this.pageSize)
      axios({
        url:'',
        method:'post',
        data:{
          'user_id':window.localStorage.getItem('user_id')
        },
        headers:{
          'Authorization':window.localStorage.getItem('authorization')
        }
      }).then((res)=>{
        this.desserts=res.data
        // 没写全之后再补
      })
    }
  },
  mounted(){
    this.getItem()
  }
}
</script>

<style scoped>
.v-card {
  margin: 0 5%;
}
</style>