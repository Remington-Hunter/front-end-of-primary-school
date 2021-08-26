<template>
  <div>
    <v-card>
      <v-card-title>
        问卷列表
        <div id="select">
          <el-select
            v-model="type"
            multiple
            placeholder="筛选问卷类型"
            style="width:100%"
          >
            <el-option
              v-for="item in types"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>

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
        :sort-by="sortBy"
        :sort-desc="sortDesc"
        multi-sort
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            size="22px"
            color="info"
            class="mr-2"
            @click="copyItem(item.id)"
            title="复制"
          >
            mdi-content-copy
          </v-icon>
          <v-icon
            size="22px"
            @click="deleteItem(item.id)"
            title="删除"
            color="error"
          >
            mdi-trash-can-outline</v-icon>
        </template>
        <template v-slot:[`item.actions1`]="{ item }">
          <v-icon
            size="22px"
            class="mr-2"
            @click="startItem(item.id)"
            title="发布"
            color="green"
          >
            mdi-arrow-right-drop-circle
          </v-icon>
          <v-icon
            size="22px"
            class="mr-2"
            @click="stopItem(item.id)"
            title="停止"
            color="orange"
          >
            mdi-pause-circle
          </v-icon>
          <v-icon
            size="22px"
            @click="
              dialog = true;
              get_id(item.id);
            "
            title="修改"
            color="brown darken-1"
          >
            mdi-pencil-outline</v-icon>

          <!--          第一种方式-->
          <!--        <v-icon small @click="modifyItem_first(item.id)" title="修改第一种办法" > mdi-pencil-outline</v-icon>-->
          <!--   第二种方式-->
          <!--        <v-icon small @click="modifyItem_second(item.id)" title="修改第二种办法" > mdi-pencil-outline</v-icon>-->
          <!--   第三种方式-->
          <!--          <v-icon-->
          <!--            small-->
          <!--            @click="modifyItem_third(item.id)"-->
          <!--            title="修改"-->
          <!--          > mdi-pencil-outline</v-icon>-->
          <v-icon
            size="22px"
            @click="lookUpLink(item.id)"
            title="查看链接"
            color="blue darken-2"
            style="margin-left: 1%"
          >
            mdi-link-variant</v-icon>
          <v-icon
            size="22px"
            @click="checkAnalysis(item.id)"
            title="统计结果"
            style="margin-left: 1%"
            color="purple darken-2"
          >
            mdi-poll</v-icon>
          <v-icon
            size="22px"
            @click="checkItem(item.id)"
            title="预览"
            style="margin-left: 1%"
            color="teal darken-2"
          >
            mdi-eye-outline</v-icon>
        </template>
      </v-data-table>
    </v-card>
    <el-dialog
      :visible.sync="dialog"
      width="50%"
      height="max-content"
      class="modi"
      center
    >
      <div class="m-title">修改后可能会造成数据丢失，现提供以下三种方式</div>
      <div class="mdi-grp">
        <el-row>
          <el-col :span="8">
            <el-radio
              v-model="radio"
              label="1"
              border
            >
              <span class="altermode__pattern--name">保留答卷</span>
              <p class="explain">修改受限制</p>
            </el-radio>
          </el-col>
          <el-col :span="8">
            <el-radio
              v-model="radio"
              label="2"
              border
            >
              <span class="altermode__pattern--name">删除所有答卷</span>
              <p class="explain">修改不受限制</p>
            </el-radio>
          </el-col>
          <el-col :span="8">
            <el-radio
              v-model="radio"
              label="3"
              border
            >
              <span class="altermode__pattern--name">复制此问卷并去编辑</span>
              <p class="explain">原问卷不受任何影响</p>
            </el-radio>
          </el-col>
        </el-row>

        <div class="m-text">{{text[parseInt(this.radio) -1]}}</div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialog = false;handle_modify(questionnaire_id)"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible"
      width="60%"
    >
      <d-preview
        :headerTitle="this.title"
        :subtitle="this.description"
        :list="this.preview_list"
      ></d-preview>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import DPreview from "../../questionnaire/DialogPreview.vue";

