<template>
  <div class="s-content">
    <div class="question">

      <!-- 编辑状态选择题 -->
      <div v-show="
          ismodify &&
            [
              '单选题',
              '多选题',
              '投票单选题',
              '投票多选题',
              '报名单选题',
              '报名多选题',
              '考试单选题',
              '考试多选题',
            ].includes(problem_type)
        ">
        <div>
          <v-row>
            <v-col>{{ problem_type }}</v-col>
            <v-col
              cols="12"
              sm="4"
              v-if="
                problem_type === '考试单选题' || problem_type === '考试多选题'
              "
            >
              <!-- @change="handleChange" -->
              <div class="set-num">
                设置分数<el-input-number
                  controls-position="right"
                  :min="0"
                  :max="99999"
                  size="small"
                  v-model="point"
                ></el-input-number>
              </div>
            </v-col>
          </v-row>
        </div>
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
            <v-text-field
              label="请输入答案解析"
              :rules="[rules.required]"
              v-show="[
              '考试单选题',
              '考试多选题',
            ].includes(problem_type)"
              v-model="question_analysis"
            ></v-text-field>
          </div>
        </template>
        <div class="required">
          是否必填：<el-switch v-model="must_write_select"> </el-switch>
        </div>
        <div v-if="['考试单选题','考试多选题'].includes(problem_type)">
          <div class="required">
            是否设为普通题型(没有答案,分数)：<el-switch
              v-model="isnot_kaoshi"
              @change="typeChange"
            > </el-switch>
          </div>
        </div>
        <div
          v-for="(item, index) in selection_list"
          :key="(item, index)"
        >
          <v-row>
            <v-col
              cols="12"
              sm="8"
            >
              <v-text-field
                :label="'选项' + (index + 1)"
                v-model="selection_list[index].content"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              v-if="
                problem_type === '报名单选题' || problem_type === '报名多选题'
              "
            >
              <div class="set-num">
                设置名额<el-input-number
                  v-model="selection_list[index].total"
                  controls-position="right"
                  :min="1"
                  :max="99999"
                  size="small"
                ></el-input-number>
              </div>
            </v-col>
          </v-row>
          <v-text-field
            label="备注"
            v-model="selection_list[index].comment"
          ></v-text-field>
          <div class="del">
            <v-btn
              v-show="!modify_limit"
              @click="delete_item(index)"
              text
              color="primary"
              style="float: right;"
            >
              <v-icon>mdi-delete-outline</v-icon>删除选项
            </v-btn>
          </div>
        </div>
        <div>
          <el-button @click="add_selection"><i class="el-icon-plus"></i> 新建选项</el-button>
          <el-button
            @click="selectConfirm"
            :disabled="confirmstate"
          >确认</el-button>
          <el-button
            :disabled="modify_limit"
            @click="cancel"
            v-show="cancel_button"
          >取消</el-button>
        </div>
      </div>

      <!-- 编辑状态非选择题 -->
      <div v-show="
          ismodify && [
              '填空题',
              '评分题',
              '考试填空题',
              '定位题'
            ].includes(problem_type)
        ">
        <v-row>
          <v-col>{{ problem_type }}</v-col>
          <v-col
            cols="12"
            sm="4"
            v-if="
                problem_type === '考试填空题'
              "
          >
            <div class="set-num">
              设置分数<el-input-number
                controls-position="right"
                :min="0"
                :max="99999"
                size="small"
                v-model="point"
              ></el-input-number>
            </div>
          </v-col>
        </v-row>
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
            <v-text-field
              label="请输入答案"
              v-model="answer"
              v-show="problem_type === '考试填空题'"
            ></v-text-field>
            <v-text-field
              label="请输入答案解析"
              :rules="[rules.required]"
              v-show="problem_type === '考试填空题'"
              v-model="question_analysis"
            ></v-text-field>
          </div>
        </template>
        <div class="required">
          是否必填：<el-switch v-model="must_write_select"> </el-switch>
        </div>
        <div v-if="['考试填空题'].includes(problem_type)">
          <div class="required">
            是否设为普通题型(无答案,分数,答案解析)：<el-switch
              v-model="isnot_kaoshi"
              @change="typeChange"
            > </el-switch>
          </div>
        </div>
        <el-button
          @click="writeConfirm"
          :disabled="writeconfirmstate"
        >确认</el-button>
        <el-button
          :disabled="modify_limit"
          @click="cancel"
          v-show="cancel_button"
        >取消</el-button>
      </div>

      <!-- 非编辑状态 -->
      <div
        v-show="!ismodify"
        class="q-content"
      >
        <div class="question-seq">{{ problem_number }}.</div>
        <div class="text">
          {{ name }}
          <span
            v-if="['考试填空题','考试单选题','考试多选题'].includes(problem_type)"
            class="sel-total"
          >(分值:{{ point }})</span>
          <span
            v-if="must_write_select"
            class="question-required"
          >*</span>
        </div>

        <div class="q-instruction">{{ instruction }}</div>
        <div
          v-if="['填空题', '考试填空题'].includes(problem_type)"
          class="question-body"
        >
          <el-input
            @change="$emit('answer_confirm')"
            type="textarea"
            autosize
            placeholder="请输入答案"
            v-model="answer"
          >
          </el-input>
        </div>

        <div v-else-if="problem_type === '评分题'">
          <div class="rate">
            <el-rate
              @change="$emit('answer_confirm')"
              v-model="rating"
              :icon-classes="iconClasses"
              void-icon-class="icon-rate-face-off"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            >
            </el-rate>
          </div>
        </div>
        <!--        添加定位题-->
        <div v-else-if="problem_type === '定位题'">
          <div style="margin:10px 0">
            <v-btn
              block
              outlined
              disabled
              color="#C0C4CC"
            >
              <i
                class="el-icon-location-information"
                style="font-size:20px"
              ></i>点击获取地理位置
            </v-btn>
          </div>
        </div>

        <div v-else-if="
            ['多选题', '报名多选题', '投票多选题','考试多选题'].includes(problem_type)
          ">
          <div>
            <el-checkbox-group
              @change="$emit('answer_confirm')"
              v-model="checkList"
            >
              <el-checkbox
                v-for="(item, index) in selection_list"
                :key="(item, index)"
                :label="item.content"
              >{{ item.content }}
                <span
                  class="sel-total"
                  v-show="item.total"
                >(剩余{{ item.total }})</span>
                <div class="q-instruction">{{ item.comment }}</div>
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

        <div v-else-if="
            ['单选题', '投票单选题', '报名单选题','考试单选题'].includes(problem_type)
          ">
          <div
            v-for="(item, index) in selection_list"
            :key="(item, index)"
          >
            <el-radio
              @change="$emit('answer_confirm')"
              v-model="radio"
              :label="index"
              @click.native="clickitem()"
            >{{ item.content
              }}<span
                class="sel-total"
                v-show="item.total"
              >(剩余{{ item.total }})</span>
            </el-radio>
            <div class="q-instruction">{{ item.comment }}</div>
          </div>
        </div>
      </div>
    </div>
    <el-button-group
      class="btn-group"
      v-show="!ismodify"
    >
      <el-button
        v-show="!is_daka_two"
        @click="
          ismodify = true;
          $emit('ismodifying');
        "
        size="small"
      >
        <v-icon small>mdi-pencil</v-icon>修改
      </el-button>
      <el-button
        v-show="!modify_limit && !is_daka_two"
        @click="deleteProblem"
        size="small"
      >
        <v-icon small>mdi-trash-can-outline</v-icon>删除
      </el-button>
      <el-button
        @click="$emit('copy', problem_number)"
        size="small"
      >
        <v-icon small>mdi-content-copy</v-icon>复制{{id_daka_two}}
      </el-button>
      <el-button
        v-show="!modify_limit && !upmove_limit && !is_daka_two"
        @click="$emit('upMove', {problem_number:problem_number,is_daka:is_daka})"
        size="small"
      >
        <v-icon small>mdi-arrow-up</v-icon>上移
      </el-button>

      <el-button
        v-show="!modify_limit && !upmove_limit && !is_daka_two"
        @click="$emit('upMoveFirst', {problem_number:problem_number,is_daka:is_daka})"
        size="small"
      >
        <v-icon small>mdi-arrow-collapse-up</v-icon>上移到最前
      </el-button>
      <el-button
        v-show="!modify_limit && !is_daka_two"
        @click="$emit('downMove', problem_number)"
        size="small"
      >
        <v-icon small>mdi-arrow-down</v-icon>下移
      </el-button>
      <el-button
        v-show="!modify_limit && !is_daka_two"
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
      ismodify: this.iscopy ? (this.copy_info.ismodify === undefined ? true : this.copy_info.ismodify) : true,
      name: this.iscopy ? this.copy_info.name : "",
      instruction: this.iscopy ? this.copy_info.instruction : "",
      selection_list: this.iscopy
        ? this.copy_array(this.copy_info.selection_list)
        : [],
      preradio: "",
      radio: "1", //单选题答案
      checkList: [], //多选题答案
      answer: "", //填空题答案
      rating: 0, //评分题答案
      cancel_button: true,
      must_write_select: this.iscopy ? this.copy_info.must_write_select : false,
      items: ["是", "否"],
      iconClasses: ["icon-rate-face-1", "icon-rate-face-2", "icon-rate-face-3"],
      has_exchanged: false,
      problem_type: this.problem_type_copy,
      rules: {
        required: (value) => !!value || "",
      },
      modify_limit: this.iscopy
        ? this.copy_info.modify_limit === undefined
          ? false
          : true
        : false,
      question_id: this.iscopy
        ? this.copy_info.question_id === undefined
          ? undefined
          : this.copy_info.question_id
        : undefined,
      question_analysis: this.iscopy ? this.copy_info.question_analysis : "",
      point: this.iscopy ? this.copy_info.point : 0,
      isnot_kaoshi:false,
      upmove_limit: this.copy_info.upmove_limit === undefined?false:true,
      is_daka_two:this.copy_info.is_daka_two === undefined?false:true,
      is_daka:this.copy_info.is_daka === undefined?false:true,
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
    typeChange() {
      console.log(this.isnot_kaoshi);
      if (this.isnot_kaoshi === true) {
        switch (this.problem_type) {
          case '考试填空题':
            this.problem_type = '填空题'
            break
          case '考试单选题':
            this.problem_type = '单选题'
            break
          case '考试多选题':
            this.problem_type = '多选题'
            break
        }
      }
    },
    clickitem() {
      if (this.radio === this.preradio) {
        this.radio = ""
      }
      this.preradio = this.radio
    },
    delete_item(index) {
      this.selection_list.splice(index, 1);
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
      let sel = {};
      sel.content = "";
      this.selection_list.push(sel);
    },
    selectConfirm() {
      this.ismodify = false;
      this.cancel_button = false;
      this.iscopy = false
      this.$emit("ConfirmProblem");
    },
    writeConfirm() {
      this.ismodify = false;
      this.cancel_button = false;
      this.iscopy = false
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
.s-content {
  display: flex;
  padding-top: 15px;
  flex-direction: column;
  border-bottom: solid 2px #e6e6e6;
}
.s-content:hover {
  background-color: rgb(245, 245, 245);
}
.btn-group {
  margin-bottom: -36px;
  align-self: flex-end;
}
.question {
  padding: 20px 120px;
}
.required {
  margin-bottom: 15px;
}

.del {
  margin-bottom: 15px;
  height: 35px;
}
.set-num {
  margin-top: 20px;
}
.el-input-number {
  padding-left: 20px;
}
.q-content {
  white-space: pre-line;
  word-wrap: break-word;
  overflow: hidden;
}
.rate {
  padding-bottom: 15px;
}
</style>

<style lang="scss">
.s-content {
  .btn-group {
    display: none;
  }
  &:hover .btn-group {
    display: block;
  }
}
.el-checkbox__label {
  padding-left: 10px;
}
</style>
