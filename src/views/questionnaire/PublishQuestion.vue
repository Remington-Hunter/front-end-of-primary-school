<template>
  <div id="prev">
    <div class="s-main ">
      <!-- 问卷标题 -->
      <div class="header-title">{{ headerTitle }}</div>
      <!-- 问卷副标题 -->
      <div class="header-subtitle">{{ subtitle }}</div>
      <!-- 题目列表 -->
      <div
        class="question-list"
        v-for="(question, index) in questionList"
        :key="index"
      >
        <!-- 题目标题 -->
        <div class="question-head ">
          <div class="question-title">
            <span class="question-seq"><b>{{ index + 1 }}</b></span>
            <span class="text">{{ question.text }}</span>
            <span
              v-if="question.required"
              class="question-required"
            >*</span>
            <el-tag v-if="[1,4,7,11].includes(question.type)">多选</el-tag>
          </div>
          <div class="q-instruction">{{ question.comment }}</div>
        </div>

        <div class="question-body ">
          <!-- 单选题 -->
          <div v-if="[0,6,10].includes(question.type)">
            <el-radio-group v-model="question.radio">
              <el-radio
                v-for="(item, index) in question.selectionList"
                :key="index"
                :label="index"
              >
                {{ item.content }}
                <div class="q-instruction">{{ item.comment }}</div>
              </el-radio>
            </el-radio-group>
          </div>
          <!-- 多选题 -->
          <div v-else-if="[1,4,7,11].includes(question.type)">
            <el-checkbox-group v-model="question.checkList">
              <el-checkbox
                v-for="(item, index) in question.selectionList"
                :key="index"
                :label="index"
              >{{ item.content }} <span
                  class="sel-total"
                  v-show="item.total"
                >(剩余{{item.total}})</span>
                <span class="q-instruction">{{ item.comment }}</span>
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <!-- 评分题 -->
          <div v-else-if="question.type === 3">
            <el-rate
              v-model="
            question.rating"
              :icon-classes="iconClasses"
              void-icon-class="icon-rate-face-off"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            >
            </el-rate>
          </div>
          <!-- 填空题 -->
          <div v-else-if="question.type === 2">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="question.answer"
            >
            </el-input>
          </div>
        </div>
      </div>
      <!-- <div class="page-control">
        <el-button type="primary" id="btn" @click="submit" :disabled="state"
          >提交</el-button
        >
      </div> -->
      <div class="page-control">
        <el-button
          type="text"
          @click="dialogVisible = true"
          :disabled="state"
        >提交</el-button>
      </div>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>提交后不能够更改,确定提交?</span>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="primary"
            @click="dialogVisible = false;submit()"
          >确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PublishQuestion",
  props: {
    headerTitle: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      defalut: "",
    },
    questionList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    questionnaireId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      iconClasses: ["icon-rate-face-1", "icon-rate-face-2", "icon-rate-face-3"],
      state: false,
      dialogVisible: false,
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => { });
    },
    submit() {
      var x = {};
      x.questionnaireId = this.questionnaireId;
      var list = [];
      console.log(this.questionList.length);
      console.log(this.questionList);
      for (var i = 0; i < this.questionList.length; i++) {
        var z = {};
        var y = this.questionList[i];
        z.questionId = y.questionId;
        if (y.type === 0) {
          if (y.required) {
            if (y.radio === "") {
              alert("您有必选项未完成!");
              return;
            } else {
              z.number = y.radio + "";
              z.content = "";
            }
          } else {
            z.number = y.radio + "";
            z.content = "";
          }
        } else if (y.type === 1) {
          if (y.required) {
            if (y.checkList.length === 0) {
              alert("您有必选项未完成!");
              return;
            } else {
              z.number = "";
              for (var j = 0; j < y.checkList.length; j++) {
                z.number += y.checkList[j];
              }
              z.content = "";
            }
          } else {
            z.number = "";
            for (var k = 0; k < y.checkList.length; k++) {
              z.number += y.checkList[k];
            }
            z.content = "";
          }
        } else if (y.type === 3) {
          z.number = "" + y.rating;
          z.content = "";
        } else if (y.type === 2) {
          if (y.required) {
            if (y.answer === "") {
              alert("您有必选项未完成!");
              return;
            } else {
              z.number = "";
              z.content = y.answer;
            }
          } else {
            z.number = "";
            z.content = y.answer;
          }
        } else if (y.type === 3) {
          z.number = "" + y.rating;
          z.content = "";
        }
        list.push(z);
      }
      x.answerDtoList = list;
      console.log(JSON.stringify(x));
      axios({
        method: "post",
        url: "http://82.157.97.70/api/answer/submit_answer",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(x),
      }).then((res) => {
        alert(res.data.message)
        console.log(res);
        this.state = true;
      });
    },
  },
  created() { },
};
</script>

<style scoped>
@import "../../assets/css/icon/preview.css";
#prev {
  width: 1000px;
  min-height: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}
</style>
