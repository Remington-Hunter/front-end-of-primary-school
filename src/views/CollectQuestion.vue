<template>
  <div id="c-top">
    <!-- 可以编辑 -->
    <div v-show="can_write_state">
      <div class="skin-header">
        <img
          src="../assets/background_1.png"
          class="background-image"
          alt="皮肤背景图"
        />
      </div>

      <!-- 已经提交且可以查看投票问卷的结果 -->
      <div v-if="state && this.type === 1 && this.can_see_result">
        <VoteAnswer
          :headerTitle="headerTitle"
          :subtitle="subtitle"
          :questionList="questionList_vote"
        />
        <!-- :questionList="questionList_vote" -->
      </div>

      <!-- 已经提交且可以查看考试问卷的结果 -->
      <div v-else-if="state && this.type === 3 && this.can_see_result">
        <TestAnswer
          :headerTitle="headerTitle"
          :subtitle="subtitle"
          :questionList="questionList"
          :total_grade="total_grade"
        />
      </div>

      <!-- 除了 已经提交且可以查看投票问卷的答案 的其他情况 -->
      <div
        id="pre"
        v-else
      >
        <!-- 非投票问卷提交成功 -->
        <div v-if="state">
          <success></success>
        </div>

        <!--未提交的所有问卷-->
        <div
          class="s-main "
          v-else
        >
          <!-- 问卷标题 -->
          <div class="header-title">
            {{ headerTitle }}
            <div v-if="have_count_down && this.type === 3">
              <span>距离截止时间:
                <CountDown
                  :remainTime="count_down_time"
                  @countDownEnd="countDownEnd"
                />
              </span>
            </div>
            <!-- <span><CountDown
    :remainTime="count_down_time"/></span> -->
          </div>
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
                <span
                  class="sel-total"
                  v-show="[12, 13, 14].includes(question.type)"
                >(分值{{ question.point }})</span>
                <el-tag v-if="[1, 7, 11, 13].includes(question.type)">多选</el-tag>
              </div>
              <div class="q-instruction">{{ question.comment }}</div>
            </div>

            <div class="question-body ">
              <!-- 单选题 -->
              <!-- @click.native.prevent="clickitem(question, index)" -->
              <div v-if="[0, 6, 10, 12].includes(question.type)">
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
                    >(剩余{{ item.total }})</span>
                    <div class="q-instruction">{{ item.comment }}</div>
                  </el-radio>
                </el-radio-group>
              </div>
              <!-- 多选题 -->
              <div v-else-if="[1, 7, 11, 13].includes(question.type)">
                <el-checkbox-group v-model="question.checkList">
                  <el-checkbox
                    v-for="(item, index) in question.selectionList"
                    :key="index"
                    :label="index"
                  >{{ item.content }}
                    <span
                      class="sel-total"
                      v-show="item.total >= 0 && question.type === 7"
                    >(剩余{{ item.total }})</span>
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
              <div v-else-if="question.type === 2 || question.type === 14">
                <el-input
                  type="textarea"
                  autosize
                  placeholder="请输入内容"
                  v-model="question.answer"
                >
                </el-input>
              </div>
              <!--              定位题-->
              <div v-else-if="question.type === 15">
                <el-input
                  class="loc"
                  v-show="locationInfo.country"
                  readonly
                  v-model="locationInfo.country+locationInfo.province+locationInfo.city+locationInfo.district"
                >
                </el-input>
                <div>
                  <v-btn
                    @click="getLocation()"
                    block
                    outlined
                    color="#C0C4CC"
                  >
                    <span style="color:#606266">
                      <i
                        class="el-icon-location-information"
                        style="font-size:20px"
                      ></i> 点击获取地理位置</span>
                  </v-btn>
                </div>
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
              @click="dialogVisible = judge()"
            >提交</el-button>
          </div>
          <!-- 确定问卷的提交弹窗 -->
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
                @click="
                  dialogVisible = false;
                  submit();
                "
              >确 定</el-button>
              <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
          </el-dialog>

          <el-dialog
            title="提示"
            :visible.sync="kaoshi_dialogVisible"
            @close="
              kaoshi_dialogVisible = false;
              submit_force();
            "
            width="30%"
            :before-close="handleClose"
          >
            <span>考试已截止,问卷已自动提交！</span>
            <span
              slot="footer"
              class="dialog-footer"
            >
              <el-button
                type="primary"
                @click="
                  kaoshi_dialogVisible = false;
                  submit_force();
                "
              >确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
      <div class="c-foot"><span>系统由问卷星球提供</span></div>
    </div>

    <!-- 不能编辑 -->
    <div v-show="!can_write_state">
      <Stop />
    </div>
  </div>
