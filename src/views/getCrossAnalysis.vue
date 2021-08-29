<template>
  <div style="width:1000px;margin:20px auto">
    <el-card
      class="box-card"
      shadow="never"
    >
      <div
        slot="header"
        class="clearfix"
      >
        <span>交叉分析</span>
        <el-button
          style="float:right;padding:3px 0"
          type="text"
          @click="dialogVisible = true"
        >什么是交叉分析？</el-button>
      </div>
      <div style="padding: 0 30px">
        <div style="width:50%;float:left">
          <div style="padding-bottom:10px">定义行 <span class="sub">[一般为需要分析的题目，如爱好，意愿等]</span></div>
          <el-select
            v-model="v1"
            clearable
            filterable
            placeholder="请选择"
            style="width:80%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div style="width:50%;float:right">
          <div style="padding-bottom:10px">定义列 <span class="sub">[一般为样本属性，如性别，年龄等]</span></div>
          <el-select
            v-model="v2"
            filterable
            clearable
            placeholder="请选择"
            style="width:80%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <el-button
          type="primary"
          style="margin-top:20px;"
          @click="getAnalysis(v1, v2)"
        >开始分析</el-button>
      </div>
    </el-card>

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
          :label="item.label |ellipsis"
          align="center"
          :show-overflow-tooltip="true"
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
    <!-- <el-button type="primary" @click="chageType('bar')">条形图</el-button> -->
    <el-card
      :data="table1"
      border
      height="550px"
      style="width: 100%"
    >
      <div style="margin-bottom:20px">
        <el-button @click="chageType('line')">折线图</el-button>
        <el-button @click="chageType('bar')">柱状图</el-button>
        <el-button @click="chageType('radar')">雷达图</el-button>
        <el-button @click="chageType('row')">条形图</el-button>
      </div>
      <div>
        <div
          id="line"
          style="width: 600px; height: 400px;margin:0 auto"
          v-show="type=='line'"
        ></div>
        <div
          id="bar"
          style="width: 600px; height: 400px;margin:0 auto"
          v-show="type=='bar'"
        ></div>
        <div
          id="radar"
          style="width: 600px; height: 400px;margin:0 auto"
          v-show="type=='radar'"
        ></div>
        <div
          id="row"
          style="width: 600px; height: 400px;margin:0 auto"
          v-show="type=='row'"
        ></div>
      </div>
    </el-card>
    <el-dialog
      title="什么是交叉分析？"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <div class="c-text">{{ text }}</div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
