<template>
  <div>
    <div class="c-head">
      <span class="total">回收总量：</span>
      <el-button
        v-if="num === 1"
        @click="exportExcel"
        type="primary"
        class="d-btn"
      >导出EXCEL</el-button>
      <el-button
        v-if="num === 2"
        type="primary"
        @click="handleDown"
        class="d-btn"
      ><i class="el-icon-download"></i> 下载PDF</el-button>
    </div>
    <div v-show="questionType == 4">
      <el-button
        type="primary"
        @click="showDialog"
      >查看每日进度</el-button>
      <el-dialog
        :visible.sync="ishow"
        width="50%"
        :before-close="handleClose"
      >
        <el-button
          type="primary"
          @click="ListOrProgress=false"
        >
          导入名单
        </el-button>
        <el-button
          type="primary"
          @click="ListOrProgress=true"
        >
          参与进度
        </el-button>
        <el-card v-show="ListOrProgress==false">
          <el-table
            :data="studentlist"
            border
            style="width: 100%"
          >
            <el-table-column
              prop="name"
              label="姓名"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="stuId"
              label="学号"
              width="120"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              width="100"
            >
              <template slot-scope="scope">
                <el-button
                  @click="deleteList(scope.row)"
                  type="text"
                  size="small"
                >删除</el-button>
                <!-- <el-button type="text" size="small">编辑</el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <div slot="header">请输入姓名和学号</div>
          <div>
            <el-input
              v-model="name"
              placeholder="请输入姓名"
            ></el-input>
            <el-input
              v-model="studentId"
              placeholder="请输入学号"
            ></el-input>
            <el-button
              type="primary"
              @click="addlist"
            >提交数据</el-button>
          </div>
        </el-card>
        <el-card v-show="ListOrProgress==true">
          <el-button
            type="primary"
            @click="attendtype=false"
          >待参与</el-button>
          <el-button
            type="primary"
            @click="attendtype=true"
          >已参与</el-button>
          <div v-show="attendtype==false">
            <el-table
              :data="attendFlase"
              border
              style="width: 100%"
            >
              <el-table-column
                prop="name"
                label="姓名"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="stuId"
                label="学号"
                width="120"
              >
              </el-table-column>

            </el-table>
          </div>
          <div v-show="attendtype==true">
            <div v-show="attendtype==false">
              <el-table
                :data="attendFlase"
                border
                style="width: 100%"
              >
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="120"
                >
                </el-table-column>
                <el-table-column
                  prop="stuId"
                  label="学号"
                  width="120"
                >
                </el-table-column>

              </el-table>
            </div>
          </div>
          <!-- <el-button type="primary">不在导入名单之内</el-button> -->
        </el-card>
        <span
          slot="footer"
          class="dialog-footer"
          v-show="ListOrProgress==false"
        >
          <el-button @click="ishow = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submitList()"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div
      class="center"
      id="demo1"
      v-if="num === 2"
    >
      <div
        class="header-title"
        style="color: #999; font-size: 20px"
      >
        问卷ID:<span style="font-size: 20px; color: #999">{{ this.id }}</span>
      </div>
      <div class="content">
        <div
          v-for="(item, index) in data"
          :key="index"
        >
          <el-divider></el-divider>
          <div class="question-title">
            <div class="question-seq">
              <b>第{{ index + 1 }}题</b>
            </div>
            <br />
            <span class="text">题目：{{ data[index].question.content }}</span>
            <span
              v-if="
                data[index].question.type == 0 ||
                data[index].question.type == 6 ||
                data[index].question.type == 10 ||
                data[index].question.type == 12
              "
              class="question-type"
              >单选题</span
            >
            <span
              v-if="
                data[index].question.type == 1 ||
                data[index].question.type == 7 ||
                data[index].question.type == 11 ||
                data[index].question.type == 13
              "
              class="question-type"
              >多选题
            </span>
            <span
              v-if="
                data[index].question.type == 2 ||
                data[index].question.type == 5 ||
                data[index].question.type == 14 ||
                data[index].question.type == 15
              "
              class="question-type"
              >填空题</span
            >
            <span
              v-if="
                data[index].question.type == 3 ||
                data[index].question.type == 4 ||
                data[index].question.type == 9
              "
              class="question-type"
              >评分题</span
            >
            <div v-if="questionType == 3">
              <div class="corret">正确率：{{ rate[index] }}</div>
              <div class="c-answer">正确答案：{{ rightAnswer[index] }}</div>
            </div>
          </div>

          <div
            v-if="
              data[index].question.type === 2 ||
              data[index].question.type === 5 ||
              data[index].question.type === 14 ||
              data[index].question.type === 15
            "
          >
            <el-table
              :data="completion[index]"
              style="width: 100%"
              class="table"
            >
              <el-table-column label="序号">
                <template slot-scope="scope">
                  <!-- <i class="el-icon-time"></i> -->
                  <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="内容">
                <template slot-scope="scope1">
                  <!-- <i class="el-icon-time"></i> -->
                  <span style="margin-left: 10px">{{
                    scope1.row.content
                  }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-else>
            <div v-if="bar[index].length !== 0">
              <!-- <Completion :data1="completion[index]"></Completion> -->
              <div>
                <el-table
                  :data="completion[index]"
                  style="width: 100%"
                  class="table"
                  border
                >
                  <el-table-column label="选项">
                    <template slot-scope="scope2">
                      <!-- <i class="el-icon-time"></i> -->
                      <span style="margin-left: 10px">{{
                        scope2.row.content
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="选择人数">
                    <template slot-scope="scope3">
                      <!-- <i class="el-icon-time"></i> -->
                      <span style="margin-left: 10px">{{
                        scope3.row.num
                      }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div
                style="width: 600px; height: 400px"
                v-if="states[index] === 1"
              >
                <drawBar
                  :id="BarToString(index)"
                  :series="col[index]"
                ></drawBar>
              </div>
              <div
                style="width: 600px; height: 400px"
                v-if="states[index] === 2"
              >
                <drawLine
                  :id="LineToString(index)"
                  :series="line[index]"
                ></drawLine>
              </div>
              <div
                style="width: 600px; height: 400px"
                v-if="states[index] === 3"
              >
                <drawPie
                  :id="PieToString(index)"
                  :series="pie[index]"
                ></drawPie>
              </div>
              <div
                style="width: 600px; height: 400px"
                v-if="states[index] === 4"
              >
                <drawCol
                  :id="ColToString(index)"
                  :series="col[index]"
                ></drawCol>
              </div>
              <el-button @click="setStates(index, 0)">
                <span>表格</span>
              </el-button>
              <el-button @click="setStates(index, 1)">
                <span>条形图</span>
              </el-button>
              <el-button @click="setStates(index, 2)">
                <span>折线图</span>
              </el-button>
              <el-button @click="setStates(index, 3)">
                <span>饼图</span>
              </el-button>
              <el-button @click="setStates(index, 4)">
                <span>柱状图</span>
              </el-button>
            </div>
            <div v-else>
              <el-table
                :data="completion[index]"
                style="width: 100%"
              >
                <el-table-column label="序号">
                  <template slot-scope="scope">
                    <!-- <i class="el-icon-time"></i> -->
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="内容">
                  <template slot-scope="scope1">
                    <!-- <i class="el-icon-time"></i> -->
                    <span style="margin-left: 10px">{{
                      scope1.row.content
                    }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="center"
      v-else
    >
      <span v-if="questionType == 3"> 答卷平均分：{{ avg }} </span>
      <el-table
        :data="table1"
        border
        height="550"
        style="width: 100%"
      >
        <template v-for="(item, index) in headArr">
          <el-table-column
            :key="index"
            :prop="item.prop"
            :label="item.label | ellipsis"
            align="center"
            :render-header="renderHeader"
          >
            <template slot-scope="scope">
              <span>
                {{ scope.row[item.prop] }}
              </span>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="center" v-show="false" id="demo2">
      <span v-if="questionType == 3"> 答卷平均分：{{ avg }} </span>
      <el-table :data="table1" border height="550" style="width: 100%">
        <template v-for="(item, index) in headArr">
          <el-table-column
            :key="index"
            :prop="item.prop"
            :label="item.label "
            align="center"
            
          >
            <template slot-scope="scope">
              <span>
                {{ scope.row[item.prop] }}
              </span>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import drawLine from "../components/DrawLine.vue";
import drawPie from "../components/DrawPie.vue";
import drawBar from "../components/DrawBar.vue";
import drawCol from "../components/DrawCol.vue";
import htmlToPdf from "@/assets/js/htmlToPdf";
import Completion from "../components/Completion";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  props: {
    num: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      series: ["1", "2", "3"],
      msg1: "饼状图",
      id: this.id1,
      bar: [],
      data: [],
      data1: [],
      pie: [],
      col: [],
      line: [],
      completion: [],
      historyList: [],
      type: 0,
      states: [],
      s: {},
      answer: [],
      answerData: [],
      headArr: [],
      table1: [],
      table2: [],
      questionType: 3,
      rate: [],
      rightAnswer: [],
      avg: 0,
      avglist: [],
      ishow: false,
      studentId: "",
      name: "",
      studentlist: [],
      ListOrProgress: false,
      attendtype: false,
      attendFlase: [],
      attendTrue: [],
    };
  },
  components: {
    drawLine,
    drawPie,
    drawBar,
    drawCol,
    Completion,
  },
  mounted() {
    this.id = this.$route.params.id;
    this.questionType = this.$route.params.type;
    this.getseries();
    this.getAnswerData();
    this.getList();
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 8) {
        return value.slice(0, 8) + "...";
      }
      return value;
    },
  },
  methods: {
    getAttendFalseList() {
      var Data = new FormData();
      Data.append('questionnaireId', this.id);
      axios({
        url: "https://www.azur1tee.top/api/person/checkout_not_punch",
        method: "post",
        data: Data,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log('getList');
        console.log(res);
        this.attendFlase = res.data.data;
      })
      for (var i = 0; i < this.studentlist.length; i++) {
        var flag = 0;
        for (var j = 0; j < this.attendTrue.length; j++) {
          if (this.studentlis[i].stuId == this.attendFlase[j].stuId) {
            flag = 1;
            break;
          }
        }
        if (flag == 0) {
          this.attendTrue.push(this.studentlist[i]);
        }
      }
    },
    getList() {
      var Data = new FormData();
      Data.append('questionnaireId', this.id);
      axios({
        url: "https://www.azur1tee.top/api/person/get_all_list",
        method: "post",
        data: Data,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log('getList');
        console.log(res);
        this.studentlist = res.data.data;
        this.getAttendFalseList();
      });
    },
    deleteList(item) {
      var index = -1;
      console.log(item);
      for (var i = 0; i < this.studentlist; i++) {
        if (item.stuId == this.studentlist[i].stuId) {
          index = i;
          break;
        }
      }
      this.studentlist.splice(index, 1);
    },
    submitList() {
      // console.log(this.studentlist);
      axios({
        url: "https://www.azur1tee.top/api/person/lead_in_list",
        method: "post",
        data: {
          questionnaireId: this.id,
          personList: this.studentlist,
          // studentlist=[
          //   {
          //   id:'',name:''
          //   },
          //   {
          //     id:'',name:''
          //   }
          // ]
        },
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        this.getList();
        this.ishow = false;
      })
    },
    addlist() {
      var c = { name: this.name, stuId: this.studentId };
      for (var i = 0; i < this.studentlist.length; i++) {
        if (this.studentlist[i].id == this.studentId) {
          this.$confirm("学号重复，无法添加")
            .then((_) => {
              done();
            })
            .catch((_) => { });
          return;
        }
      }
      this.studentlist.push(c);
      console.log(this.studentlist);
      this.name = "";
      this.studentId = "";
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => { });
    },
    showDialog() {
      this.ishow = true;
    },
    getRate(data) {
      if (this.questionType !== 3) {
        return;
      } else {
        for (var i = 0; i < data.length; i++) {
          var t = data[i].question.rate;
          t = t * 100;
          t = t.toFixed(2);
          t = "" + t + "%";
          this.rate.push(t);
          if (
            data[i].question.type == 2 ||
            data[i].question.type == 25 ||
            data[i].question.type == 14
          ) {
            this.rightAnswer.push(data[i].question.answer);
          } else {
            var s = "";

            for (var j = 0; j < data[i].question.answer.length; j++) {
              if (j == 0) {
                s =
                  data[i].optionList[data[i].question.answer[j] - "0"].content;
              } else {
                s +=
                  "、" +
                  data[i].optionList[data[i].question.answer[j] - "0"].content;
              }
            }
            this.rightAnswer.push(s);
          }
          t = data[i].question.rate * data.length;
          t = t.toFixed(2);
          this.avglist.push(t);
        }
      }
    },
    exportExcel() {
      // 设置当前日期
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let name = year + "" + month + "" + day;
      // console.log(name)
      /* generate workbook object from table */
      //  .table要导出的是哪一个表格
      var wb = XLSX.utils.table_to_book(document.querySelector("#demo2"));
      console.log(wb.Sheets.Sheet1);
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        //  name+'.xlsx'表示导出的excel表格名字
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          name + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    initStates() {
      for (var i = 0; i < this.data.length; i++) {
        this.states[i] = 0;
      }
      this.s.states = this.states;
    },
    setStates(index, num) {
      this.$set(this.states, index, num);
    },
    getCompletionData(data) {
      console.log("this is ");
      for (var i = 0; i < this.data.length; i++) {
        console.log(data[i].question.type);
        if (
          data[i].question.type === 2 ||
          data[i].question.type === 5 ||
          data[i].question.type === 14 ||
          data[i].question.type === 15
        ) {
          // console.log(11)
          var data_i = data[i].answerList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            var s = { id: j + 1, content: data_i[j].content };
            item.push(s);
          }
          this.completion.push(item);
        } else if (
          data[i].question.type === 3 ||
          data[i].question.type === 4 ||
          data[i].question.type === 9
        ) {
          var data_i = data[i].optionList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            var c = "" + (j + 1) + "星";
            console.log(data[i]);
            var s = { content: c, num: data_i[j].answerNum };
            console.log("data_i[j].answerNum" + data_i[j].answerNum);
            item.push(s);
          }
          this.completion.push(item);
        } else {
          var data_i = data[i].optionList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            var s = { content: data_i[j].content, num: data_i[j].answerNum };
            item.push(s);
          }
          this.completion.push(item);
        }
      }
      // console.log(11111111);
      // console.log(this.completion)
    },
    getBarData(data) {
      // console.log(data.length);
      for (var i = 0; i < data.length; i++) {
        console.log(i);
        if (
          data[i].question.type === 2 ||
          data[i].question.type == 5 ||
          data[i].question.type == 14 ||
          data[i].question.type == 15
        ) {
          // console.log(11)
          var data_i = data[i].answerList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            // var s=[data_i[j].answerNum,data_i[j].content]
            item.push(data_i[j]);
          }
          // console.log(item)
          this.bar.push(item);
        } else if (data[i].question.type === 3) {
          var data_i = data[i].optionList;
          var item = [];

          for (let j = 1; j < data_i.length; j++) {
            var c = "" + j + "星";
            var s = [data_i[j].answerNum, c];
            console.log(c);
            item.push(s);
            console.log(item);
          }
          this.bar.push(item);
          console.log(item);
        } else {
          var data_i = data[i].optionList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            var s = [data_i[j].answerNum, data_i[j].content];
            item.push(s);
          }
          this.bar.push(item);
          console.log(item);
          // console.log(22)
        }
        // console.log(data[i])
      }
      // console.log(31231)
      // console.log(this.bar)
    },
    getseries() {
      // alert(1);
      var Data = new FormData();
      Data.append("id", this.id);
      axios({
        url: "https://www.azur1tee.top/api/answer/get_result",
        method: "post",
        data: Data,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          // "Content-Type": "application/json",
        },
      }).then((res) => {
        var data = res.data.data;
        console.log(res);
        console.log("res");
        this.data = data;
        this.getBarData(data);
        // console.log('bar');
        this.getColData(data);
        this.getPieData(data);
        this.getLineData(data);
        this.getCompletionData(data);

        this.initStates();
        this.getRate(data);
        // this.getExcelData();
      });
    },
    getAnswerData() {
      var Data = new FormData();
      Data.append("id", this.id);
      Data.append("byGrade", 1);
      axios({
        url: "https://www.azur1tee.top/api/answer/get_result_by_questionnaire",
        method: "post",
        data: Data,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
        },
      }).then((res) => {
        var data = res.data.data;
        this.data1 = data;
        this.avg = 0;
        for (var i = 0; i < data.answerInfo.length; i++) {
          this.avg += data.answerInfo[i].info.point;
        }
        this.avg = this.avg / data.answerInfo.length;
        this.getAnswerExcel(data);
      });
    },
    getprops(data) {
      this.headArr = [];
      // var data=this.data;
      // var question2 = data.questionInfo[this.v2];
      var len = data.questionInfo.length;
      var c = { label: "序号", prop: "0" };
      this.headArr.push(c);
      for (var i = 0; i < len; i++) {
        var s = "第" + (i + 1) + "题：";
        if (data.questionInfo[i].info.content == null) {
          s += "内容为空";
        } else {
          s += data.questionInfo[i].info.content;
        }
        // if(s=='')
        c = { label: s, prop: (i + 1).toString() };
        this.headArr.push(c);
      }
      c = { label: "填写时间", prop: (len + 1).toString() };
      this.headArr.push(c);
      if (this.questionType === 3) {
        c = { label: "总成绩", prop: (len + 2).toString() };
        // console.log('11111');
        this.headArr.push(c);
      }
    },
    getAnswerExcel(data) {
      this.getprops(data);
      // console.log("this.headArr");
      // console.log(this.headArr);
      this.table1 = [];
      var answerData = data.answerInfo;
      var len = answerData.length;
      //
      for (var i = 0; i < len; i++) {
        var c = {};
        c["0"] = i + 1;
        var item = answerData[i].answerList;
        for (var j = 0; j < item.length; j++) {
          if (
            data.questionInfo[j].info.type == 2 ||
            data.questionInfo[j].info.type == 5 ||
            data.questionInfo[j].info.type == 14 ||
            data.questionInfo[j].info.type == 15
          ) {
            if (item[j].content == "") {
              c[(j + 1).toString()] = "用户未填写";
            } else {
              c[(j + 1).toString()] = item[j].content;
            }
          } else if (data.questionInfo[j].info.type == 3) {
            if (item[j].number == "" || item[j].number == "0") {
              c[(j + 1).toString()] = "无评价";
            } else {
              var t = item[j].number - "0";
              c[(j + 1).toString()] = "" + t + "星";
            }
          } else {
            var t = "";
            for (var k = 0; k < item[j].number.length; k++) {
              var num = item[j].number[k] - "0";
              if (k == 0) {
                t = data.questionInfo[j].optionList[num].content;
              } else {
                t += "、" + data.questionInfo[j].optionList[num].content;
              }
            }
            if (t == "") {
              t = "用户未填写";
            }
            c[(j + 1).toString()] = t;
          }
        }
        c[(item.length + 1).toString()] = data.answerInfo[i].info.submitTime;
        if (this.questionType === 3) {
          console.log(data.answerInfo[i].point);
          c[(item.length + 2).toString()] = data.answerInfo[i].info.point;
        }
        this.table1.push(c);
      }
    },
    exportData() {
      this.excelData = this.completion; //将你要导出的数组数据（historyList）赋值给excelDate
      this.export2Excel(); //调用export2Excel函数，填写表头（clomns里的type）和对应字段(historyList里的属性名)
    },
    //表格数据写入excel
    export2Excel() {
      var that = this;
      require.ensure([], () => {
        const {
          export_json_to_excel,
        } = require("../assets/excel/Export2Excel");
        //这里使用绝对路径( @表示src文件夹 )，使用@/+存放export2Excel的路径【也可以写成相对于你当前"xxx.vue"文件的相对路径，例如我的页面放在assets文件夹同级下的views文件夹下的“home.vue”里，那这里路径也可以写成"../assets/excel/Export2Excel"】
        const tHeader = [content, num]; // 导出的excel表头名信息
        const filterVal = ["content", "num"]; // 导出的excel表头字段名，需要导出表格字段名
        const list = that.excelData;
        const data = that.formatJson(filterVal, list);

        export_json_to_excel(tHeader, data, "学生报名信息汇总"); // 导出的表格名称，根据需要自己命名
      });
    },

    //格式转换，直接复制即可,不需要修改什么
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    goto(type) {
      // this.getseries()
      this.type = type;
      // console.log(121);
    },
    ComToString(val) {
      return "com" + val;
    },
    PieToString(val) {
      return "pie" + val;
    },
    BarToString(val) {
      return "bar" + val;
    },
    ColToString(val) {
      return "col" + val;
    },
    LineToString(val) {
      return "line" + val;
    },
    handleDown() {
      htmlToPdf.downloadPDF(document.querySelector("#demo1"), "数据分析");
    },
    goBack() {
      this.$router.go(-1);
    },
    getColData(data) {
      for (var i = 0; i < data.length; i++) {
        if (
          data[i].question.type == 2 ||
          data[i].question.type == 5 ||
          data[i].question.type == 14 ||
          data[i].question.type == 15
        ) {
          var data_i = data[i].answerList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            // var s=[data_i[j].answerNum,data_i[j].content]
            item.push(data_i[j]);
          }
          this.col.push(item);
        } else if (data[i].question.type == 3) {
          var data_i = data[i].optionList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            s = "" + (j + 1) + "星";
            var s = { 选项: s, 数量: data_i[j].answerNum };
            item.push(s);
          }
          this.col.push(item);
        } else {
          var data_i = data[i].optionList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            var ss = data_i[j].content;
            if (ss.length > 4) {
              ss = ss.slice(0, 5) + "...";
            }
            var s = { 选项: ss, 数量: data_i[j].answerNum };
            item.push(s);
          }
          this.col.push(item);
        }
      }
      // console.log("col")
      // console.log(this.col);
    },
    getPieData(data) {
      for (var i = 0; i < data.length; i++) {
        if (
          data[i].question.type == 2 ||
          data[i].question.type == 5 ||
          data[i].question.type == 14 ||
          data[i].question.type == 15
        ) {
          var data_i = data[i].answerList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            // var s=[data_i[j].answerNum,data_i[j].content]
            item.push(data_i[j]);
          }
          this.pie.push(item);
        } else if (data[i].question.type == 3) {
          var data_i = data[i].optionList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            var c = "" + (j + 1) + "星";
            var s = { value: data_i[j].answerNum, name: c };
            item.push(s);
          }
          this.pie.push(item);
        } else {
          var data_i = data[i].optionList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            var s = { value: data_i[j].answerNum, name: data_i[j].content };
            item.push(s);
          }
          this.pie.push(item);
        }
      }
    },
    getLineData(data) {
      for (var i = 0; i < data.length; i++) {
        if (
          data[i].question.type == 2 ||
          data[i].question.type == 5 ||
          data[i].question.type == 14 ||
          data[i].question.type == 15
        ) {
          var data_i = data[i].answerList;
          var item = [];
          this.line.push(item);
        } else if (data[i].question.type == 3) {
          var data_i = data[i].optionList;
          var item = [];
          var col1 = [];
          var col2 = [];
          for (let j = 0; j < data_i.length; j++) {
            // var s={value:data_i[j].answerNum,name:data_i[j].content}
            var c = "" + (j + 1) + "星";
            col1.push(c);
            col2.push(data_i[j].answerNum);
          }
          item.push(col1);
          item.push(col2);
          this.line.push(item);
        } else {
          var data_i = data[i].optionList;
          var item = [];
          var col1 = [];
          var col2 = [];
          for (let j = 0; j < data_i.length; j++) {
            // var s={value:data_i[j].answerNum,name:data_i[j].content}
            var ss = data_i[j].content;
            if (ss.length > 5) {
              ss = ss.slice(0, 5) + "...";
            }
            col1.push(ss);
            col2.push(data_i[j].answerNum);
          }
          item.push(col1);
          item.push(col2);
          this.line.push(item);
        }
      }
      // console.log("line")
      // console.log(this.line);
    },
  },
};
</script>

<style  scoped>
@import "../assets/css/icon/analysis.css";
</style>
