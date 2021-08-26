<template>
  <div id="c-top">
    <div v-show="can_write_state">
      <div class="skin-header">
        <img
          src="../assets/background_1.png"
          class="background-image"
          alt="皮肤背景图"
        />
      </div>
      <div v-show="state && this.type === 1 && this.can_see_result">
        <VoteAnswer
          :headerTitle="headerTitle"
          :subtitle="subtitle"
          :questionList="questionList_vote"
        />
        <!-- :questionList="questionList_vote" -->
      </div>
      <div id="pre" v-show="!(state && this.type === 1 && this.can_see_result)">
        <div v-if="state">
          <success></success>
        </div>
        <div class="s-main " v-else>
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
                <span v-if="question.required" class="question-required"
                  >*</span
                >
                <el-tag v-if="[1, 4, 7, 11].includes(question.type)"
                  >多选</el-tag
                >
              </div>
              <div class="q-instruction">{{ question.comment }}</div>
            </div>

            <div class="question-body ">
              <!-- 单选题 -->
              <!-- @click.native.prevent="clickitem(question, index)" -->
              <div v-if="[0, 6, 10].includes(question.type)">
                <el-radio-group v-model="question.radio">
                  <el-radio
                    v-for="(item, index) in question.selectionList"
                    :key="index"
                    :label="index"
                    @click.native="clickitem(question)"
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
            <el-button type="text" @click="dialogVisible = judge()"
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
      <div class="c-foot"><span>系统由问卷星球提供</span></div>
    </div>
    <div v-show="!can_write_state">
      <Stop />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PublishQuestion from "./questionnaire/PublishQuestion.vue";
