<template>
  <div class="analysis">
      <!-- <el-button @click="exportExcel">打印数据</el-button> -->
    <span
      >问卷标题
      <span style="font-size: small">ID:{{ "问卷ID" }}</span>
    </span>
    <div style="padding: 10px">
      <el-button type="primary" @click="handleDown"
        >PDF下载-离职申请表</el-button
      >
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
    <div id="demo">
      <div v-for="(item, index) in series" :key="(item, index)">
        <div>题目{{ index + 1 }}</div>
        <div style="width: 600px; height: 400px">
          <drawBar :id="BarToString(index)"></drawBar>
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
          <drawLine :id="LineToString(index)"></drawLine>
        </div>
        <div style="width: 600px; height: 400px" v-if="id === 2">
          <drawPie :id="PieToString(index)"></drawPie>
        </div>
        <div style="width: 600px; height: 400px" v-if="id === 3">
          <drawCol :id="ColToString(index)"></drawCol>
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
import Export2Excel from '@/excel/Export2Excel'
import Blob from '@/excel/Blob'
export default {
  data() {
    return {
      series: ["1", "2", "3"],
      msg1: "饼状图",
      id: 1,
    };
  },
  components: {
    drawLine,
    drawPie,
    drawBar,
    drawCol,
  },
//   created() {},
  mounted() {
    // this.getseries();
  },
  methods: {
    exportExcel() {
      require.ensure([], () => {
　　　　　　　　const { export_json_to_excel } = require('../excel/Export2Excel');
　　　　　　　　const tHeader = ['序号', 'IMSI', 'MSISDN', '证件号码', '姓名'];
　　　　　　　　const filterVal = ['ID', 'imsi', 'msisdn', 'address', 'name'];
　　　　　　　　const list = this.tableData;
　　　　　　　　const data = this.formatJson(filterVal, list);
　　　　　　　　export_json_to_excel(tHeader, data, '列表excel');
　　　　　　})
    },
    formatJson(filterVal, jsonData) {
　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
　　　　},
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
      htmlToPdf.downloadPDF(document.querySelector("#demo"), "数据分析");
    },
    goBack(){
        this.$router.go(-1)
    }
  },
};
</script>

<style lang='scss' scoped>
</style>