// import DrawMoreCol from '@/components/DrawMoreCol'
import DrawMoreCol from "../components/DrawMoreCol.vue";
export default {
  components: {
    DrawMoreCol,
  },
  data() {
    return {
      id: 0,
      answer: [],
      answerData: [],
      options: [],
      v1: "",
      v2: "",
      data: [],
      ishow: false,
      table1: [],
      headArr: [],
      col: [],
      data1: [],
      type: 'bar',
      questionnaire_type:'',
      dialogVisible: false,
      text: "交叉分析法又称立体分析法，是在纵向分析法和横向分析法的基础上，从交叉、立体的角度出发，由浅入深、由低级到高级的一种分析方法。这种方法虽然复杂，但它弥补了“各自为政”分析方法所带来的偏差。 \n\n通常用于分析两个变量之间的关系，例如各个报纸阅读和年龄之间的关系。实际使用中我们通常把这个概念推广到行变量和列变量之间的关系，这样行变量可能有多个变量组成，列变量也可能有多个变量，甚至可以只有行变量没有列变量，或者只有列变量没有行变量。"
    };
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
  mounted() {
    console.log('ididid')
    this.id = this.$route.query.id;
    this.questionnaire_type = this.$route.query.type;
    console.log(this.id);
    this.getAnswerData();
  },
  methods: {
    renderHeader(h, { column }) {
      // h即为cerateElement的简写，具体可看vue官方文档
      console.log('这是一个很有意思的内容')
      var t=column.label;
      
      t=t.substring(0,t.length-3);
      console.log(t);
      for(var i=0;i<this.headArr.length;i++){
        if(this.headArr[i].label.indexOf(t)!=-1){
          t=this.headArr[i].label
        }
      }
      console.log(t)
      return h("div", [
        h("span", column.label),
        h(
          "el-tooltip",
          {
            props: {
              effect: "dark",
              content:
                t,
              placement: "top",
            },
          },
          [
            h("i", {
              class: "el-icon-warning-outline",
              style: "color:#999;margin-left:5px;cursor:pointer;",
            }),
          ],
          {
            content:
              "小时统计该时段整体数据，如当小时为9:00时，那统计的就是09:00-09:59时段的整体曝光量和设备屏数",
          }
        ),
      ]);
    },
    chageType(type) {
      this.type = type;
    },
    getString(str) {
      if (str.length > 10) {
        str = str.substring(0, 10) + "...";
      }
      return str;
    },
    getprops(data) {
      this.headArr = [];
      var data = this.data;
      var question2 = data.questionInfo[this.v2];
      var len = question2.optionList.length;
      var c = { label: "X/Y", prop: "0" };
      this.headArr.push(c);
      for (var i = 0; i < len; i++) {
        var s = "";
        if (question2.optionList[i].content == null) {
          s = "" + (i + 1) + "星";
        } else {
          s = question2.optionList[i].content;
        }
        c = { label: s, prop: (i + 1).toString() };
        this.headArr.push(c);
      }
      c = { label: "总计", prop: (len + 1).toString() };
      this.headArr.push(c);
      console.log('headarr');
      console.log(this.headArr)
    },
    tableRowClassName: function (obj) {
      if (obj.rowIndex % 2 == 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
      return "";
    },
    getAnswerData() {
      var Data = new FormData();
      Data.append("id", this.id);
      axios({
        url: "https://www.azur1tee.top/api/answer/get_result_by_questionnaire",
        method: "post",
        data: Data,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
        },
      }).then((res) => {
        var data = res.data.data;
        // for(var i=0;i<data.ans)
        this.answerData = data.answerInfo;
        this.data = data;
        this.getOptions();
      });
    },
    getOptions() {
      var data = this.data;
      //   var answerInfo=data.answerInfo;
      var questionInfo = data.questionInfo;
      for (var i = 0; i < questionInfo.length; i++) {
        if (questionInfo[i].info.type == 2 || questionInfo[i].info.type == 5 || questionInfo[i].info.type == 14 || questionInfo[i].info.type == 15) {
          continue;
        } else {
          var content = "" + (i + 1) + "." + questionInfo[i].info.content;
          if (content.length > 10) {
            content = content.substring(0, 10) + "...";
          }
          var c = { value: i, label: content };
        }
        this.options.push(c);
      }
    },
    getAnalysis(v1, v2) {

      this.table1 = [];
      var data = this.data;
      var question1 = data.questionInfo[v1];
      var question2 = data.questionInfo[v2];
      var answerData = data.answerInfo;
      var len = question2.optionList.length;
      var c = {};
      var type1 = question1.info.type
      var type2 = question1.info.type
      console.log('type1');
      console.log(type1);
      for (var i = 0; i < question1.optionList.length; i++) {
        c = {};
        if (question1.optionList[i].content == null) {
          c["0"] = "" + (i + 1) + "星";
        } else {
          c["0"] = question1.optionList[i].content;
        }
        var num = 0;
        var item = [];
        for (var j = 0; j < question2.optionList.length; j++) {
          var num1 = 0;
          var s1 = i.toString();
          if (question1.info.type == 3) {
            s1 = (i + 1).toString();
          }
          var s2 = j.toString();
          if (question2.info.type == 3) {
            s2 = (j + 1).toString();
          }
          for (var k = 0; k < answerData.length; k++) {
            if (answerData[k].answerList.length == 0) {
              continue;
            }
            if (
              answerData[k].answerList[v1].number.indexOf(s1) != -1 &&
              answerData[k].answerList[v2].number.indexOf(s2) != -1
            ) {
              num1++;
            }
          }
          item.push(num1);
          num += num1;
        }
        for (var j = 0; j < question2.optionList.length; j++) {
          var t = 0;
          if (num == 0) {
            t = 0.0;
          } else {
            t = (item[j] / num) * 100;
          }
          t = t.toFixed(2);
          var c1 = t;
          c[(j + 1).toString()] = "" + item[j] + "(" + c1 + ")" + "%";
        }
        c[(len + 1).toString()] = num;
        this.table1.push(c);
      }
      this.getprops();
      this.getCol();
      console.log(this.col);
    },
    getCol() {
      this.col = [];
      var data = this.data;
      var question2 = data.questionInfo[this.v2];
      var len = question2.optionList.length;
      var item = [];
      item.push("X/Y");
      for (var i = 0; i < len; i++) {
        var s = "";
        if (question2.optionList[i].content == null) {
          s = "" + (i + 1) + "星";
        } else {
          s = question2.optionList[i].content;
        }
        item.push(s);
      }
      this.col.push(item);
      // this.table1 = [];
      var data = this.data;
      var question1 = data.questionInfo[this.v1];
      var question2 = data.questionInfo[this.v2];
      var answerData = data.answerInfo;
      var len = question2.optionList.length;
      var c = {};
      // var item1 = [];
      for (var i = 0; i < question1.optionList.length; i++) {
        c = {};
        var item1 = [];
        if (question1.optionList[i].content == null) {
          // c["0"] = "" + (i + 1) + "星";
          item1.push("" + (i + 1) + "星");
        } else {
          // c["0"] = question1.optionList[i].content;
          var ss = question1.optionList[i].content;
            if (ss.length > 5) {
              ss = ss.slice(0, 5) + "...";
            }
          item1.push(ss);
        }
        var num = 0;
        var item = [];
        for (var j = 0; j < question2.optionList.length; j++) {
          var num1 = 0;
          var s1 = i.toString();
          if (question1.info.type == 3) {
            s1 = (i + 1).toString();
          }
          var s2 = j.toString();
          if (question2.info.type == 3) {
            s2 = (j + 1).toString();
          }
          for (var k = 0; k < answerData.length; k++) {
            if (answerData[k].answerList.length == 0) {
              continue;
            }
            if (
              answerData[k].answerList[this.v1].number.indexOf(s1) != -1 &&
              answerData[k].answerList[this.v2].number.indexOf(s2) != -1
            ) {
              num1++;
            }
          }
          item.push(num1);
          num += num1;
        }
        for (var j = 0; j < question2.optionList.length; j++) {
          var t = 0;
          if (num == 0) {
            t = 0.0;
          } else {
            t = (item[j] / num) * 100;
          }
          t = t.toFixed(2);
          item1.push(t);
        }
        this.col.push(item1);
      }
      console.log('col');
      console.log(this.col);

      this.drawfunc();
      this.drawfunc1();
      this.drawfunc2();
      this.drawfunc3();
    },
    getSeries(type) {
      this.data1 = [];
      for (var i = 0; i < this.col[0].length - 1; i++) {
        var c = { type: type, barWidth: 40 };
        this.data1.push(c);
      }
    },
    drawfunc() {
      var data1 = [];
      for (var i = 0; i < this.col[0].length - 1; i++) {
        var c = { type: 'bar' };
        data1.push(c);
      }
      let myChart = this.$echarts.init(document.getElementById('bar'));
      myChart.clear();
      // 指定图表的配置项和数据
      var option = {
        legend: {},
        tooltip: {},
        toolbox: {

          show: true,
          x: 'right',
          y:'120',
          feature: {
            mark: { show: true },
            // dataView: { show: true, readOnly: false },
            // restore: { show: true },
            saveAsImage: { show: true },
          }
        },
        dataset: {
          // 提供一份数据。
          source: this.col,
        },
        color: ['#009dff', '#40c45f', '#FFC851', '#5A5476', '#1869A0', '#FF9393'],
        // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        xAxis: { type: "category",
        nameLocation:'end',//坐标轴名称显示位置。
            axisLabel : {//坐标轴刻度标签的相关设置。
                interval:0,
                rotate:"45"
            }},
        // 声明一个 Y 轴，数值轴。
        yAxis: { type: "value", },
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        series: data1,
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    drawfunc1() {
      var data1 = [];
      for (var i = 0; i < this.col[0].length - 1; i++) {
        var c = { type: 'line' };
        data1.push(c);
      }
      let myChart = this.$echarts.init(document.getElementById('line'));
      myChart.clear();
      // 指定图表的配置项和数据
      var option = {
        legend: {},
        tooltip: {},
        toolbox: {

          show: true,
          x: 'right',
          y:'120',
          feature: {
            mark: { show: true, },
            
            // dataView: { show: true, readOnly: false },
            // restore: { show: true },
            saveAsImage: { show: true, },
          }
        },
        color: ['#009dff', '#40c45f', '#FFC851', '#5A5476', '#1869A0', '#FF9393'],
        dataset: {
          // 提供一份数据。
          source: this.col,
        },
        // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        xAxis: { type: "category",nameLocation:'end',//坐标轴名称显示位置。
            axisLabel : {//坐标轴刻度标签的相关设置。
                interval:0,
                rotate:"45"
            } },
        // 声明一个 Y 轴，数值轴。
        yAxis: {},
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        series: data1,
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    drawfunc2() {
      var c = [];
      for (var i = 1; i < this.headArr.length-1; i++) {
        var item = { text: this.headArr[i].label, max: 100 }
        c.push(item);
      }
      console.log(c);
      var data = [];
      for (var i = 1; i < this.col.length-1; i++) {
        var b = [];
        for (var j = 1; j < this.col[i].length; j++) {
          b.push(this.col[i][j]);
        }
        var item = { value: b, name: this.col[i][0] }
        data.push(item);
      }
      console.log(data);
      var name = [];
      for (var i = 0; i < this.col.length; i++) {
        name.push(this.col[i][0])
      }
      let myChart = this.$echarts.init(document.getElementById('radar'));
      myChart.clear();
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: 'item',
        },
        color: ['#009dff', '#40c45f', '#FFC851', '#5A5476', '#1869A0', '#FF9393'],
        legend: {
          orient: 'vertical',              //这里主要是标识不同颜色代表不同的同学
          x: 'right',
          y: 'bottom',
          // data:['A同学成绩 ', 'B同学成绩 ']
        },
        color: ['#009dff', '#40c45f', '#FFC851', '#5A5476', '#1869A0', '#FF9393'],
        toolbox: {

          show: true,
          x: 'right',
          y:'120',
          feature: {
            mark: { show: true },
            // dataView: { show: true, readOnly: false },
            // restore: { show: true },
            saveAsImage: { show: true },
          }
        },
        polar: [
          {
            indicator: c
          }
        ],
        series: [
          {
            type: 'radar',
            data: data
          }
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    drawfunc3() {
      var data1 = [];
      for (var i = 0; i < this.col[0].length - 1; i++) {
        var c = { type: 'bar' };
        data1.push(c);
      }
      let myChart = this.$echarts.init(document.getElementById('row'));
      myChart.clear();
      // 指定图表的配置项和数据
      var option = {
        legend: {},
        tooltip: {},
        toolbox: {

          show: true,
          x: 'right',
          y:'120',
          feature: {
            mark: { show: true },
            // dataView: { show: true, readOnly: false },
            // restore: { show: true },
            saveAsImage: { show: true },
          }
        },
        color: ['#009dff', '#40c45f', '#FFC851', '#5A5476', '#1869A0', '#FF9393'],
        dataset: {
          // 提供一份数据。
          source: this.col,
        },
        // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        xAxis: { type: "value", },
        // 声明一个 Y 轴，数值轴。
        yAxis: { type: 'category',nameLocation:'end',//坐标轴名称显示位置。
            axisLabel : {//坐标轴刻度标签的相关设置。
                interval:0,
                rotate:"45"
            } },
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        series: data1,
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>
<style scoped>
@import "../assets/css/icon/analysis.css";
</style>
    