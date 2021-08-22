<template>
  <div>
    <div style="padding: 10px">
      <el-button
        type="primary"
        @click="handleDown"
      >PDF下载-离职申请表</el-button>
      <!-- <el-button type="primary" @click="handleWindowPrint( '#demo', '离职申请表' )">浏览器方式下载</el-button> -->
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-back"
        @click="goBack"
      >返回
      </el-button>
    </div>
    <div>
      <v-card
        class="title"
        style="margin-right: 10%; float: right"
        id="demo"
      >
        <span class="title_description">
          <v-dialog v-model="dialog_title">
            <template v-slot:activator="{ on, attrs }">
              <span
                dark
                v-bind="attrs"
                v-on="on"
                style="text-align: center; display: block"
              >{{ title }}</span>
            </template>
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                修改标题
              </v-card-title>

              <v-card-text>
                <template>
                  <v-text-field v-model="title"> </v-text-field>
                </template>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  @click="dialog_title = false"
                >
                  确认
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </span>

        <div>
          <span class="title_description">
            <v-dialog v-model="dialog_describe">
              <template v-slot:activator="{ on, attrs }">
                <span
                  dark
                  v-bind="attrs"
                  v-on="on"
                  style="text-align: center; display: block;font-size: small"
                >添加说明</span>
              </template>
              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  修改问卷说明
                </v-card-title>

                <v-card-text>
                  <template>
                    <v-text-field v-model="description"> </v-text-field>
                  </template>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="dialog_describe = false"
                  >
                    确认
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </span>
        </div>
        <v-divider></v-divider>
        <div
          v-for="(item, index) in created_problem"
          :key="(item, index)"
        >
          <SingleSelect
            :ref="'question' + item.number"
            :id="'question' + item.number"
            :iscopy="item.iscopy"
            :problem_type="item.type"
            :problem_number="item.number"
            :copy_info="item.copy_info"
            @CancelNewProblem="
              created_problem.pop();
              is_creating = false;
              total_problem -= 1;
            "
            @ConfirmProblem="is_creating = false"
            @deleteProblem="deleteProblem"
            @upMove="upMove"
            @upMoveFirst="upMoveFirst"
            @downMove="downMove"
            @downMoveLast="downMoveLast"
            @copy="copy"
          ></SingleSelect>
        </div>
        <v-btn @click="getProblemInfo">预览</v-btn>
      </v-card>
      <v-card class="topic_control">
        <v-card-title> 题目控件 </v-card-title>
        <div
          v-for="(item, index) in problem_list"
          :key="(item, index)"
        >
          <v-btn
            @click="newProblem(item.text, false, {})"
            style="margin-top: 10%"
          >
            <v-icon>{{ item.icon }}</v-icon>
            {{ item.text }}
          </v-btn>
        </div>
      </v-card>

      <v-btn @click="saveQues">保存新建的问卷</v-btn>
      <v-btn @click="sendQues">发布问卷</v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SingleSelect from "../../components/SingleSelect";
import { problem_exchange, problem_change } from "../../utils/deepCopy";

