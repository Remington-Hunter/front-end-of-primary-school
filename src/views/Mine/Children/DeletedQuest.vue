<template>
  <div>
    <v-card>
      <v-card-title>
        回收站
        <v-spacer>
          <el-button
            @click="clearItem()"
            id="del-all"
            type="primary"
          > <i class="el-icon-delete"></i> 一键清空</el-button>
        </v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="搜索"
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
        <template v-slot:[`item.name`]="{ item }">
          <div style="max-width: 160px;overflow: hidden;text-overflow:ellipsis;white-space:nowrap;">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ item.name }}</span>
              </template>
              <span>{{ item.name }}</span>
            </v-tooltip>
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            @click="deleteItem(item.id)"
            title="删除"
          >
            mdi-trash-can-outline
          </v-icon>
          <v-btn
            text
            color="primary"
            @click="recoveryItem(item.id)"
          >
            <v-icon small> mdi-restore </v-icon>
            <span style="padding-left: 5px">恢复 </span>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dialogVisible: true,
      sortBy: "date",
      sortDesc: true,
      user_id: window.localStorage.getItem("user_id"),
      search: "",
      headers: [
        {
          text: "问卷名称",
          align: "start",
          value: "name",
        },
        {
          text: "问卷种类",
          value: "type",
          sortable: false,
        },
        { text: "状态", value: "state", sortable: false },
        { text: "ID", value: "id" },
        { text: "回收量", value: "num" },
        { text: "创建时间", value: "date" },
        { text: "截止时间", value: "date2" },
        { text: "操作", value: "actions", sortable: false },
      ],
      desserts: [
        // {
        //   name: "问卷1",
        //   state: 0,
        //   id: 123456,
        //   num: 2,
        //   date: "2020 - 8 - 1",
        //   date2: "2020 - 8 - 1",
        // },
        // {
        //   name: "问卷2",
        //   state: 1,
        //   id: 234567,
        //   num: 24,
        //   date: "2021 - 8 - 1",
        //   date2: "2020 - 8 - 1",
        // },
      ],
    };
  },
  mounted() {
    this.getItem();
  },
  methods: {
    clearItem() {
      this.$confirm("此操作将清空回收站, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "清空完成!",
          });
          console.log(111)
          axios({
            url: "https://www.azur1tee.top/api/questionnaire/clear_trashcan",
            method: "post",
            data: {},
            headers: {
              Authorization: window.localStorage.getItem("authorization"),
              "Content-Type": "application/json",
            },
          }).then((res) => {
            console.log(res);
            this.getItem();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消清空",
          });
        });
    },
    deleteItem(item) {
      this.$confirm("此操作将彻底删除该问卷, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          const index = item;
          // this.desserts.splice(index, 1)
          var Data = new FormData();
          Data.append("id", index);
          axios({
            url: "https://www.azur1tee.top/api/questionnaire/delete_questionnaire",
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getItem() {
      console.log(13123);
      axios({
        url: "https://www.azur1tee.top/api/questionnaire/get_questionnaire_list",
        method: "post",
        data: {},
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        this.desserts = [];
        for (let i = 0; i < res.data.data.length; i++) {
          var state = "已删除";
          if (res.data.data[i].deleted === 0) {
            continue;
          }
          // if (res.data.data[i].preparing) {
          //   state = "准备中";
          // } else if (res.data.data[i].using) {
          //   state = "已发布";
          // }
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
          // if (
          //   res.data.data[i].endTime != null &&
          //   res.data.data[i].endTime < time
          // ) {
          //   state = "已过期";
          // }
          // if (
          //   res.data.data[i].endTime != null &&
          //   res.data.data[i].startTime > time
          // ) {
          //   state = "未开始";
          // }
          // if (res.data.data[i].stopping) {
          //   state = "已停用";
          // }
          var data2 = res.data.data[i].endTime;
          if (data2 != null) {
            data2 = data2.replace("T", " ");
          }
          var questionnaire_type = "";
          if (res.data.data[i].type === 0) {
            questionnaire_type = "普通问卷";
          } else if (res.data.data[i].type === 1) {
            questionnaire_type = "投票问卷";
          } else if (res.data.data[i].type === 2) {
            questionnaire_type = "报名问卷";
          }else if(res.data.data[i].type===3){
            questionnaire_type = "考试问卷";
          }else if(res.data.data[i].type===4){
            questionnaire_type = "疫情打卡问卷"
          }

          var data = {
            name: res.data.data[i].title,
            type: questionnaire_type,
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
    toggleOrder() {
      this.sortDesc = !this.sortDesc;
    },
    nextSort() {
      let index = this.headers.findIndex((h) => h.value === this.sortBy);
      index = (index + 1) % this.headers.length;
      this.sortBy = this.headers[index].value;
    },
    recoveryItem(item) {
      this.$confirm("此操作将恢复该问卷, 是否继续?", "提示", {
        confirmButtonText: "确定",

        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "恢复成功!",
          });
          const index = item;
          // this.desserts.splice(index, 1)
          var Data = new FormData();
          Data.append("id", index);
          axios({
            url: "https://www.azur1tee.top/api/questionnaire/take_out_from_trashcan",
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消恢复",
          });
        });
      // const index = this.desserts.indexOf(item)
      // confirm('您是否确定要恢复该问卷') && this.desserts.splice(index, 1)
    },
  },
};
</script>

<style scoped>
.v-card {
  margin: 0 5%;
}
#del-all {
  margin-left: 5%;
}
</style>