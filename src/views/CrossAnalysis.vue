<template>
  <div class="main">
    <el-page-header
      @back="goBack"
      content="统计分析"
    >
    </el-page-header>
    <el-button  @click="exportExcel" type="primary" class="d-btn">导出2412414</el-button>
    <el-button
      type="primary"
      @click="handleDown"
      class="d-btn"
    ><i class="el-icon-download"></i> 下载PDF</el-button>
    
    <div
      class="center"
      id="demo1"
    >
      <div class="header-title" style="color:#999;font-size:20px">问卷ID:<span style="font-size:20px;color:#999">{{this.id}}</span></div>
      <div class="content">
        <div
          v-for="(item, index) in data"
          :key="(index)"
        >
          <el-divider></el-divider>
          <div class="question-head ">
            <div class="question-title">
              <span class="question-seq"><b>第{{ index + 1 }}题：</b></span>
              <span class="text">{{data[index].question.content}}</span>
              <span
                v-if="data[index].question.type==0"
                class="question-type"
              >单选题</span>
              <span
                v-if="data[index].question.type==1"
                class="question-type"
              >多选题</span>
              <span
                v-if="data[index].question.type==2"
                class="question-type"
              >填空题</span>
              <span
                v-if="data[index].question.type==3"
                class="question-type"
              >评分题</span>
            </div>
          </div>
          <div v-if="data[index].question.type === 2">
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
                      <span style="margin-left: 10px">{{ scope3.row.num }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div
                style="width: 600px; height: 400px"
                v-if="states[index]  === 1"
              >
                <drawBar
                  :id="BarToString(index)"
                  :series="bar[index]"
                ></drawBar>
              </div>
              <div
                style="width: 600px; height: 400px"
                v-if="states[index]  === 2"
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
              <el-button @click="setStates(index,0)">
                <span>表格</span>
              </el-button>
              <el-button @click="setStates(index,1)">
                <span>条形图</span>
              </el-button>
              <el-button @click="setStates(index,2)">
                <span>折线图</span>
              </el-button>
              <el-button @click="setStates(index,3)">
                <span>饼图</span>
              </el-button>
              <el-button @click="setStates(index,4)">
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
    <!-- 下面的内容不用管，我是不会让他显示的，只是为了导出数据 -->
    <div id="demo2" v-show="false">
      <div >
        <div
          v-for="(item, index) in data"
          :key="(index)"
        >
          <el-divider></el-divider>
          <div class="question-head ">
            <div class="question-title">
              <span class="question-seq"><b>第{{ index + 1 }}题：</b></span>
              <span class="text">{{data[index].question.content}}</span>
              <span
                v-if="data[index].question.type==0"
                class="question-type"
              >单选题</span>
              <span
                v-if="data[index].question.type==1"
                class="question-type"
              >多选题</span>
              <span
                v-if="data[index].question.type==2"
                class="question-type"
              >填空题</span>
              <span
                v-if="data[index].question.type==3"
                class="question-type"
              >评分题</span>
            </div>
          </div>
          <div v-if="data[index].question.type === 2">
            <el-table
              :data="excel[index]"
              style="width: 100%"
              class="table"
            >
              <el-table-column label="">
                <template slot-scope="scope">
                  <!-- <i class="el-icon-time"></i> -->
                  <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="">
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
            <div v-if="excel[index].length !== 0">
              <!-- <Completion :data1="completion[index]"></Completion> -->
              <div>
                <el-table
                  :data="excel[index]"
                  style="width: 100%"
                  class="table"
                  border
                >
                  <el-table-column label="">
                    <template slot-scope="scope2">
                      <!-- <i class="el-icon-time"></i> -->
                      <span style="margin-left: 10px">{{
                      scope2.row.content
                    }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="">
                    <template slot-scope="scope3">
                      <!-- <i class="el-icon-time"></i> -->
                      <span style="margin-left: 10px">{{ scope3.row.num }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div v-else>
              <el-table
                :data="excel[index]"
                style="width: 100%"
              >
                <el-table-column label="">
                  <template slot-scope="scope">
                    <!-- <i class="el-icon-time"></i> -->
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="">
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
      <div v-show="false">
        <div >
        <div
          v-for="(item, index) in answerData"
          :key="(index)"
        >
          <el-divider></el-divider>
          <div >
              <!-- <Completion :data1="completion[index]"></Completion> -->
              <div>
                <el-table
                  :data="answer[index]"
                  style="width: 100%"
                  class="table"
                  border
                >
                  <el-table-column label="">
                    <template slot-scope="scope2">
                      <!-- <i class="el-icon-time"></i> -->
                      <span style="margin-left: 10px">{{
                      scope2.row.content
                    }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="">
                    <template slot-scope="scope3">
                      <!-- <i class="el-icon-time"></i> -->
                      <span style="margin-left: 10px">{{ scope3.row.num }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <!-- <div v-else>
              <el-table
                :data="excel[index]"
                style="width: 100%"
              >
                <el-table-column label="">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="">
                  <template slot-scope="scope1">

                    <span style="margin-left: 10px">{{
                    scope1.row.content
                  }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div> -->
        </div>
      </div>
      </div>
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
// import Export2Excel from '@/excel/Export2Excel'
// import Blob from '@/excel/Blob'
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  props: {
    id1: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      series: ["1", "2", "3"],
      msg1: "饼状图",
      id: this.id1,
      bar: [],
      data: [],
      pie: [],
      col: [],
      line: [],
      completion: [],
      historyList: [],
      type: 0,
      states:[],
      s:{},
      excel:[],
      answer:[],
      answerData:[],
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
    this.getseries();
    this.getAnswerData();
  },
  
  methods: {
    getExcelData(){
      var data=this.data;
      for (var i = 0; i < data.length; i++) {
        if (data[i].question.type === 2) {
          // console.log(11)
          var data_i = data[i].answerList;
          var item = [];
          // var c={id:'',content:''}
          // item.push(c);
          var c={id:'第'+(i+1)+'题 填空题',content:'题目内容:'+data[i].question.content};
          item.push(c);
          c={id:'序号',content:'答题内容'}
          item.push(c)
          for (let j = 0; j < data_i.length; j++) {
            var s = { id: j + 1, content: data_i[j].content };
            item.push(s);
          }
          this.excel.push(item);
        }
        else if(data[i].question.type === 3){
          var data_i = data[i].optionList;
          var item = [];
          // var c={content:'',num:''}
          // item.push(c);
          var c1={content:'第'+(i+1)+'题 评分题',num:'题目内容:'+data[i].question.content};
          item.push(c1);
          c={content:'选项内容',num:'选择人数'}
          item.push(c)
          for (let j = 0; j < data_i.length; j++) {
            var c=''+(j+1)+'分';
            var s = { content:c, num: data_i[j].answerNum };
            item.push(s);
          }
          this.excel.push(item);
        } 
        else if(data[i].question.type===1){
          var data_i = data[i].optionList;
          var item = [];
          // var c={content:'',num:''}
          // item.push(c);
          var c={content:'第'+(i+1)+'题 多选题',num:'题目内容:'+data[i].question.content};
          item.push(c);
          c={content:'选项内容',num:'选择人数'}
          item.push(c)
          for (let j = 0; j < data_i.length; j++) {
            var s = { content: data_i[j].content, num: data_i[j].answerNum };
            item.push(s);
          }
          this.excel.push(item);
        }
        else {
          var data_i = data[i].optionList;
          var item = [];
          // var c={content:'',num:''}
          // item.push(c);
          var c={content:'第'+(i+1)+'题 单选题',num:'题目内容:'+data[i].question.content};
          item.push(c);
          c={content:'选项内容',num:'选择人数'}
          item.push(c)
          for (let j = 0; j < data_i.length; j++) {
            var s = { content: data_i[j].content, num: data_i[j].answerNum };
            item.push(s);
          }
          this.excel.push(item);
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
      console.log(wb.Sheets.Sheet1)
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
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
    initStates(){
      for(var i=0;i<this.data.length;i++){
        this.states[i]=0;
      }
      this.s.states=this.states;
    },
    setStates(index,num){
      this.$set(this.states, index, num);
    },
    getCompletionData(data) {
      for (var i = 0; i < this.data.length; i++) {
        if (data[i].question.type === 2) {
          // console.log(11)
          var data_i = data[i].answerList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            var s = { id: j + 1, content: data_i[j].content };
            item.push(s);
          }
          this.completion.push(item);
        }
        else if(data[i].question.type === 3){
          var data_i = data[i].optionList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            var c=''+(j+1)+'分';
            var s = { content:c, num: data_i[j].answerNum };
            item.push(s);
          }
          this.completion.push(item);
        } 
        else {
          var data_i = data[i].optionList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            var s = { content: data_i[j].content, num: data_i[j].answerNum };
            item.push(s);
          }
          this.completion.push(item);
        }
      }
    },
    getBarData(data) {
      // console.log(data);
      for (var i = 0; i < data.length; i++) {
        // console.log(111)
        // console.log(data[i].question.type)
        if (data[i].question.type === 2) {
          // console.log(11)
          var data_i = data[i].answerList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            // var s=[data_i[j].answerNum,data_i[j].content]
            item.push(data_i[j]);
          }
          // console.log(item)
          this.bar.push(item);
        } 
        else if(data[i].question.type === 3){
          var data_i = data[i].optionList;
          var item = [];
          
          for (let j = 0; j < data_i.length; j++) {
            var c=''+(j+1)+'分';
            var s = [data_i[j].answerNum, c];
            console.log(c);
            item.push(s);
          }
          this.bar.push(item);
        }
        else {
          var data_i = data[i].optionList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            var s = [data_i[j].answerNum, data_i[j].content];
            item.push(s);
          }
          this.bar.push(item);
          // console.log(item)
          // console.log(22)
        }
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
          'Authorization': window.localStorage.getItem("authorization"),
          // "Content-Type": "application/json",
        },
      }).then((res) => {
        var data = res.data.data;
        console.log(res);
        this.data = data;
        this.getBarData(data);
        this.getColData(data);
        this.getPieData(data);
        this.getLineData(data);
        this.getCompletionData(data);
        this.initStates();
        this.getExcelData();
      });
    },
    getAnswerData(){
      var Data=new FormData();
      Data.append("id",this.id);
      axios({
        url:'https://www.azur1tee.top/api/answer/get_result_by_questionnaire',
        method:'post',
        data:Data,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
        },
      }).then((res)=>{
        var data=res.data.data;
        this.answerData=data.answerInfo;
        // console.log(data)
        // console.log(res);
        // this.getAnswerData(data);
        this.getAnswerExcel(data);
      })
    },
    getAnswerExcel(data){
      console.log(1111);
      console.log(data);
      var answerInfo=data.answerInfo;
      var questionInfo=data.questionInfo;
      console.log(answerInfo);
      console.log(questionInfo)
      var item1=[];
      var c={content:'',num:''}
      item1.push(c);
      c={content:'',num:''}
      item1.push(c);
      c={content:'',num:''}
      item1.push(c);
      c={content:'',num:''}
      item1.push(c);
      console.log(answerInfo.length)
      for (var i=0;i<answerInfo.length;i++){
        var item=[];
        var number1=answerInfo[i].answerList;
        c={content:'第'+(i+1)+'份问卷',num:''};
        item.push(c);
        // console.log(number1.length)
        console.log(i);
        for(var j=0;j<number1.length;j++){
          
          if(questionInfo[j].info.type===0){
            c={content:''+(j+1)+'.单选题',num:'题目内容:'+questionInfo[j].info.content};
            item.push(c);
            var t=number1[j].number-'0';
            c={content:'所选内容',num:''+questionInfo[j].optionList[t].content}
            item.push(c)
          }
          else if(questionInfo[j].info.type===1){
            c={content:''+(j+1)+'.多选题',num:'题目内容:'+questionInfo[j].info.content};
            item.push(c);
            var ss='';
            // console.log(number1[j].number.length)
            for(var t=0;t<number1[j].number.length;t++){
              if(ss.length==0){
                ss=questionInfo[j].optionList[number1[j].number[t]-'0'].content
              }
              else{
                ss+='、'+questionInfo[j].optionList[number1[j].number[t]-'0'].content;
              }
            }
            // console.log(ss);
            c={content:'所选内容',num:ss}
            item.push(c)
          }
          else if(questionInfo[j].info.type===2){
            c={content:''+(j+1)+'.填空题',num:'题目内容:'+questionInfo[j].info.content};
            item.push(c);
            c={content:'作答内容',num:number1[j].content}
            item.push(c)
          }
          else{
            c={content:''+(j+1)+'.评分题',num:'题目内容:'+questionInfo[j].info.content};
            item.push(c);
            var t=number1[j].number-'0'+1;
            c={content:'所选内容',num:''+t+'星'}
            item.push(c)
          }
        }
      this.answer.push(item) 
      console.log(item)
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
        if (data[i].question.type == 2) {
          var data_i = data[i].answerList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            // var s=[data_i[j].answerNum,data_i[j].content]
            item.push(data_i[j]);
          }
          this.col.push(item);
        } 
        else if(data[i].question.type==3){
          var data_i = data[i].optionList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            s=''+(j+1)+'分'
            var s = { 选项: s, 数量: data_i[j].answerNum };
            item.push(s);
          }
          this.col.push(item);
        }
        else {
          var data_i = data[i].optionList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            var ss=data_i[j].content;
            if(ss.length>5){
              ss=ss.slice(0,5)+'...'
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
        if (data[i].question.type == 2) {
          var data_i = data[i].answerList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            // var s=[data_i[j].answerNum,data_i[j].content]
            item.push(data_i[j]);
          }
          this.pie.push(item);
        }else if(data[i].question.type == 3){
          var data_i = data[i].optionList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            var c=''+(j+1)+'分'
            var s = { value: data_i[j].answerNum, name: c };
            item.push(s);
          }
          this.pie.push(item);
        } 
        else {
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
        if (data[i].question.type == 2) {
          var data_i = data[i].answerList;
          var item = [];
          this.line.push(item);
        }else if(data[i].question.type == 3){
          var data_i = data[i].optionList;
          var item = [];
          var col1 = [];
          var col2 = [];
          for (let j = 0; j < data_i.length; j++) {
            // var s={value:data_i[j].answerNum,name:data_i[j].content}
            var c=''+(j+1)+'分';
            col1.push(c);
            col2.push(data_i[j].answerNum);
          }
          item.push(col1);
          item.push(col2);
          this.line.push(item);
        } 
        else {
          var data_i = data[i].optionList;
          var item = [];
          var col1 = [];
          var col2 = [];
          for (let j = 0; j < data_i.length; j++) {
            // var s={value:data_i[j].answerNum,name:data_i[j].content}
            var ss=data_i[j].content;
            if(ss.length>5){
              ss=ss.slice(0,5)+'...'
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
