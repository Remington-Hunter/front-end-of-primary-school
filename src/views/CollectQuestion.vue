<template>
  <div>
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
              <el-tag v-if="[1, 4, 7, 11].includes(question.type)">多选</el-tag>
            </div>
            <div class="q-instruction">{{ question.comment }}</div>
          </div>

          <div class="question-body ">
            <!-- 单选题 -->
            <div v-if="[0, 6, 10].includes(question.type)">
              <el-radio-group v-model="question.radio">
                <el-radio
                  v-for="(item, index) in question.selectionList"
                  :key="index"
                  :label="index"
                >
                  {{ item.content }}
                  <span
                    class="sel-total"
                    v-show="item.total >= 0 && question.type === 6"
                    >(剩余{{ item.total }})</span
                  >
                  <div class="q-instruction">{{ item.comment }}</div>
                </el-radio>
              </el-radio-group>
            </div>
            <!-- 多选题 -->
            <div v-else-if="[1, 4, 7, 11].includes(question.type)">
              <el-checkbox-group v-model="question.checkList">
                <el-checkbox
                  v-for="(item, index) in question.selectionList"
                  :key="index"
                  :label="index"
                  >{{ item.content }}
                  <span
                    class="sel-total"
                    v-show="item.total >= 0 && question.type === 7"
                    >(剩余{{ item.total }})</span
                  >
                  <span class="q-instruction">{{ item.comment }}</span>
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <!-- 评分题 -->
            <div v-else-if="question.type === 3">
              <el-rate
                v-model="question.rating"
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
          <el-button type="text" @click="dialogVisible = true" :disabled="state"
            >提交</el-button
          >
        </div>

        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <span>提交后不能够更改,确定提交?</span>
          <span slot="footer" class="dialog-footer">
            <el-button
              type="primary"
              @click="
                dialogVisible = false;
                submit();
              "
              >确 定</el-button
            >
            <el-button @click="dialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <!-- <PublishQuestion
      :headerTitle="headerTitle"
      :subtitle="subtitle"
      :questionList="questionList"
      :questionnaireId="current_questionnaire.questionnaire.id"
      @endAnswer="end=true"
      v-show="can_write_state"
    /> -->
    <!-- <div  type="primary" style="text-align: center;display: block" @click="send_Info()"><el-button big>提交</el-button></div> -->
    <div v-show="!can_write_state">不在填写时间内</div>
  </div>
</template>

