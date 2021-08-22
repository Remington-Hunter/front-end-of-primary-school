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
            <span class="question-seq"
              ><b>{{ index + 1 }}</b></span
            >
            <span class="text">{{ question.text }}</span>
            <span v-if="question.required" class="question-required">*</span>
            <el-tag v-if="question.type === 1">多选</el-tag>
          </div>
        </div>

        <div class="question-body ">
          <!-- 单选题 -->
          <div v-if="question.type === 0">
            <el-radio-group v-model="question.radio">
              <el-radio
                v-for="(item, index) in question.selectionList"
                :key="index"
                :label="index"
              >
                {{ item }}</el-radio
              >
            </el-radio-group>
          </div>
          <!-- 多选题 -->
          <div v-else-if="question.type === 1">
            <el-checkbox-group v-model="question.checkList">
              <el-checkbox
                v-for="(item, index) in question.selectionList"
                :key="index"
                :label="index"
                >{{ item }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
          <!-- 评分题 -->
          <div v-else-if="question.type === 3">
            <el-rate
              v-model="question.rating"
              :icon-classes="iconClasses"
              void-icon-class="icon-rate-face-off"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            ></el-rate>
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
      <div class="page-control">
        <el-button type="primary" id="btn" @click="submit">提交</el-button>
      </div>
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
    };
  },
  methods: {
    submit() {
      var x = {};
      x.questionnaireId = this.questionnaireId;
      var list = [];
      console.log(this.questionList.length);
      console.log(this.questionList)
      for (var i = 0; i < this.questionList.length; i++) {
        var z = {};
        var y = this.questionList[i];
        z.questionId = y.questionId;
        if (y.type === 0) {
          if (y.required) {
            if (y.radio === "") {
              alert("您有必选项未完成!");
              return
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
              return
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
        }
       else if (y.type === 3) {
            z.number = ""+y.rating;
            z.content ="";
        }
        else if(y.type === 2){
          if (y.required) {
            if (y.answer === "") {
              alert("您有必选项未完成!");
              return
            } else {
              z.number = "";
              z.content = y.answer;
            }
          } else {
            z.number = "";
            z.content = y.answer;
          }
          // console.log(z)
        }
        list.push(z)
      }
      x.answerDtoList=list
      axios({
        method: "post",
        url: "http://82.157.97.70/api/answer/submit_answer",
        headers:{
          "Content-Type":"application/json"
        },
        data: JSON.stringify(x),
      }).then((res) => {
        console.log(res);
      });
    },
  },
  created() {},
};
</script>

<style scoped>
#prev {
  width: 1000px;
  min-height: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}

.s-main {
  position: relative;
  padding: 80px 72px 20px;
  margin: 40px auto;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  overflow: hidden;
}

.header-title {
  text-align: center;
  font-size: 30px;
  word-break: break-word;
}
.header-subtitle {
  margin-top: 40px;
  font-size: 16px;
  word-break: break-word;
}
.question-head {
  margin-top: 45px;
}
.question-title {
  font-size: 18px;
  word-break: break-word;
}
.question-seq {
  display: block;
  margin-right: 8px;
  font-size: 18px;
  float: left;
}
.question-title .text {
  margin-right: 4px;
}
.question-body {
  padding-top: 10px;
}

.question-required {
  background-size: 100%;
  vertical-align: -2px;
  margin-right: 4px;
  color: rgba(218, 35, 25, 1);
}
.el-radio,
.el-checkbox,
.el-rate {
  display: block;
  margin-top: 8px;
  padding: 7px;
}
.page-control {
  text-align: center;
  padding: 50px 0;
}
.el-tag {
  padding: 0px 3px;
  height: 25px;
  line-height: 25px;
  font-size: 80%;
}
</style>