</template>

<script>
import { orderlisttostr } from "../utils/dateFormat.js";
import axios from "axios";
import PublishQuestion from "./questionnaire/PublishQuestion.vue";
import VoteAnswer from "./VoteAnswer.vue";
import TestAnswer from "./TestAnswer.vue";
import Stop from "./Stop.vue";
import Success from "./Success.vue";
import { dateFormat } from "../utils/dateFormat";
import CountDown from "../components/CountDown";
export default {
  name: "CollectQuestion",
  components: {
    PublishQuestion,
    VoteAnswer,
    Stop,
    Success,
    CountDown,
    TestAnswer,
  },
  data() {
    return {
      count_down_time: "100",
      iconClasses: ["icon-rate-face-1", "icon-rate-face-2", "icon-rate-face-3"],
      state: false,
      kaoshi_dialogVisible: false,
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
      have_count_down: false,
      total_grade: 0,
      locationInfo: {//定位信息
        ip: '',
        country: '',
        province: '',
        city: '',
        district: '',
        location: '',
      },
    };
  },
  methods: {
    countDownEnd() {
      this.kaoshi_dialogVisible = true;
    },
    clickitem(question) {
      console.log(question.radio);
      console.log(question.preradio);
      if (question.radio === question.preradio) {
        question.radio = "";
      }
      question.preradio = question.radio;
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
      if(this.can_write_state === false){
        return
      }
      var formData = new FormData();
      formData.append("md5", this.ma);
      axios({
        method: "post",
        url: "https://www.azur1tee.top/api/questionnaire/get_questionnaire",
        data: formData,
      }).then((res) => {
        console.log(res);
        console.log(res.data.data);
        var x = res.data.data.questionnaire.endTime;
        if (
          parseInt(res.data.data.questionnaire.type) === 3 &&
          res.data.data.questionnaire.endTime !== null
        ) {
          var x1 = x.split("T");
          var x2 = x1[0] + " " + x1[1];
          this.count_down_time = JSON.stringify(
            parseInt((new Date(x2).getTime() - new Date().getTime()) / 1000)
          );
          this.have_count_down = true;
          console.log(this.count_down_time);
        }
        this.type = res.data.data.questionnaire.type;
        this.current_questionnaire = res.data.data;
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
        x.point = y.question.point;
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
        x.point = y.question.point;
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
        x.correct_answer = y.question.answer;
        x.radio = "";
        x.analysis = y.question.analysis;
        (x.checkList = []),
          (x.answer = ""),
          (x.rating = 0),
          (x.comment = y.question.comment);
        x.questionId = y.question.id;
        this.questionList.push(x);
      }
      console.log(this.questionList);
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
        var x = res.data.data.questionnaire.endTime;
        if (
          parseInt(res.data.data.questionnaire.type) === 3 &&
          res.data.data.questionnaire.endTime !== null
        ) {
          console.log(x);
          var x1 = x.split("T");
          var x2 = x1[0] + " " + x1[1];
          this.count_down_time = JSON.stringify(
            parseInt((new Date(x2).getTime() - new Date().getTime()) / 1000)
          );
          this.have_count_down = true;
          console.log(this.count_down_time);
        }
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
        console.log(1);
      });
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => { });
    },
    judge() {
      var x = {};
      x.questionnaireId = this.current_questionnaire.questionnaire.id;
      var list = [];
      // console.log(this.questionList.length);
      // console.log(this.questionList);
      for (var i = 0; i < this.questionList.length; i++) {
        var z = {};
        var y = this.questionList[i];
        z.questionId = y.questionId;
        if (y.type === 0 || y.type === 6 || y.type === 10 || y.type === 12) {
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
        } else if (y.type === 1 || y.type === 7 || y.type === 11 || y.type === 13) {
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
          if (y.required) {
            if (y.rating === 0) {
              alert("您有必选项未完成!");
              return false;
            } else {
              z.number = "" + y.rating;
              z.content = "";
            }
          } else {
            z.number = "" + y.rating;
            z.content = "";
          }
        } else if (y.type === 2 || y.type === 14) {
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
        }
        else if (y.type === 15) {
          if (y.required) {
            if (this.locationInfo.country === "") {
              alert("您有必选项未完成!");
              return false;
            } else {
              z.number = "";
              z.content = this.locationInfo.country + this.locationInfo.province + this.locationInfo.city + this.locationInfo.district;
            }
          } else {
            z.number = "";
            z.content = this.locationInfo.country + this.locationInfo.province + this.locationInfo.city + this.locationInfo.district;
          }
        }
        list.push(z);
      }
      return true;
    },
    submit_force() {
      var x = {};
      x.questionnaireId = this.current_questionnaire.questionnaire.id;
      var list = [];
      var total_grade = 0;
      for (var i = 0; i < this.questionList.length; i++) {
        var z = {};
        var y = this.questionList[i];
        z.questionId = y.questionId;
        if ([0, 6, 10, 12].includes(y.type)) {
          if (y.radio + "" === y.correct_answer) {
            y.grade = y.point;
            total_grade += y.grade;
          } else {
            y.grade = 0;
          }
          z.number = y.radio + "";
          z.content = "";
        }
        else if ([1, 7, 11, 13].includes(y.type)) {
          if (y.correct_answer === orderlisttostr(y.checkList)) {
            console.log(123);
            y.grade = y.point
            console.log(y.grade);
            total_grade += y.grade;
          }
          else {
            y.grade = 0
          }
          z.number = "";
          for (var k = 0; k < y.checkList.length; k++) {
            z.number += y.checkList[k];
          }
          z.content = "";
        }
        else if (y.type === 2 || y.type === 14) {
          var xxx = y.answer
          xxx = xxx.replace(/\s*/g, "")
          if (y.correct_answer === xxx) {
            y.grade = y.point
            total_grade += y.grade;
          }
          else {
            y.grade = 0
          }
          z.number = "";
        }
        else if (y.type === 3) {
          z.number = "" + y.rating;
          z.content = "";
        }
        list.push(z);
      }
      this.total_grade = total_grade
      x.point = total_grade
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
      console.log(this.questionList);
    },
    submit() {
      var x = {};
      x.questionnaireId = this.current_questionnaire.questionnaire.id;
      var list = [];
      var total_grade = 0;
      for (var i = 0; i < this.questionList.length; i++) {
        var z = {};
        var y = this.questionList[i];
        console.log(y)
        z.questionId = y.questionId;
        if ([0, 6, 10, 12].includes(y.type)) {
          if (y.radio + "" === y.correct_answer) {
            y.grade = y.point;
            total_grade += y.grade;
          } else {
            y.grade = 0;
          }
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
        }
        else if ([1, 7, 11, 13].includes(y.type)) {
          if (y.correct_answer === orderlisttostr(y.checkList)) {
            console.log(123);
            y.grade = y.point
            console.log(y.grade);
            total_grade += y.grade;
          }
          else {
            y.grade = 0
          }
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
        }
        else if (y.type === 2 || y.type === 14) {
          var xxx = y.answer
          xxx = xxx.replace(/\s*/g, "")
          if (y.correct_answer === xxx) {
            y.grade = y.point
            total_grade += y.grade;
          }
          else {
            y.grade = 0
          }
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
        }
        else if (y.type === 3) {
          if (y.required) {
            if (y.rating === 0) {
              // alert("您有必选项未完成!");
              return;
            } else {
              z.number = "" + y.rating;
              z.content = "";
            }
          } else {
            z.number = "" + y.rating;
            z.content = "";
          }
        }
        else if (y.type === 15) {
          if (y.required) {
            if (this.locationInfo.country === "") {
              alert("您有必选项未完成!");
              return false;
            } else {
              z.number = "";
              z.content = this.locationInfo.country + this.locationInfo.province + this.locationInfo.city + this.locationInfo.district;
            }
          } else {
            z.number = "";
            z.content = this.locationInfo.country + this.locationInfo.province + this.locationInfo.city + this.locationInfo.district;
          }
        }
        list.push(z);
      }
      this.total_grade = total_grade
      x.point = total_grade
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
      console.log(this.questionList);
    },
    getLocation() {
      this.$confirm("此操作将获取您的地理位置，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$message({
          type: 'success',
          message: "定位成功!",
        });
        // eslint-disable-next-line
        this.locationInfo.ip = window.localStorage.getItem('Ip')
        // console.log(this.locationInfo.ip)
        var _this = this;
        axios.get("https://restapi.amap.com/v5/ip?key=a593d64ab73229be6b3d1ef802b76849&type=4&ip=" + this.locationInfo.ip)
          .then(response => {
            console.log(response)
            _this.locationInfo.country = response.data.country
            _this.locationInfo.province = response.data.province
            _this.locationInfo.city = response.data.city
            _this.locationInfo.district = response.data.district
            _this.locationInfo.location = response.data.location
            console.log(_this.locationInfo)
          });
      })
        .catch(() => {
          this.$message({
            type: "info",
            message: "定位失败",
          });
        })
    }
  },
  created() {
    this.getInfo();
    var interval = setInterval(() => {
      this.getInfo2();
      if (parseInt(this.type) !== 1) {
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
