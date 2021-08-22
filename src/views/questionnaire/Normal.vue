<template>
  <div>
    <el-container style="height: 600px;">
      <el-aside width="200px">
        <el-menu :default-openeds="['1']">
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

          </el-submenu>

        </el-menu>
      </el-aside>

      <el-container style="border-left: solid 2px #e6e6e6;overflow-y:scroll;overflow-x:hidden;height:100%">
        <div>
          <div
            @click="dialogFormVisible = true"
            style="cursor: pointer;"
            id="top"
          >
            <div class="header-title">{{title}}</div>
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
              :problem_type="item.type"
              :problem_number="item.number"
              :copy_info="item.copy_info"
              @CancelNewProblem="
              created_problem.pop();
              is_creating = false;
              total_problem -= 1;
              total_problem_change();
            "
              @ConfirmProblem="is_creating = false;
            total_problem_change();
            send_question_parent();
            "
              @deleteProblem="deleteProblem"
              @upMove="upMove"
              @upMoveFirst="upMoveFirst"
              @downMove="downMove"
              @downMoveLast="downMoveLast"
              @copy="copy"
              @ismodifying="is_creating = true;total_problem_change();"
            ></SingleSelect>
          </div>

        </div>
      </el-container>
    </el-container>
  </div>
</template>



<script>
import "../../assets/css/icon/preview.css"
import SingleSelect from "../../components/SingleSelect";
import { problem_exchange, problem_change } from "../../utils/deepCopy";

export default {
  name: "NormalQuestion",
  components: {
    SingleSelect,
  },
  data() {
    return {
      title: "题目",
      description: "为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！",
      formLabelWidth: '100px',
      dialogFormVisible: false,
      question_id: "123",
      problem_list: [
        { text: "单选题", icon: "mdi-radiobox-marked" },
        { text: "多选题", icon: "mdi-check-bold" },
        { text: "填空题", icon: "mdi-checkbox-blank-outline" },
        { text: "评分题", icon: "mdi-star-outline" },
      ],
      total_problem: 1,
      created_problem: [],
      is_creating: false,
      created_problem_list: [],
    }
  },
  methods: {
    current_questionnaire() {
      this.created_problem_list = []
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
      // alert(time);
      formData.description = this.description;
      formData.endTime = time;
      formData.limit = -1;
      formData.title = this.title;
      formData.needNum = -1;
      formData.startTime = time;
      formData.userId = window.localStorage.getItem("user_id");
      formData.questionList = this.created_problem_list;
      return formData
    },
    send_question_parent() {
      if (this.is_creating === true || this.total_problem === 1) { return }
      var list = []
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
      }
      var obj1 = {}
      var obj1 = {
        data: this.current_questionnaire(),
        is_creating: this.is_creating,
        total_problem: this.total_problem,
        preview_list: list,
        title: this.title,
        description: this.description,
      }
      this.$emit("currentQuestionnaire", obj1)
    },
    total_problem_change() {
      if (this.is_creating === true) {
        this.$emit('problem_change', false)
        return
      }
      else {
        if (this.total_problem === 1) {
          this.$emit('problem_change', false)
        }
        else {
          this.$emit('problem_change', true)
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
          return 8;
          break;
      }
    },
  },
};
</script>

<style >
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
</style>