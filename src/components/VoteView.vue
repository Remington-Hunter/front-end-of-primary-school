<template>
  <div class="analysis">
    <!-- <el-button type="primary" @click="exportData" style="display:block; margin:5px auto;">导出Excel表格</el-button> -->

    <span
      >问卷标题
      <span style="font-size: small">ID:{{ "问卷ID" }}</span>
    </span>
    <div style="padding: 10px">
      <el-button type="primary" @click="handleDown">数据分析PDF下载</el-button>
      <!-- <el-button type="primary" @click="handleWindowPrint( '#demo', '离职申请表' )">浏览器方式下载</el-button> -->
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-back"
        @click="goBack"
        >返回
      </el-button>
    </div>
    <div id="demo1" style="">
      <div v-for="(item, index) in data" :key="(item, index)">
        <div v-if="data[index].question.type === 2">
          <div>题目{{ index + 1 }}</div>
          <Completion :data1="completion[index]"></Completion>
        </div>
        <div v-else>
          <div v-if="bar[index].length !== 0">
            <div>题目{{ index + 1 }}</div>
            <div style="width: 600px; height: 400px">
              <drawBar :id="BarToString(index)" :series="bar[index]"></drawBar>
            </div>
            <el-button @click="goto(1)">
              <span>折线图</span>
            </el-button>
            <el-button @click="goto(2)">
              <span>饼图</span>
            </el-button>
            <el-button @click="goto(3)">
              <span>柱状图</span>
            </el-button>
            <div style="width: 600px; height: 400px" v-if="type === 1">
              <drawLine
                :id="LineToString(index)"
                :series="line[index]"
              ></drawLine>
            </div>
            <div style="width: 600px; height: 400px" v-if="type === 2">
              <drawPie :id="PieToString(index)" :series="pie[index]"></drawPie>
            </div>
            <div style="width: 600px; height: 400px" v-if="type === 3">
              <drawCol :id="ColToString(index)" :series="col[index]"></drawCol>
            </div>
          </div>
          <div v-else>题目{{ index + 1 }}的数据为空</div>
        </div>
      </div>
      <div>
        <div v-for="(item, index) in col" :key="(item, index)">
          <div v-if="data[index].question.type === 2">
            <div>题目{{ index + 1 }}</div>
            <el-table :data="completion[index]" style="width: 100%">
              <el-table-column label="id" width="180">
                <template slot-scope="scope">
                  <!-- <i class="el-icon-time"></i> -->
                  <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="content" width="180">
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
            <div>题目{{ index + 1 }}</div>
            <el-table :data="completion[index]" style="width: 100%">
              <el-table-column label="content" width="180">
                <template slot-scope="scope2">
                  <!-- <i class="el-icon-time"></i> -->
                  <span style="margin-left: 10px">{{
                    scope2.row.content
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="num" width="180">
                <template slot-scope="scope3">
                  <!-- <i class="el-icon-time"></i> -->
                  <span style="margin-left: 10px">{{ scope3.row.num }}</span>
                </template>
              </el-table-column>
            </el-table>
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
      type:1
    };
  },
  components: {
    drawLine,
    drawPie,
    drawBar,
    drawCol,
    Completion,
  },
  //   created() {},
  // created() {
  //   this.id = this.$route.params.id;
  //   console.log(this.id);
  //   this.getseries();
  // },
  mounted() {
        this.id = this.$route.params.id;
    this.getseries();
  },
  methods: {
    getCompletionData(data) {
      for (var i = 0; i < data.length; i++) {
        // console.log(111)
        // console.log(data[i].question.type)
        if (data[i].question.type === 2) {
          // console.log(11)
          var data_i = data[i].answerList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            var s = { id: j + 1, content: data_i[j].content };
            item.push(s);
          }
          // console.log(item)
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
    },
    getBarData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].question.type === 2) {
          var data_i = data[i].answerList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            item.push(data_i[j]);
          }
          this.bar.push(item);
        } else {
          var data_i = data[i].optionList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            var s = [data_i[j].answerNum, data_i[j].content];
            item.push(s);
          }
          this.bar.push(item);
        }
      }
    },
    getseries() {
      var Data = new FormData();
      Data.append("id", this.id);
      axios({
        url: "http://82.157.97.70/api/answer/get_result",
        method: "post",
        data: Data,
      }).then((res) => {
        var data = res.data.data;
        console.log(res);
        this.data = data;
        this.getBarData(data);
        this.getColData(data);
        this.getPieData(data);
        this.getLineData(data);
        this.getCompletionData(data);
      });
    },
    goto(type) {
      // this.getseries()
      this.type = type;
      console.log(121);
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
        } else {
          var data_i = data[i].optionList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            var s = { 选项: data_i[j].content, 数量: data_i[j].answerNum };
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
        if (data[i].question.type == 2) {
          var data_i = data[i].answerList;
          var item = [];
          this.line.push(item);
        } else {
          var data_i = data[i].optionList;
          var item = [];
          var col1 = [];
          var col2 = [];
          for (let j = 0; j < data_i.length; j++) {
            // var s={value:data_i[j].answerNum,name:data_i[j].content}
            col1.push(data_i[j].content);
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

<style lang="scss" scoped></style>
