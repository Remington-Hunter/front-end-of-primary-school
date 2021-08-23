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
    <div id="demo1">
      <div v-for="(item, index) in data" :key="(item, index)">
        <div v-if="data[index].question.type === 2">
          <div>题目{{ index + 1 }}</div>
          <Completion :data1="bar[index]"></Completion>
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
            <div style="width: 600px; height: 400px" v-if="id === 1">
              <drawLine
                :id="LineToString(index)"
                :series="line[index]"
              ></drawLine>
            </div>
            <div style="width: 600px; height: 400px" v-if="id === 2">
              <drawPie :id="PieToString(index)" :series="pie[index]"></drawPie>
            </div>
            <div style="width: 600px; height: 400px" v-if="id === 3">
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
              <!-- <el-table-column
                label="content"
                width="180">
                <template slot-scope="scope1">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope1.row.content }}</span>
                </template>
              </el-table-column> -->
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
  created() {
    this.id = this.$route.params.id;
    console.log(this.id);
    this.getseries();
  },
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
        } else {
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
    //     exportExcel() {
    //       require.ensure([], () => {
    // 　　　　　　　　const { export_json_to_excel } = require('../excel/Export2Excel');
    // 　　　　　　　　const tHeader = ['序号', 'IMSI', 'MSISDN', '证件号码', '姓名'];
    // 　　　　　　　　const filterVal = ['ID', 'imsi', 'msisdn', 'address', 'name'];
    // 　　　　　　　　const list = this.tableData;
    // 　　　　　　　　const data = this.formatJson(filterVal, list);
    // 　　　　　　　　export_json_to_excel(tHeader, data, '列表excel');
    // 　　　　　　})
    //     },
    //     formatJson(filterVal, jsonData) {
    // 　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
    // 　　　　},
    goto(id) {
      this.id = id;
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
