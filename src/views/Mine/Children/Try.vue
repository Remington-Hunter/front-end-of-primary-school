<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <el-table
        :data="desserts"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
    >
      <el-table-column
          prop="name"
          label="问卷名称"
          sortable
          width="180">
      </el-table-column>
      <el-table-column
          prop="state"
          label="状态"
          width="180">
      </el-table-column>
      <el-table-column
          prop="id"
          label="ID"
          sortable>
      </el-table-column>
      <el-table-column
          prop="num"
          label="回收量"
          sortable>
      </el-table-column>
      <el-table-column
          prop="date"
          label="创建时间"
          sortable>
      </el-table-column>
      <el-table-column
          prop="date2"
          label="截止时间"
          sortable>
      </el-table-column>
      <el-table-column
          prop="address"
          label="操作">
      </el-table-column>
      <el-table-column
          prop="address"
          label="更多功能">
      </el-table-column>
    </el-table>
<!--    <v-data-table-->
<!--        :headers="headers"-->
<!--        :items="desserts"-->
<!--        :search="search"-->
<!--        :sort-by.sync="sortBy"-->
<!--        :sort-desc.sync="sortDesc"-->
<!--        class="elevation-1"-->
<!--    >-->
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="copyItem(item.id)">
          mdi-content-copy
        </v-icon>
        <v-icon small @click="deleteItem(item.id)"> mdi-delete-outline </v-icon>
      </template>
    <div class="text-center pt-2">
      <v-btn color="primary" class="mr-2" @click="toggleOrder"
      >切换排序顺序</v-btn>
      <v-btn color="primary" @click="nextSort">对下一列进行排序</v-btn>
    </div>
  </v-card>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      // sortBy: "date",
      // sortDesc: false,
      // search: "",
      // headers: [
      //   {
      //     text: "问卷名称",
      //     align: "start",
      //     value: "name",
      //   },
      //   { text: "状态", value: "state", sortable: false },
      //   { text: "ID", value: "id" },
      //   { text: "回收量", value: "num" },
      //   { text: "创建时间", value: "date" },
      //   // {text:'发布时间',value:'date1'},
      //   { text: "截止时间", value: "date2" },
      //   { text: "操作", value: "actions", sortable: false },
      //   { text: "更多功能" },
      // ],
      desserts: [
        // {
        //   name: "问卷1",
        //   state: 0,
        //   id: 123456,
        //   num: 2,
        //   date: "2020 - 8 - 1",
        //   // date1:'2020 - 8 - 2',
        //   date2: "2020 - 8 - 3",
        // },
        // {
        //   name: "问卷2",
        //   state: 1,
        //   id: 234567,
        //   num: 24,
        //   date: "2021 - 8 - 1",
        //   // date1:'2020 - 8 - 2',
        //   date2: "2020 - 8 - 4",
        // },
      ],
    };
  },
  methods: {
    toggleOrder() {
      this.sortDesc = !this.sortDesc;
    },
    nextSort() {
      let index = this.headers.findIndex((h) => h.value === this.sortBy);
      index = (index + 1) % this.headers.length;
      this.sortBy = this.headers[index].value;
    },
    deleteItem(item) {
      const index = item;
      console.log(index);
      // confirm("Are you sure you want to delete this item?")
      var Data = new FormData();
      Data.append('id', index)
      console.log(111)
      axios({
        url: "http://82.157.97.70/api/questionnaire/throw_to_trashcan",
        method: "post",
        data: Data,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        this.getItem();
      });
    },
    copyItem(item) {
      const index = item;
      var Data = new FormData();
      Data.append('id', index)
      axios({
        url: "http://82.157.97.70/api/questionnaire/copy_questionnaire",
        method: "post",
        data: Data,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
      }).then((res) => {
        // console.log(res);
        //  这里的思路应该是发送一个有关这个item的数据，数据库再加上一条,还要生成新的内容
        this.getItem();
      });
      //   复制问卷
    },
    getItem() {
      console.log(13123);
      axios({
        url: "http://82.157.97.70/api/questionnaire/get_questionnaire_list",
        method: "post",
        data: {},
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
      }).then((res) => {
        // console.log(res);
        this.desserts = [];
        for (let i = 0; i < res.data.data.length; i++) {
          var state = "";
          if (res.data.data[i].deleted) {
            continue;
          }
          if (res.data.data[i].preparing) {
            state = "准备中";
          } else if (res.data.data[i].using) {
            state = "已发布";
          }
          Date.prototype.Format = function (fmt) {
            // author: meizz
            var o = {
              "M+": this.getMonth() + 1, // 月份
              "d+": this.getDate(), // 日
              "h+": this.getHours(), // 小时
              "m+": this.getMinutes(), // 分
              "s+": this.getSeconds(), // 秒
              "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
              S: this.getMilliseconds(), // 毫秒
            };
            if (/(y+)/.test(fmt))
              fmt = fmt.replace(
                  RegExp.$1,
                  (this.getFullYear() + "").substr(4 - RegExp.$1.length)
              );
            for (var k in o)
              if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(
                    RegExp.$1,
                    RegExp.$1.length == 1
                        ? o[k]
                        : ("00" + o[k]).substr(("" + o[k]).length)
                );
            return fmt;
          };
          var time2 = new Date().Format("yyyy-MM-dd hh:mm:ss");
          var times = time2.split(" ");

          var time = times[0] + "T" + times[1] + "Z";
          if (
              res.data.data[i].endTime != null &&
              res.data.data[i].endTime < time
          ) {
            state = "已过期";
          }
          if (
              res.data.data[i].endTime != null &&
              res.data.data[i].startTime > time
          ) {
            state = "未开始";
          }
          if (res.data.data[i].stopping) {
            state = "已停用"
          }
          var data2 = res.data.data[i].endTime;
          if (data2 != null) {
            data2 = data2.replace("T", " ");
          }
          var data = {
            name: res.data.data[i].title,
            state: state,
            id: res.data.data[i].id,
            num: res.data.data[i].answerNum,
            date: res.data.data[i].createTime.replace("T", " "),
            date2: data2,
          };
          // console.log(data)
          this.desserts.push(data);
        }
        // 没写全之后再补
      });
    },
    formatter(row, column) {
      return row.address;
    },
  },
  mounted() {
    this.getItem();
  },
};
</script>

<style scoped>
.v-card {
  margin: 0 5%;
}
</style>