export default {
  components: {
    DPreview,
  },
  data() {
    return {
      radio: "1",
      text: ["只能修改问卷的细节，例如更改错别字、添加选项、增加跳题逻辑或者修改题目的属性等\n不能对问卷做以下操作：删除题目或选项、移动题目或选项",
        "答卷删除后不可恢复，请谨慎选择", '复制一份题目完全一致的新问卷，对复制的问卷进行编辑，不会影响到原始问卷的题目及回收数据'],
      type: [],
      types: ['普通问卷', '投票问卷', '报名问卷', '考试问卷'],
      preview_list: [],
      questionnaire_id: "",
      title: "题目",
      description: "",
      sortBy: ['date'],
      sortDesc: [true],
      search: "",
      dialogVisible: false,
      dialog: false,
      headers: [
        {
          text: "问卷名称",
          align: "start",
          value: "name",
        },
        {
          text: "问卷类型",
          value: "type",
          sortable: false,
          filter: value => {
            if (this.type.length == 0) return true
            return this.type.includes(value)
          },
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
      desserts: [],
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
    get_id(id) {
      this.dialog = true;
      this.questionnaire_id = id;
    },
    now_date(date) {
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
      var time = new Date().Format("yyyy-MM-dd hh:mm:ss");
      return time;
    },

    handle_modify(item) {
      let index = this.radio
      if (index === "1") {
        this.modifyItem_first(item);
      }
      else if (index === "2") {
        this.modifyItem_second(item);
      }
      else if (index === "3") {
        this.modifyItem_third(item);
      }
    },
    modifyItem_first(item) {
      this.dialog = false;
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
          id: this.questionnaire_id,
          types: index,
          modify_type: 1,
        },
      });
    },
    modifyItem_third(item) {
      this.dialog = false;
      var Data = new FormData();
      Data.append("id", item);
      axios({
        url:
          "https://www.azur1tee.top/api/questionnaire/throw_and_get_new_questionnaire",
        method: "post",
        data: Data,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        var types = "";
        for (var i = 0; i < this.desserts.length; i++) {
          if (this.desserts[i].id === item) {
            types = this.desserts[i].type;
          }
        }
        var index = 0;
        if (types === "普通问卷") {
          index = 0;
        } else if (types === "投票问卷") {
          index = 1;
        } else if (types === "报名问卷") {
          index = 2;
        }
        this.$router.push({
          path: "/edit1/" + index,
          query: {
            id: res.data.data,
            type: index,
            modify_type: 3,
          },
        });
      });
    },
    modifyItem_second(item) {
      this.dialog = false;
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
          id: this.questionnaire_id,
          types: index,
          modify_type: 2,
        },
      });
    },
    startItem(item) {
      var Data = new FormData();
      Data.append("questionnaireId", item);
      axios({
        url: "https://www.azur1tee.top/api/questionnaire/publish_questionnaire",
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
        url: "https://www.azur1tee.top/api/questionnaire/stop_questionnaire",
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
        url:
          "https://www.azur1tee.top/api/questionnaire/get_questionnaire_by_id",
        method: "post",
        data: Data,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
      }).then((res) => {
        this.preview_list = [];
        let q = res.data.data;
        this.title = q.questionnaire.title;
        this.description = q.questionnaire.description;
        let x = q.questionList;
        for (var i = 0; i < x.length; i++) {
          var obj = {};
          obj.problem_type = this.problem_type_info(x[i].question.type);
          obj.name = x[i].question.content;
          obj.instruction = x[i].question.comment;
          obj.must_write_select = x[i].question.required;
          var list = [];
          for (var j = 0; j < x[i].optionList.length; j++) {
            var listitem = {};
            listitem.content = x[i].optionList[j].content;
            listitem.total = x[i].optionList[j].limit;
            listitem.comment = x[i].optionList[j].comment;
            list.push(listitem);
          }
          obj.selection_list = list;
          this.preview_list.push(obj);
        }
        this.dialogVisible = true;
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
        url: "https://www.azur1tee.top/api/questionnaire/throw_to_trashcan",
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
        url: "https://www.azur1tee.top/api/questionnaire/copy_questionnaire",
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
        url:
          "https://www.azur1tee.top/api/questionnaire/get_questionnaire_list",
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
            name:
              res.data.data[i].title.length > 10
                ? res.data.data[i].title.slice(0, 10) + "..."
                : res.data.data[i].title,
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
    problem_type_info(num) {
      switch (num) {
        case 0:
          return "单选题";
          break;
        case 1:
          return "多选题";
          break;
        case 2:
          return "填空题";
          break;
        case 3:
          return "评分题";
          break;
        case 6:
          return "报名单选题";
          break;
        case 7:
          return "报名多选题";
          break;
        case 10:
          return "投票单选题";
          break;
        case 11:
          return "投票多选题";
          break;
      }
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
#select {
  margin-top: 12px;
  margin-left: 30px;
  margin-right: 75px;
  width: 450px;
}
.m-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
.modi >>> .el-radio__inner {
  width: 14px;
  display: none;
}
.modi >>> .el-radio {
  height: max-content;
}
.el-col {
  padding: 10px;
}
.mdi-grp {
  margin: 0 auto;
  margin: 10px;
}

.altermode__pattern--name {
  color: #262626;
  font-size: 14px;
  font-weight: 600;
}
.explain {
  font-size: 12px;
  color: #8c8c8c;
  padding-left: 10px;
  padding-top: 5px;
  margin-bottom: 15px;
}
.m-text {
  white-space: pre;
  margin: 10px;
  padding: 15px;
  font-size: 13px;
  line-height: 24px;
  background-color: #f7f7f7;
  height: 78px;
}
</style>
