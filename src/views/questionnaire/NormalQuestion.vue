<template>
  <div>
    <div style="padding: 10px">
      <!-- <el-button type="primary" @click="handleWindowPrint( '#demo', '离职申请表' )">浏览器方式下载</el-button> -->
    </div>
    <div>
      <v-card class="title" style="margin-right: 10%; float: right" id="demo">
        <span class="title_description">
          <v-dialog v-model="dialog_title">
            <template v-slot:activator="{ on, attrs }">
              <span
                dark
                v-bind="attrs"
                v-on="on"
                style="text-align: center; display: block"
                >{{ title }}</span
              >
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
                <v-btn color="primary" text @click="dialog_title = false">
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
                  >添加说明</span
                >
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
                  <v-btn color="primary" text @click="dialog_describe = false">
                    确认
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </span>
        </div>
        <v-divider></v-divider>
        <div v-for="(item, index) in created_problem" :key="(item, index)">
          <SingleSelect
            :ref="'question' + item.number"
            :id="'question' + item.number"
            :iscopy="item.iscopy"
            :problem_type_copy="item.type"
            :problem_number="item.number"
            :copy_info="item.copy_info"
            @CancelNewProblem="
              created_problem.pop();
              is_creating = false;
              total_problem -= 1;
              total_problem_change();
            "
            @ConfirmProblem="
              is_creating = false;
              total_problem_change();
              send_question_parent();
            "
            @deleteProblem="deleteProblem"
            @upMove="upMove"
            @upMoveFirst="upMoveFirst"
            @downMove="downMove"
            @downMoveLast="downMoveLast"
            @copy="copy"
            @ismodifying="
              is_creating = true;
              total_problem_change();
            "
          ></SingleSelect>
        </div>
      </v-card>
      <v-card class="topic_control">
        <v-card-title> 题目控件 </v-card-title>
        <div v-for="(item, index) in problem_list" :key="(item, index)">
          <v-btn
            @click="newProblem(item.text, false, {})"
            style="margin-top: 10%"
          >
            <v-icon>{{ item.icon }}</v-icon>
            {{ item.text }}
          </v-btn>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import SingleSelect from "../../components/SingleSelect";
import { problem_exchange, problem_change } from "../../utils/deepCopy";

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
    current_questionnaire() {
      this.created_problem_list = [];
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
      // alert(time);
      formData.description = this.description;
      formData.endTime = time;
      formData.limit = -1;
      formData.title = this.title;
      formData.needNum = -1;
      formData.startTime = time;
      formData.userId = window.localStorage.getItem("user_id");
      formData.questionList = this.created_problem_list;
      return formData;
    },
    send_question_parent() {
      if (this.is_creating === true || this.total_problem === 1) {
        return;
      }
      var list = [];
      for (var i = 1; i < this.total_problem; i++) {
        let index = "question" + i;
        let x = this.$refs[index]["0"]; //组件的所有信息
        let item = {};
        item.problem_type = x.problem_type; //问题种类
        item.problem_number = x.problem_number; //问题题号
        item.name = x.name; //题目名字
        item.instruction = x.instruction; //题目备注
        item.selection_list = x.selection_list; //选择选项列表
        item.radio = x.radio; //单选题答案
        item.checkList = x.checkList; //多选题答案列表
        item.answer = x.answer; //填空答案
        item.rating = x.rating; //评分分数
        item.must_write_select = x.must_write_select; //题目是否必选
        list.push(item);
      }
      var obj1 = {};
      var obj1 = {
        data: this.current_questionnaire(),
        is_creating: this.is_creating,
        total_problem: this.total_problem,
        preview_list: list,
        title: this.title,
        description: this.description,
      };
      this.$emit("currentQuestionnaire", obj1);
    },
    total_problem_change() {
      if (this.is_creating === true) {
        this.$emit("problem_change", false);
        return;
      } else {
        if (this.total_problem === 1) {
          this.$emit("problem_change", false);
        } else {
          this.$emit("problem_change", true);
        }
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    changeTitle() {
      this.is_change_title = !this.is_change_title;
    },
    newProblem(index, iscopy, copy_info) {
      for (var i = 1; i < this.total_problem; i++) {
        let refname = "question" + i;
        console.log(this.$refs[refname]["0"]);
      }

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
        this.total_problem_change();
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
      this.total_problem_change();
      this.send_question_parent();
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
      this.send_question_parent();
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
      this.send_question_parent();
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
      this.send_question_parent();
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
      this.send_question_parent();
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
          return 3;
          break;
      }
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
