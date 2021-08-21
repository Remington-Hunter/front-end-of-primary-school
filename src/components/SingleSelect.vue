<template>
  <div>
    <div
      v-show="
        ismodify && (problem_type === '单选题' || problem_type === '多选题')
      "
    >
      <div>{{ problem_type }}</div>
      <template>
        <div>
          <v-text-field label="题目" v-model="name" style="font-size: small"></v-text-field>
          <v-text-field label="备注" v-model="instruction"></v-text-field>
        </div>
      </template>
        <v-row align="center">
          <v-col cols="12">
            <v-select
              :items="items"
              :menu-props="{ top: true, offsetY: true }"
              label="是否必填"
              v-model="must_write_select"
            ></v-select>
          </v-col>
        </v-row>
      <div v-for="(item, index) in selection_list" :key="(item, index)">
        <v-text-field
          :label="'选项' + (index + 1)"
          v-model="selection_list[index]"
        ></v-text-field>
      </div>
      <v-btn color="primary" @click="add_selection">新建选项</v-btn>
      <v-divider></v-divider>
      <v-btn color="primary" @click="selectConfirm">确认</v-btn>
      <v-btn color="primary" @click="cancel" v-show="cancel_button">取消</v-btn>
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
    <v-row align="center">
      <v-col cols="12">
        <v-select
          :items="items"
          :menu-props="{ top: true, offsetY: true }"
          label="是否必填"
          v-model="must_write_select"
        ></v-select>
      </v-col>
    </v-row>
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

    <div v-show="!ismodify" style="margin-left: 10%">
      <v-btn color="primary" @click="ismodify = true" small ><v-icon small>mdi-pencil</v-icon>修改</v-btn>
      <v-btn color="primary" @click="deleteProblem" style="margin-left: 1%" small>
        <v-icon small>mdi-trash-can-outline</v-icon>删除
      </v-btn>
      <v-btn color="primary" @click="$emit('upMove', problem_number)" style="margin-left: 1%" small
        ><v-icon small>mdi-arrow-up</v-icon>上移</v-btn
      >
      <v-btn color="primary" @click="$emit('upMoveFirst', problem_number)" style="margin-left: 1%" small
        ><v-icon small>mdi-arrow-collapse-up</v-icon>上移到最前</v-btn
      >
      <v-btn color="primary" @click="$emit('downMove', problem_number)" style="margin-left: 1%" small
        ><v-icon small>mdi-arrow-down</v-icon>下移</v-btn
      >
      <v-btn color="primary" @click="$emit('downMoveLast', problem_number)" style="margin-left: 1%;" small
        ><v-icon small>mdi-arrow-collapse-down</v-icon>下移到最后</v-btn
      >
      <v-btn color="primary" @click="$emit('copy', problem_number)" style="margin-left: 1%" small>
        <v-icon small>mdi-content-copy</v-icon>复制
      </v-btn>
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
    iscopy: {
      type: Boolean,
      default: false,
    },
    copy_info: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      ismodify: true,
      name: this.iscopy ? this.copy_info.name : "",
      instruction: this.iscopy ? this.copy_info.instruction : "",
      selection_list: this.iscopy
        ? this.copy_array(this.copy_info.selection_list)
        : [],
      radio: "1", //单选题答案
      checkList: [], //多选题答案
      answer: "输入你的答案", //填空题答案
      rating: 0, //评分题答案
      cancel_button: true,
      must_write_select: '',
      items: ['是','否'],
    };
  },
  methods: {
    copy_array(arr1) {
      var arr2 = [];
      for (var i = 0; i < arr1.length; i++) {
        arr2.push(arr1[i]);
      }
      return arr2;
    },
    add_selection() {
      this.selection_list.push("选项");
    },
    selectConfirm() {
      if (this.name === "" || this.selection_list.length === 0) {
        return;
      }
      this.ismodify = false;
      this.cancel_button = false;
      this.$emit("ConfirmProblem");
    },
    writeConfirm() {
      if (this.name === "") {
        return;
      }
      this.ismodify = false;
      this.cancel_button = false;
      this.$emit("ConfirmProblem");
    },
    cancel() {
      this.$emit("CancelNewProblem");
    },
    deleteProblem() {
      this.$emit("deleteProblem", this.problem_number);
    },
    created() {},
  },
};
</script>

<style scoped></style>