<script>
import axios from "axios";
import PublishQuestion from "./questionnaire/PublishQuestion.vue";
import { dateFormat } from "../utils/dateFormat";
export default {
  name: "CollectQuestion",
  components: {
    PublishQuestion,
  },
  data() {
    return {
      iconClasses: ["icon-rate-face-1", "icon-rate-face-2", "icon-rate-face-3"],
      state: false,
      dialogVisible: false,

      ma: this.$route.params.ma,
      current_questionnaire: { questionnaire: { id: 0 } },
      headerTitle: "社交网站满意度问卷",
      subtitle:
        "为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！",
      questionList: [],
      can_write_state: true,
      end: false,
    };
  },
  methods: {
    showInfo1() {
      console.log(this.questionList);
      var list = this.current_questionnaire.questionList;
      for (var i = 0; i < list.length; i++) {
        var y = list[i];
        for (var j = 0; j < y.optionList.length; j++) {
          this.questionList[i].selectionList[j].total =
            y.optionList[j].limit - y.optionList[j].answerNum;
          // console.log(this.questionList[i].optionList[j].total);
          // x.selectionList.push(y.optionList[j].content);
        }
      }
    },
    getInfo1() {
      var formData = new FormData();
      formData.append("md5", this.ma);
      axios({
        method: "post",
        url: "http://82.157.97.70/api/questionnaire/get_questionnaire",
        data: formData,
      }).then((res) => {
        console.log(res.data.data);
        this.current_questionnaire = res.data.data;
        if (
          this.current_questionnaire.questionnaire.startTime === null ||
          this.current_questionnaire.questionnaire.startTime === null
        ) {
          this.can_write_state = true;
        } else {
          if (
            dateFormat(new Date()) >=
              this.current_questionnaire.questionnaire.startTime &&
            dateFormat(new Date()) <=
              this.current_questionnaire.questionnaire.endTime
          ) {
            this.can_write_state = true;
          } else {
            this.can_write_state = false;
          }
        }
        this.showInfo1();
      });
    },
    showInfo() {
      this.questionList = [];
      console.log(this.current_questionnaire);
      this.headerTitle = this.current_questionnaire.questionnaire.title;
      this.subtitle = this.current_questionnaire.description;
      // this.type = this.current_questionnaire.questionnaire.type;
      var list = this.current_questionnaire.questionList;
      for (var i = 0; i < list.length; i++) {
        let x = {};
        var y = list[i];
        x.type = y.question.type;
        x.text = y.question.content;
        x.selectionList = [];
        for (var j = 0; j < y.optionList.length; j++) {
          let z = {};
          console.log(y.optionList[j]);
          z.comment = y.optionList[j].comment;
          z.total = y.optionList[j].limit - y.optionList[j].answerNum;
          z.content = y.optionList[j].content;
          x.selectionList.push(z);
          // x.selectionList.push(y.optionList[j].content);
        }
        console.log(x.selectionList);
        x.required = y.question.required;
        x.radio = "";
        (x.checkList = []),
          (x.answer = ""),
          (x.rating = 0),
          (x.comment = y.question.comment);
        x.questionId = y.question.id;
        this.questionList.push(x);
      }
    },
    getInfo() {
      var formData = new FormData();
      formData.append("md5", this.ma);
      axios({
        method: "post",
        url: "http://82.157.97.70/api/questionnaire/get_questionnaire",
        data: formData,
      }).then((res) => {
        console.log(res);
        console.log(res.data.data);
        this.type=res.data.data.questionnaire.type
        this.current_questionnaire = res.data.data;
        console.log(dateFormat(new Date()));
        if (
          this.current_questionnaire.questionnaire.startTime === null ||
          this.current_questionnaire.questionnaire.startTime === null
        ) {
          this.can_write_state = true;
        } else {
          if (
            dateFormat(new Date()) >=
              this.current_questionnaire.questionnaire.startTime &&
            dateFormat(new Date()) <=
              this.current_questionnaire.questionnaire.endTime
          ) {
            this.can_write_state = true;
          } else {
            this.can_write_state = false;
          }
        }
        this.showInfo();
      });
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    submit() {
      var x = {};
      x.questionnaireId = this.current_questionnaire.questionnaire.id;
      var list = [];
      console.log(this.questionList.length);
      console.log(this.questionList);
      for (var i = 0; i < this.questionList.length; i++) {
        var z = {};
        var y = this.questionList[i];
        z.questionId = y.questionId;
        if (y.type === 0 || y.type === 6 || y.type === 10) {
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
        } else if (y.type === 1 || y.type === 7) {
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
        this.end = true;
        console.log(res.data.message);
        alert(res.data.message);
        console.log(res);
        this.state = true;
      });
    },
  },
  // send_Info() {
  //   var formData = {};
  //   formData.questionnaireID = 1;

  //   axios({
  //     method: "post",
  //     url: "http://82.157.97.70/api/answer/submit_answer",
  //     data: formData,
  //   }).then((res) => {
  //     console.log(res.data.data);

  //   });
  // },
  created() {
    this.getInfo();
    console.log(this.type);
    // console.log(this.current_questionnaire);
    //   var interval = setInterval(() => {
    //     this.getInfo1();
    //     if (this.end) {
    //       clearInterval(interval);
    //     }
    //     //do whatever here..
    //   }, 5000);
  },
};
</script>

<style>
.el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #0095ff;
  border: 1px solid #dcdfe6;
  color: #fff;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}

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