import VoteAnswer from "./VoteAnswer.vue";
import Stop from "./Stop.vue";
import Success from "./Success.vue";
import { dateFormat } from "../utils/dateFormat";
export default {
  name: "CollectQuestion",
  components: {
    PublishQuestion,
    VoteAnswer,
    Stop,
    Success,
  },
  data() {
    return {
      iconClasses: ["icon-rate-face-1", "icon-rate-face-2", "icon-rate-face-3"],
      state: false,
      dialogVisible: false,
      // judge_required:false,
      ma: this.$route.params.ma,
      current_questionnaire: { questionnaire: { id: 0 } },
      headerTitle: "社交网站满意度问卷",
      subtitle:
        "为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！",
      questionList: [],
      can_write_state: true,
      end: false,
      type: -1,
      questionList_vote: [],
      can_see_result: false,
    };
  },
  methods: {
    clickitem(question) {
      console.log(question.radio);
      console.log(question.preradio);
      if(question.radio === question.preradio){
        question.radio =""
      }
      question.preradio=question.radio
    },
    showInfo2() {
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
    getInfo2() {
      var formData = new FormData();
      formData.append("md5", this.ma);
      axios({
        method: "post",
        url: "https://www.azur1tee.top/api/questionnaire/get_questionnaire",
        data: formData,
      }).then((res) => {
        console.log(res);
        console.log(res.data.data);
        this.type = res.data.data.questionnaire.type;
        this.current_questionnaire = res.data.data;
        console.log(dateFormat(new Date()));
        if (this.current_questionnaire.questionnaire.startTime === null) {
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
        this.showInfo2();
      });
    },
    showInfo1() {
      this.questionList_vote = [];
      // this.type = this.current_questionnaire.questionnaire.type;
      var list = this.current_questionnaire.questionList;
      console.log(this.questionList);
      for (var i = 0; i < list.length; i++) {
        let x = {};
        var y = list[i];
        x.type = y.question.type;
        x.text = y.question.content;
        x.selectionList = [];
        var total_answerNum = 0;
        for (var j = 0; j < y.optionList.length; j++) {
          total_answerNum += y.optionList[j].answerNum;
        }
        for (var j = 0; j < y.optionList.length; j++) {
          let z = {};
          z.comment = y.optionList[j].comment;
          z.total = y.optionList[j].answerNum + "";
          z.content = y.optionList[j].content;
          z.percentage = (y.optionList[j].answerNum / total_answerNum) * 100;
          var num = z.percentage;
          z.percentage = num.toFixed(2);
          x.selectionList.push(z);
        }
        x.required = y.question.required;
        x.radio = this.questionList[i].radio;
        (x.checkList = this.questionList[i].checkList),
          (x.answer = this.questionList[i].answer),
          (x.rating = this.questionList[i].rating),
          (x.comment = y.question.comment);
        x.questionId = y.question.id;
        this.questionList_vote.push(x);
      }
      console.log(this.questionList_vote);
    },
    getInfo1() {
      var formData = new FormData();
      formData.append("md5", this.ma);
      axios({
        method: "post",
        url: "https://www.azur1tee.top/api/questionnaire/get_questionnaire",
        data: formData,
      }).then((res) => {
        console.log(res.data.data);
        this.current_questionnaire = res.data.data;
        this.showInfo1();
      });
    },
    showInfo() {
      this.questionList = [];
      console.log(this.current_questionnaire);
      this.headerTitle = this.current_questionnaire.questionnaire.title;
      this.subtitle = this.current_questionnaire.questionnaire.description;
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
        url: "https://www.azur1tee.top/api/questionnaire/get_questionnaire",
        data: formData,
      }).then((res) => {
        console.log(res);
        if (res.data.data.questionnaire.using !== 1) {
          this.can_write_state = false;
          this.$message.error("不在填写时间内");
          return;
        }
        if (res.data.code === 400) {
          this.can_write_state = false;
        }
        console.log(res.data.data);
        this.type = res.data.data.questionnaire.type;
        this.current_questionnaire = res.data.data;
        this.can_see_result =
          res.data.data.questionnaire.canSee === 1 ? true : false;
        console.log(dateFormat(new Date()));
        if (
          this.current_questionnaire.questionnaire.startTime === null ||
          this.current_questionnaire.questionnaire.endTime === null
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
    judge() {
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
              return false;
            } else {
              z.number = y.radio + "";
              z.content = "";
            }
          } else {
            z.number = y.radio + "";
            z.content = "";
          }
        } else if (y.type === 1 || y.type === 7 || y.type === 11) {
          if (y.required) {
            if (y.checkList.length === 0) {
              alert("您有必选项未完成!");
              return false;
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
          if(y.required){
            if(y.rating===0){
              alert("您有必选项未完成!");
              return false;
            }
            else{
              z.number = "" + y.rating;
              z.content = "";
            }
          }
        } else if (y.type === 2) {
          if (y.required) {
            if (y.answer === "") {
              alert("您有必选项未完成!");
              return false;
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
        return true;
      }
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
              // alert("您有必选项未完成!");
              return;
            } else {
              z.number = y.radio + "";
              z.content = "";
            }
          } else {
            z.number = y.radio + "";
            z.content = "";
          }
        } else if (y.type === 1 || y.type === 7 || y.type === 11) {
          if (y.required) {
            if (y.checkList.length === 0) {
              // alert("您有必选项未完成!");
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
              // alert("您有必选项未完成!");
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
        url: "https://www.azur1tee.top/api/answer/submit_answer",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(x),
      }).then((res) => {
        this.end = true;
        console.log(res.data.message);
        alert(res.data.message);
        console.log(res);
        if (res.data.code === 200 || res.data.code === 201) {
          this.state = true;
          if (this.type === 1) {
            this.getInfo1();
          }
        }
      });
    },
  },
  created() {
    this.getInfo();
    var interval = setInterval(() => {
      this.getInfo2();
      if (this.type === 1) {
        clearInterval(interval);
      }
      if (this.end) {
        clearInterval(interval);
      }
      //do whatever here..
    }, 2000);
  },
};
</script>

<style scoped>
@import "../assets/css/icon/preview.css";
#pre {
  width: 1000px;
  min-height: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}
#c-top {
  margin-top: -8vh;
  padding-top: 100px;
  background: rgba(235, 246, 254, 1);
  min-height: 100vh;
}
.skin-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.background-image {
  height: 640px;
  overflow: hidden;
  width: 100%;
  background-size: cover;
  object-fit: cover;
  object-position: top;
}
.c-foot {
  padding: 10px 0 40px;
  text-align: center;
  color: #999;
  position: relative;
  z-index: 10;
}
</style>
