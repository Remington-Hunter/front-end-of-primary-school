<template>
  <div class="content">
    <div class="question">
      <div v-show="
        ismodify && (['单选题', '多选题','投票单选题','投票多选题'].includes(problem_type) )
      ">
        <div>{{ problem_type }}</div>
        <template>
          <div>
            <v-text-field
              label="请输入题目"
              :rules="[rules.required]"
              v-model="name"
            ></v-text-field>
            <v-text-field
              label="备注"
              v-model="instruction"
            ></v-text-field>
          </div>
        </template>
        <div class="required">
          是否必填：<el-switch v-model="must_write_select">
          </el-switch>
        </div>
        <div
          v-for="(item, index) in selection_list"
          :key="(item, index)"
        >
          <v-text-field
            :label="'选项' + (index + 1)"
            v-model="selection_list[index]"
          ></v-text-field>
          <v-btn @click="delete_item(index)">删除</v-btn>
        </div>
        <div>
          <el-button @click="add_selection"><i class="el-icon-plus"></i> 新建选项</el-button>
          <el-button
            @click="selectConfirm"
            :disabled="confirmstate"
          >确认</el-button>
          <el-button
            @click="cancel"
            v-show="cancel_button"
          >取消</el-button>
        </div>
      </div>

      <div v-show="
        ismodify && (problem_type === '填空题' || problem_type === '评分题')
      ">
        <div>{{ problem_type }}</div>
        <template>
          <div>
            <v-text-field
              label="请输入题目"
              v-model="name"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              label="备注"
              v-model="instruction"
            ></v-text-field>
          </div>
        </template>
        <div class="required">
          是否必填：<el-switch v-model="must_write_select">
          </el-switch>
        </div>
        <el-button
          @click="writeConfirm"
          :disabled="writeconfirmstate"
        >确认</el-button>
        <el-button
          @click="cancel"
          v-show="cancel_button"
        >取消</el-button>
      </div>

      <div v-show="
        ismodify && (problem_type === '报名题')
      ">
        <div>{{ problem_type }}</div>
        <template>
          <div>
            <v-text-field
              label="请输入题目"
              v-model="name"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              label="备注"
              v-model="instruction"
            ></v-text-field>
          </div>
        </template>
        <div class="required">
          是否必填：<el-switch v-model="must_write_select">
          </el-switch>
        </div>
        <div
          v-for="(item, index) in selection_list"
          :key="(item, index)"
        >
          <v-row>
            <v-col
              cols="12"
              sm="10"
            >
              <v-text-field
                :label="'选项' + (index + 1)"
                v-model="selection_list[index]"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="2"
            >
              <v-text-field
                label="名额设置"
                type=number
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
        <div>
          <el-button @click="add_selection"><i class="el-icon-plus"></i> 新建选项</el-button>
          <el-button
            @click="selectConfirm"
            :disabled="confirmstate"
          >确认</el-button>
          <el-button
            @click="cancel"
            v-show="cancel_button"
          >取消</el-button>
        </div>
      </div>

      <div v-show="!ismodify">
        <div class="question-seq">{{ problem_number }}.</div>
        <div class="text">{{ name }} <span
            v-if="must_write_select"
            class="question-required"
          >*</span></div>

        <div class="q-instruction">{{ instruction }}</div>
        <div
          v-if="problem_type === '填空题'"
          class="question-body"
        >
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="answer"
          >
          </el-input>
        </div>

        <div v-else-if="problem_type === '评分题'">
          <div class="text-left">
            <el-rate
              v-model="rating"
              :icon-classes="iconClasses"
              void-icon-class="icon-rate-face-off"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            >
            </el-rate>
          </div>
        </div>

        <div v-else-if="problem_type==='多选题' || problem_type==='投票多选题'">
          <div>
            <el-checkbox-group v-model="checkList">
              <el-checkbox
                v-for="(item, index) in selection_list"
                :key="(item, index)"
                :label="item"
              >
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

        <div v-else-if="problem_type==='单选题' || problem_type==='投票单选题'">
          <div
            v-for="(item, index) in selection_list"
            :key="(item, index)"
          >
            <template>
              <el-radio
                v-model="radio"
                :label="index"
              >{{ item }}</el-radio>
            </template>
          </div>
        </div>
      </div>

    </div>
    <el-button-group
      class='btn-group'
      v-show="!ismodify"
    >

      <el-button
        @click="
          ismodify = true;
          $emit('ismodifying');
        "
        size="small"
      >
        <v-icon small>mdi-pencil</v-icon>修改
      </el-button>
      <el-button
        @click="deleteProblem"
        size="small"
      >
        <v-icon small>mdi-trash-can-outline</v-icon>删除
      </el-button>
      <el-button
        @click="$emit('copy', problem_number)"
        size="small"
      >
        <v-icon small>mdi-content-copy</v-icon>复制
      </el-button>
      <el-button
        @click="$emit('upMove', problem_number)"
        size="small"
      >

        <v-icon small>mdi-arrow-up</v-icon>上移
      </el-button>

      <el-button
        @click="$emit('upMoveFirst', problem_number)"
        size="small"
      >
        <v-icon small>mdi-arrow-collapse-up</v-icon>上移到最前
      </el-button>
      <el-button
        @click="$emit('downMove', problem_number)"
        size="small"
      >
        <v-icon small>mdi-arrow-down</v-icon>下移
      </el-button>
      <el-button
        @click="$emit('downMoveLast', problem_number)"
        size="small"
      >
        <v-icon small>mdi-arrow-collapse-down</v-icon>下移到最后
      </el-button>

    </el-button-group>
  </div>
</template>

<script>
export default {
  name: "SingleSelect",
  props: {
    problem_type_copy: {
      type: String,
      default: "单选题"
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
      answer: "", //填空题答案
      rating: 0, //评分题答案
      cancel_button: true,
      must_write_select: false,
      items: ["是", "否"],
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
      has_exchanged: false,
      problem_type: this.problem_type_copy,
      rules: {
        required: value => !!value || '',
      }
    };
  },
  created() {
    console.log(this.problem_type_copy);
    console.log(this.problem_type);
  },
  computed: {
    confirmstate() {
      if (this.name === "" || this.selection_list.length === 0) {
        return true;
      }
      return false;
    },
    writeconfirmstate() {
      if (this.name === "") {
        return true;
      }
      return false;
    },
  },
  methods: {
    delete_item(index){
      console.log(index);
      this.selection_list.splice(index,1)
      console.log(this.selection_list);
    },
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
      this.ismodify = false;
      this.cancel_button = false;
      this.$emit("ConfirmProblem");
    },
    writeConfirm() {
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
    created() { },
  },
};
</script>

<style scoped>
@import "../assets/css/icon/preview.css";
.content {
  border-bottom: solid 2px #e6e6e6;
}
.content:hover {
  background-color: rgb(245, 245, 245);
}
.btn-group {
  float: right;
}
.question {
  padding: 20px 120px;
}
.required {
  margin-bottom: 15px;
}
</style>

<style lang="scss">
.content {
  .btn-group {
    display: none;
  }
  &:hover .btn-group {
    display: block;
  }
}
.el-checkbox__label {
  padding-left: 10px;
  line-height: 10px;
}
</style>

<style >
.el-input .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>