import htmlToPdf from "@/assets/js/htmlToPdf";
import QuestionnairePreview from "@/components/QuestionnairePreview";
export default {
  name: "NormalQuestion",
  components: {
    SingleSelect,
  },
  data() {
    return {
      isPreview: true,
      question_id: "123",
      title: "添加标题",
      dialog_title: false,
      description: "添加说明",
      dialog_describe: false,
      problem_list: [
        { text: "单选题", icon: "mdi-album" },
        { text: "多选题", icon: "mdi-check-bold" },
        { text: "填空题", icon: "mdi-alpha-i-box" },
        { text: "评分题", icon: "mdi-alpha-i-box" },
      ],
      total_problem: 1,
      created_problem: [],
      is_creating: false,
      created_problem_list: [],
    };
  },
  methods: {
    sendQues(){
      if(this.is_creating === true || this.total_problem === 1) {return}
      for (var i = 1; i < this.total_problem; i++) {
        let index = "question" + i;
        let x = this.$refs[index]["0"]; //组件的所有信息
        let item = {};
        // item.problem_type = x.problem_type;
        item.number = x.problem_number;
        item.content = x.name;
        item.comment = x.instruction;
        // item.selection_list = x.selection_list;
        item.answer = "";
        item.required = x.must_write_select === "是" ? 1 : 0;
        item.point = 0;
        item.type = this.problem_type_number(x.problem_type);
        let y = [];
        for (var j = 0; j < x.selection_list.length; j++) {
          let z = {};
          z.content = x.selection_list[j];
          z.limit = -1;
          z.number = j + "";
          y.push(z);
        }
        item.optionList = y;
        this.created_problem_list.push(item);
      }

      //var formData = new FormData();
      var formData = {};
      // var date=new Date();
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

      var time = times[0] + 'T' + times[1] + 'Z';
      alert(time);
      formData.description = this.description;
      formData.endTime = time;
      formData.limit = -1;
      formData.title = this.title;
      formData.needNum = -1;
      formData.startTime = time;
      formData.userId = window.localStorage.getItem("user_id");
      formData.questionList = this.created_problem_list;
      axios({
        method: "post",
        url: "http://82.157.97.70/api/questionnaire/publish_questionnaire",
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
        data: JSON.stringify(formData),
      }).then((res) => {
        console.log(res);
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    handleDown() {
      htmlToPdf.downloadPDF(document.querySelector("#demo"), "我的问卷");
    },
    changeTitle() {
      this.is_change_title = !this.is_change_title;
    },
    newProblem(index, iscopy, copy_info) {
      if (!this.is_creating) {
        let item = {};
        item.type = index;
        item.number = this.total_problem;
        item.iscopy = iscopy;
        item.copy_info = copy_info;
        console.log(item);
        this.total_problem += 1;
        this.created_problem.push(item);
        this.is_creating = true;
      }
    },
    deleteProblem(index) {
      document.getElementById("question" + index).remove();
      for (var i = 0; i < this.created_problem.length; i++) {
        if (this.created_problem[i].number > index) {
          this.created_problem[i].number -= 1;
        }
      }
      this.total_problem -= 1;
    },
    getProblemInfo() {
      if(this.is_creating === true || this.total_problem === 1) {return}
      var list=[]
      for (var i = 1; i < this.total_problem; i++) {
        let index = "question" + i;
        let x = this.$refs[index]["0"]; //组件的所有信息
        let item = {};
        item.problem_type = x.problem_type;//问题种类
        item.problem_number = x.problem_number;//问题题号
        item.name = x.name;//题目名字
        item.instruction = x.instruction;//题目备注
        item.selection_list = x.selection_list;//选择选项列表
        item.radio = x.radio;//单选题答案
        item.checkList = x.checkList;//多选题答案列表
        item.answer = x.answer;//填空答案
        item.rating = x.rating;//评分分数
        item.must_write_select = x.must_write_select;//题目是否必选
        list.push(item)
        console.log(item);
      }
      this.$router.push({
        path: '/preview', 
        query: {
          list:JSON.stringify(list),
          title:this.title,
          description:this.description
        }})
      console.log(list);
    },
    upMove(index) {
      if (index === 1) {
        return;
      }
      let refnamebefore = "question" + (index - 1);
      let refname = "question" + index;
      let x = this.$refs[refname]["0"];
      let y = this.$refs[refnamebefore]["0"];
      problem_exchange(x, y);
    },
    upMoveFirst(index) {
      if (index === 1) {
        return;
      }
      let refnamebefore = "question" + 1;
      let refname = "question" + index;
      let x = this.$refs[refname]["0"];
      let y = this.$refs[refnamebefore]["0"];
      problem_exchange(x, y);
    },
    downMove(index) {
      if (index === this.total_problem - 1) {
        return;
      }
      let refnameafter = "question" + (index + 1);
      let refname = "question" + index;
      let x = this.$refs[refname]["0"];
      let y = this.$refs[refnameafter]["0"];
      problem_exchange(x, y);
    },
    downMoveLast(index) {
      if (index === this.total_problem - 1) {
        return;
      }
      let refnameafter = "question" + (this.total_problem - 1);
      let refname = "question" + index;
      let x = this.$refs[refname]["0"];
      let y = this.$refs[refnameafter]["0"];
      problem_exchange(x, y);
    },
    copy(index) {
      let refname = "question" + index;
      let x = this.$refs[refname]["0"];
      console.log(x);
      let y = {};
      problem_change(y, x);
      console.log(y);
      this.newProblem(x.problem_type, true, y);
      // this.is_creating = false;

      // let refnamelast = "question" + (this.total_problem - 1);
      // let y = this.$refs[refnamelast]["0"];
      // problem_change(y, x);
    },
    problem_type_number(str) {
      switch (str) {
        case "单选题":
          return 0;
          break;
        case "多选题":
          return 1;
          break;
        case "填空题":
          return 2;
          break;
        case "评分题":
          return 8;
          break;
      }
    },
    saveQues() {
      if(this.is_creating === true || this.total_problem === 1) {return}
      for (var i = 1; i < this.total_problem; i++) {
        let index = "question" + i;
        let x = this.$refs[index]["0"]; //组件的所有信息
        let item = {};
        // item.problem_type = x.problem_type;
        item.number = x.problem_number;
        item.content = x.name;
        item.comment = x.instruction;
        // item.selection_list = x.selection_list;
        item.answer = "";
        item.required = x.must_write_select === "是" ? 1 : 0;
        item.point = 0;
        item.type = this.problem_type_number(x.problem_type);
        let y = [];
        for (var j = 0; j < x.selection_list.length; j++) {
          let z = {};
          z.content = x.selection_list[j];
          z.limit = -1;
          z.number = j + "";
          y.push(z);
        }
        item.optionList = y;
        this.created_problem_list.push(item);
      }

      //var formData = new FormData();
      var formData = {};
      // var date=new Date();
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

      var time = times[0] + 'T' + times[1] + 'Z';
      alert(time);
      formData.description = this.description;
      formData.endTime = time;
      formData.limit = -1;
      formData.title = this.title;
      formData.needNum = -1;
      formData.startTime = time;
      formData.userId = window.localStorage.getItem("user_id");
      formData.questionList = this.created_problem_list;
      axios({
        method: "post",
        url: "http://82.157.97.70/api/questionnaire/save_questionnaire",
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
        data: JSON.stringify(formData),
      }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style scoped>
.title {
  width: 70%;
  height: 200% !important;
}

.title_description:hover {
  background-color: #f6f6f6;
}

.topic_control {
  width: 10%;
  height: 100%;
}
</style>
