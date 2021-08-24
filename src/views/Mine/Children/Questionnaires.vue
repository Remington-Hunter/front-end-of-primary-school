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
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          size="14px"
          class="mr-2"
          @click="copyItem(item.id)"
          title="复制"
        >
          mdi-content-copy
        </v-icon>
        <v-icon small @click="deleteItem(item.id)" title="删除">
          mdi-trash-can-outline</v-icon
        >
      </template>
      <template v-slot:[`item.actions1`]="{ item }">
        <v-icon
          size="14px"
          class="mr-2"
          @click="startItem(item.id)"
          title="发布"
        >
          mdi-arrow-right-drop-circle
        </v-icon>
        <v-icon
          size="14px"
          class="mr-2"
          @click="stopItem(item.id)"
          title="停止"
        >
          mdi-pause-circle
        </v-icon>
        <!--        <v-icon small @click="modifyItem_first(item.id)" title="修改第一种办法" > mdi-pencil-outline</v-icon>-->
        <!--   第二种方式-->
        <!--        <v-icon small @click="modifyItem_second(item.id)" title="修改第二种办法" > mdi-pencil-outline</v-icon>-->
        <!--   第三种方式-->
        <v-icon small @click="modifyItem_third(item.id)" title="修改">
          mdi-pencil-outline</v-icon
        >
        <v-icon
          small
          @click="lookUpLink(item.id)"
          title="查看链接"
          style="margin-left: 1%"
        >
          mdi-magnify</v-icon
        >
        <v-icon
          small
          @click="checkAnalysis(item.id)"
          title="统计结果"
          style="margin-left: 1%"
        >
          mdi-poll</v-icon
        >
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      sortBy: "date",
      sortDesc: true,
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
        { text: "创建/发布时间", value: "date" },
        // {text:'发布时间',value:'date1'},
        { text: "截止时间", value: "date2" },
        { text: "操作", value: "actions", sortable: false },
        { text: "更多功能", value: "actions1", sortable: false },
      ],
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
      data: [],
    };
  },
  methods: {
    lookUpLink(id) {
      this.$router.push({ name: "send", params: { id: id } });
    },
    checkAnalysis(id) {
      this.$router.push({ name: "crossanalysis", params: { id: id } });
    },
    now_date(date) {
      Date.prototype.Format = function(fmt) {
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
      var time = new Date().Format("yyyy-MM-dd hh:mm:ss");
      return time;
    },
    modifyItem_first(item) {
      var Data = new FormData();
      Data.append("id", item);
      axios({
        url: "http://82.157.97.70/api/questionnaire/edit_qusetionnaire",
        method: "post",
        data: Data,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        var type = "";
        for (var i = 0; i < this.desserts.length; i++) {
          if (this.desserts[i].id === item) {
            type = this.desserts[i].type;
          }
        }
        var index = 0;
        if (type === "普通问卷") {
          index = 0;
        } else if (type === "投票问卷") {
          index = 1;
        } else if (type === "报名问卷") {
          index = 2;
        }
        this.$router.push({
          path: "/edit1/" + index,
          query: {
            id: res.data.id,
            // types:index,}
          },
        });
      });
    },
    modifyItem_third(item) {
      var Data = new FormData();
      Data.append("id", item);
      axios({
        url:
          "http://82.157.97.70/api/questionnaire/throw_and_get_new_questionnaire",
        method: "post",
        data: Data,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        var type = "";
        var index = 0;
        if (type === "普通问卷") {
          index = 0;
        } else if (type === "投票问卷") {
          index = 1;
        } else if (type === "报名问卷") {
          index = 2;
        }
        this.$router.push({
          path: "/edit1/" + index,
          query: {
            id:res.data.data, 
            type:index},
        });
      });
    },
    modifyItem_second(item) {
      var Data = new FormData();
      Data.append("id", item);
      axios({
        url:
          "http://82.157.97.70/api/questionnaire/delete_and_get_questionnaire_by_id",
        method: "post",
        data: Data,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        var type = "";
        for (var i = 0; i < this.desserts.length; i++) {
          if (this.desserts[i].id === item) {
            type = this.desserts[i].type;
          }
        }
        var index = 0;
        if (type === "普通问卷") {
          index = 0;
        } else if (type === "投票问卷") {
          index = 1;
        } else if (type === "报名问卷") {
          index = 2;
        }
        this.$router.push({
          path: "/edit1/" + index,
          query: {
            id: res.data.id,
            types: index,
          },
        });
      });
    },
    startItem(item) {
      var Data = new FormData();
      Data.append("questionnaireId", item);
      axios({
        url: "http://82.157.97.70/api/questionnaire/publish_questionnaire",
        method: "post",
        data: Data,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        // this.getItem();
        for (var i = 0; i < this.desserts.length; i++) {
          if (this.desserts[i].id === item) {
            this.desserts[i].state = "已发布";
            var time = new Date();
            this.desserts[i].date = this.now_date(time);
          }
        }
      });
    },
    stopItem(item) {
      var Data = new FormData();
      Data.append("questionnaireId", item);
      axios({
        url: "http://82.157.97.70/api/questionnaire/stop_questionnaire",
        method: "post",
        data: Data,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        for (var i = 0; i < this.desserts.length; i++) {
          if (this.desserts[i].id === item) {
            this.desserts[i].state = "已停止";
          }
        }
      });
    },
    checkItem(item) {
      var Data = new FormData();
      Data.append("id", item);
      axios({
        url: "http://82.157.97.70/api/get_questionnaire_by_id",
        method: "post",
        data: Data,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
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
    deleteItem(item) {
      const index = item;
      console.log(index);
      // confirm("Are you sure you want to delete this item?")
      var Data = new FormData();
      Data.append("id", index);
      console.log(111);
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
        // this.$message({message:'问卷已移至回收站',type:'success'})
        if (res.data.code === 200 || res.data.code === 201) {
          this.$message({ message: "问卷已移至回收站", type: "success" });
        }
      });
    },
    copyItem(item) {
      const index = item;
      var Data = new FormData();
      Data.append("id", index);
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
        if (res.data.code === 200 || res.data.code === 201) {
          this.$message({ message: "复制成功", type: "success" });
        }
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
        console.log(res.data.data);
        this.data = res.data.data;
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
          Date.prototype.Format = function(fmt) {
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
            state = "已停用";
          }
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
          // this
        }
        // 没写全之后再补
      });
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
