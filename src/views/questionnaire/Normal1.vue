<template>
  <div>
    <el-container style="height: 600px;">
      <el-aside
        width="200px"
        style="overflow-x:hidden;"
      >
        <!-- <el-button
          @click="copyQuestionnaireInfo();state12=true"
          :disabled="state12"
        >拷贝原内容</el-button> -->

        <el-dialog
          title="提示"
          :visible.sync="copyVisible"
          width="30%"
          :before-close="handleClose"
        >
          <span>该编辑操作将新建副本</span>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              type="primary"
              @click="copyVisible = false;copyQuestionnaireInfo();"
            >确 定</el-button>
          </span>
        </el-dialog>

        <el-menu :default-openeds="['1', '2']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>题目控件</template>
            <el-menu-item
              v-for="(item, index) in problem_list"
              :key="(item, index)"
              @click="newProblem(item.text, false, {})"
            >
              <v-icon>{{ item.icon }}</v-icon>
              {{ item.text }}
            </el-menu-item>
            <div v-if="type === 0">
              <el-menu-item
                v-for="(item, index) in problem_list0"
                :key="(item, index)"
                @click="newProblem(item.text, false, {})"
              >
                <v-icon>{{ item.icon }}</v-icon>
                {{ item.text }}
              </el-menu-item>
            </div>
            <div v-if="type === 1">
              <el-menu-item
                v-for="(item, index) in problem_list1"
                :key="(item, index)"
                @click="newProblem(item.text, false, {})"
              >
                <v-icon>{{ item.icon }}</v-icon>
                {{ item.text }}
              </el-menu-item>
            </div>

            <div v-if="type === 2">
              <el-menu-item
                v-for="(item, index) in problem_list2"
                :key="(item, index)"
                @click="newProblem(item.text, false, {})"
              >
                <v-icon>{{ item.icon }}</v-icon>
                {{ item.text }}
              </el-menu-item>
            </div>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-setting"></i>问卷设置</template>
            <el-menu-item @click="dialogTimeVisible = true">
              时间控制</el-menu-item>
            <div v-if="type === 1">
              <el-tooltip
                class="item"
                effect="dark"
                content="是否允许用户提交问卷后查看填写结果"
                placement="right"
              >
                <el-menu-item>
                  查看结果 <el-switch v-model="see_result"></el-switch>
                </el-menu-item>
              </el-tooltip>
            </div>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container
        style="border-left: solid 2px #e6e6e6;overflow-y:scroll;overflow-x:hidden;height:100%"
        id="demo"
      >
        <div style="min-width: -webkit-fill-available">
          <div
            @click="dialogFormVisible = true"
            style="cursor: pointer;"
            id="top"
          >
            <div class="header-title">{{ title }}</div>
            <div class="header-subtitle">{{ description }}</div>
            <p class="sub">编辑问卷标题和描述</p>
          </div>
          <el-dialog
            title="题目"
            :visible.sync="dialogFormVisible"
            center
          >
            <el-form>
              <el-form-item
                label="标题"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="title"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="描述"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="description"
                  autocomplete="off"
                  type="textarea"
                  autosize
                  placeholder="请输入描述"
                ></el-input>
              </el-form-item>
            </el-form>
            <div
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="dialogFormVisible = false"
              >确 定</el-button>
            </div>
          </el-dialog>

          <v-divider></v-divider>
          <div
            v-for="(item, index) in created_problem"
            :key="(item, index)"
          >
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
        </div>
      </el-container>
    </el-container>
    <el-dialog
      @close="send_question_parent()"
      :visible.sync="dialogTimeVisible"
      width="45%"
      center
    >
      <div class="timm">
        <el-row>
          开启控制<el-switch
            v-model="has_time"
            style="margin-left:20px"
            @change="send_question_parent()"
          ></el-switch>
        </el-row>
        <el-row>选择时间
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :disabled="!has_time"
            style="margin-left:20px"
          >
          </el-date-picker>
        </el-row>
      </div>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="
            dialogTimeVisible = false;
            send_question_parent();
          "
        >确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import "../../assets/css/icon/preview.css";
import SingleSelect from "../../components/SingleSelect";
import { problem_exchange, problem_change } from "../../utils/deepCopy";
import { dateFormat } from "../../utils/dateFormat";

