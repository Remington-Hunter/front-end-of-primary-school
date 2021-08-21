<template>
  <div>
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
  </div>
</template>


<script>
export default {
  data() {
    return {
      dialogVisible:true,
      sortBy: 'date',
      sortDesc: false,
      user_id:window.localStorage.getItem('user_id'),
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
  mounted(){
    this.getItem()
  },
  methods: {
    

    getItem(){
      var Data=new FormData();
      Data.append('user_id',user_id);
      axiso({
        url:'',
        method:'post',
        data:Data
      }).then((res)=>{
        this.desserts=res.data;
      })
    },
    toggleOrder() {
      this.sortDesc = !this.sortDesc
    },
    nextSort() {
      let index = this.headers.findIndex(h => h.value === this.sortBy)
      index = (index + 1) % this.headers.length
      this.sortBy = this.headers[index].value
    },
    recoveryItem(item) {
      this.$confirm('此操作将恢复该问卷, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          const index = this.desserts.indexOf(item)
          // this.desserts.splice(index, 1)
          var Data=new FormData();
          Data.append('id',index);
          axios({
            url:'',
            method:'post',
            data:Data
          }).then((res)=>{
            console.log(res)
            this.getItem();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      // const index = this.desserts.indexOf(item)
      // confirm('您是否确定要恢复该问卷') && this.desserts.splice(index, 1)
    },
  },
}
</script>

<style scoped>
.v-card {
  margin: 0 5%;
}
</style>