<template>
  <div>
    <v-card
      class="title"
      style="margin-right:10%;float:right;"
    >
      <span class="title_description">
        <v-dialog v-model="dialog_title">
          <template v-slot:activator="{ on, attrs }">
            <span
              dark
              v-bind="attrs"
              v-on="on"
              style="text-align: center;display:block;"
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
      <v-divider></v-divider>
      <div>
        <span class="title_description">
          <v-dialog v-model="dialog_describe">
            <template v-slot:activator="{ on, attrs }">
              <span
                dark
                v-bind="attrs"
                v-on="on"
                style="text-align: center;display:block;"
              >添加说明</span>
            </template>
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                修改问卷说明
              </v-card-title>

              <v-card-text>
                <template>
                  <v-text-field v-model="describe"> </v-text-field>
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
      <v-btn @click="getProblemInfo">获取所有题目信息</v-btn>
    </v-card>

    <div
      v-for="(item, index) in created_problem"
      :key="(item, index)"
    >
      <SingleSelect
        :class="'question'+ index"
        :problem_type="item"
        :problem_number="index + 1"
        @CancelNewProblem="
              created_problem.pop();
              is_creating = false;
            "
        @ConfirmProblem="is_creating = false"
        @deleteProblem="deleteProblem"
      ></SingleSelect>
    </div>
    <v-card class="topic_control">
      <v-card-title>
        题目控件
      </v-card-title>
      <div
        v-for="(item, index) in problem_list"
        :key="(item, index)"
      >
        <v-btn
          @click="newProblem(item.text, false,{})"
          style="margin-top:10%;"
        >
          <v-icon>{{ item.icon }}</v-icon>
          {{ item.text }}
        </v-btn>
      </div>
    </v-card>
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
      title: "添加标题",
      dialog_title: false,

      describe: "添加说明",
      dialog_describe: false,

      problem_list: [
        { text: "单选题", icon: "mdi-album" },
        { text: "多选题", icon: "mdi-check-bold" },
        { text: "填空题", icon: "mdi-alpha-i-box" },
        { text: "评分题", icon: "mdi-alpha-i-box" },
      ],

      created_problem: [],
      is_creating: false,
    };
  },
  methods: {
    changeTitle() {
      this.is_change_title = !this.is_change_title;
    },
    newProblem(index, iscopy, copy_info) {
      if (!this.is_creating) {
        let item = {};
        item.type = index;
        item.number = this.total_problem;
        item.iscopy = iscopy;
        item.copy_info = copy_info
        this.total_problem += 1;
        this.created_problem.push(item);
        this.is_creating = true;
      }
    },
    deleteProblem(index) {
      console.log(index);
      this.created_problem.splice(index - 1, 1)
    },
    getProblemInfo() {
      for (var i = 1; i < this.total_problem; i++) {
        let index = "question" + i;
        let x = this.$refs[index]["0"]; //组件的所有信息
        let item = {};
        item.problem_type = x.problem_type;
        item.problem_number = x.problem_number;
        item.name = x.name;
        item.instruction = x.instruction;
        item.selection_list = x.selection_list;
        item.radio = x.radio;
        item.checkList = x.checkList;
        item.answer = x.answer;
        item.rating = x.rating;
        console.log(item);
      }
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
      let y = {}
      problem_change(y, x);
      console.log(y);
      this.newProblem(x.problem_type, true, y);
      // this.is_creating = false;

      // let refnamelast = "question" + (this.total_problem - 1);
      // let y = this.$refs[refnamelast]["0"];
      // problem_change(y, x);
    },
  },
};
</script>

<style>
.title {
  width: 70%;
  height: 200%;
}

.title_description:hover {
  background-color: #f6f6f6;
}

.topic_control {
  width: 10%;
  height: 100%;
}
</style>