export default {
  name: "Normal1",
  components: {
    SingleSelect,
  },
  props: {
    type: {
      type: Number,
      default: 0,
    },
    copy_questionnaire_info: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  //   ["type",
  //   "copy_questionnaire_info"
  //   ],
  data() {
    return {
      copyVisible: true,
      value1: [new Date(), new Date()],
      title: "",
      description:
        "",
      formLabelWidth: "100px",
      dialogFormVisible: false,
      dialogTimeVisible: false,
      question_id: "123",
      problem_list0: [
        { text: "单选题", icon: "mdi-radiobox-marked" },
        { text: "多选题", icon: "mdi-check-bold" },
      ],
      problem_list1: [
        { text: "投票单选题", icon: "mdi-radiobox-marked" },
        { text: "投票多选题", icon: "mdi-check-bold" },
      ],
      problem_list2: [
        { text: "报名单选题", icon: "mdi-radiobox-marked" },
        { text: "报名多选题", icon: "mdi-check-bold" },
      ],
      problem_list: [
        { text: "填空题", icon: "mdi-checkbox-blank-outline" },
        { text: "评分题", icon: "mdi-star-outline" },
      ],
      total_problem: 1,
      created_problem: [],
      is_creating: false,
      created_problem_list: [],
      start_time: new Date(),
      end_time: new Date(),
      has_time: false,
      see_result: false,
    };
  },
  methods: {
    copyQuestionnaireInfo() {
      this.title = this.copy_questionnaire_info.questionnaire.title
      this.description = this.copy_questionnaire_info.questionnaire.description
      var x = this.copy_questionnaire_info.questionList
      for (var i = 0; i < x.length; i++) {
        let item = {};
        item.type = this.problem_type_info(x[i].question.type);
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
        this.newProblem1(item.type, true, obj);
      }
    },
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
        item.required = x.must_write_select ? 1 : 0;
        item.point = 0;
        item.type = this.problem_type_number(x.problem_type);
        console.log(this.problem_type_number(x.problem_type));
        console.log(item.type);
        let y = [];
        for (var j = 0; j < x.selection_list.length; j++) {
          let z = {};
          z.content = x.selection_list[j].content;
          z.limit = x.selection_list[j].total;
          z.comment = x.selection_list[j].comment;
          z.number = j + "";
          y.push(z);
        }
        item.optionList = y;
        let y1 = [];
        if (item.type === 3) {
          for (var j = 0; j < 5; j++) {
            let z = {};
            z.number = j + "";
            y1.push(z);
          }
          item.optionList = y1;
        }
        this.created_problem_list.push(item);
      }

      var formData = {};
      console.log(this.has_time);
      if (this.has_time === true) {
        formData.startTime = dateFormat(this.value1[0]);
        formData.endTime = dateFormat(this.value1[1]);
        console.log(formData.startTime);
      }
      formData.description = this.description;
      formData.limit = -1;
      formData.title = this.title;
      formData.needNum = -1;
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
      console.log(1);
      var obj1 = {};
      var obj1 = {
        data: this.current_questionnaire(),
        is_creating: this.is_creating,
        total_problem: this.total_problem,
        preview_list: list,
        title: this.title,
        description: this.description,
        questionnaire_state: "preparing",
      };
      console.log(1);
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
    newProblem1(index, iscopy, copy_info) {
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
        case "报名单选题":
          return 6;
          break;
        case "报名多选题":
          return 7;
          break;
        case "投票单选题":
          return 10;
          break;
        case "投票多选题":
          return 11;
          break;
      }
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
    var interval = setInterval(() => {
      if (this.copy_questionnaire_info !== {}) {
        clearInterval(interval);
        console.log(this.copy_questionnaire_info);
        // this.title=this.copy_questionnaire_info.questionnaire.title
        // this.description=this.copy_questionnaire_info.questionnaire.description
        // for (var i = 0; i < x.length; i++) {
        //   let item = {};
        //   item.type = this.problem_type_info(x[i].question.type);
        //   var obj = {};
        //   obj.problem_type = this.problem_type_info(x[i].question.type);
        //   obj.name = x[i].question.content;
        //   obj.instruction = x[i].question.comment;
        //   obj.must_write_select = x[i].question.required;
        //   var list = [];
        //   console.log(x[i].optionList.length);
        //   for (var j = 0; j < x[i].optionList.length; j++) {
        //     var listitem = {};
        //     listitem.content = x[i].optionList[j].content;
        //     listitem.total = x[i].optionList[j].limit;
        //     listitem.comment = x[i].optionList[j].comment;
        //     list.push(listitem);
        //   }
        //   obj.selection_list = list;
        //   this.newProblem1(item.type, true, obj);
        // }
      }
    }, 1000);
    var x = this.copy_questionnaire_info.questionList;
  },
};
</script>

<style>
.v-application ul,
.v-application ol {
  padding-left: 0;
}
.v-application p {
  margin-bottom: 0;
}
.el-form-item__content {
  margin-right: 50px;
}
.el-dialog--center .el-dialog__body {
  padding: 30px 25px 0px;
}
.el-switch {
  padding-left: 10px;
}
</style>

<style scoped>
#top {
  padding: 20px 120px;
}
#top:hover {
  background-color: rgb(245, 245, 245);
}
.sub {
  color: lightgrey;
  padding-top: 10px;
}
.q-head {
  display: block;
}
.header-title {
  font-size: 22px;
}
.header-subtitle {
  margin-top: 20px;
}
.el-row {
  margin-bottom: 20px;
  padding-left: 50px;
}
</style>
