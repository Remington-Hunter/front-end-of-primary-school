<template>
  <div>
    <div
      v-show="(problem_type === '单选题' || problem_type === '多选题')">
      <div>{{ problem_type }}</div>
      <template>
        <div>
          <v-text-field label="题目" v-model="name"></v-text-field>
          <v-text-field label="备注" v-model="instruction"></v-text-field>
        </div>
      </template>
      <v-divider></v-divider>
      <div v-for="(item, index) in selection_list" :key="(item, index)">
        <v-text-field
          :label="'选项' + (index + 1)"
          v-model="selection_list[index]"
        ></v-text-field>
      </div>
    </div>

    <div v-show="!ismodify && problem_type === '单选题'">
      <div>{{ problem_number }}.{{ name }}</div>
      <div>{{ instruction }}</div>
      <div v-for="(item, index) in selection_list" :key="(item, index)">
        <template>
          <el-radio v-model="radio" :label="index">{{ item }}</el-radio>
        </template>
      </div>
    </div>
    <div v-show="!ismodify && problem_type === '多选题'">
      <div>{{ problem_number }}.{{ name }}</div>
      <div>{{ instruction }}</div>
      <div>
        <el-checkbox-group v-model="checkList">
          <el-checkbox
            v-for="(item, index) in selection_list"
            :key="(item, index)"
            :label="item"
          ></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div
      v-show="
        ismodify && (problem_type === '填空题' || problem_type === '评分题')
      "
    >
      <div>{{ problem_type }}</div>
      <template>
        <div>
          <v-text-field label="题目" v-model="name"></v-text-field>
          <v-text-field label="备注" v-model="instruction"></v-text-field>
        </div>
      </template>
      <v-btn color="primary" @click="writeConfirm">确认</v-btn>
      <v-btn color="primary" @click="cancel" v-show="cancel_button">取消</v-btn>
    </div>

    <div v-show="!ismodify && problem_type === '填空题'">
      <div>{{ problem_number }}.{{ name }}</div>
      <div>{{ instruction }}</div>
      <v-text-field label="答案" v-model="answer"></v-text-field>
    </div>
    <div v-show="!ismodify && problem_type === '评分题'">
      <div>{{ problem_number }}.{{ name }}</div>
      <div>{{ instruction }}</div>
      <div class="text-left">
        <v-rating
          v-model="rating"
          background-color="purple lighten-3"
          large
        ></v-rating>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleSelect",
  props: {
    problem_type: {
      type: String,
      default: "单选题",
    },
    problem_number: {
      type: Number,
      default: 1,
    },
    selection_list:{
      // type:
    },
    instruction:{
      type:String,
    },
    checkList:{},
    answer:{
      type:String,
    }
  },
  data() {
    return {
      // ismodify: true,
      name: "Preview",
      instruction: "",
      
      radio: "1", //单选题答案
      checkList: [], //多选题答案
      answer: "输入你的答案", //填空题答案
      rating: 0, //评分题答案
      cancel_button: true,
    };
  },
  methods: {
    // add_selection() {
    //   this.selection_list.push("选项");
    // },
    // selectConfirm() {
    //   if (this.name === "" || this.selection_list.length === 0) {
    //     return;
    //   }
    //   this.ismodify = false;
    //   this.cancel_button=false;
    //   this.$emit("ConfirmProblem");
    // },
    // writeConfirm() {
    //   if (this.name === "") {
    //     return;
    //   }
    //   this.ismodify = false;
    //   this.cancel_button=false;
    //   this.$emit("ConfirmProblem");
    // },
    // cancel() {
    //   this.$emit("CancelNewProblem");
    // },
    // deleteProblem(){
    //     this.$emit("deleteProblem",this.problem_number)
    // }
  },
};
</script>

<style scoped></style>
