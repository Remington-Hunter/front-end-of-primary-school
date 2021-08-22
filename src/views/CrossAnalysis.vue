<template>
  <div class="analysis">
    <div v-for="(item, index) in series" :key="(item, index)">
      <div style="width: 600px; height: 400px">
        <drawBar :id="BarToString(index)"></drawBar>
      </div>
      <el-button @click="goto(1)" >
          <span>折线图</span>
        <div style="width: 600px; height: 400px" v-if="id===1">
          <drawLine :id="LineToString(index)"></drawLine>
        </div>
      </el-button>
      <el-button @click="goto(2)">
        <span>饼图</span>
        <div style="width: 600px; height: 400px" v-if="id===2">
          <drawPie :id="PieToString(index)"></drawPie>
        </div>
      </el-button>
      <el-button @click="goto(3)">
          <span>柱状图</span>
        <div style="width: 600px; height: 400px" v-if="id===3">
          <drawCol :id="ColToString(index)"></drawCol>
        </div>
      </el-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import drawLine from "../components/DrawLine.vue";
import drawPie from "../components/DrawPie.vue";
import drawBar from "../components/DrawBar.vue";
import drawCol from "../components/DrawCol.vue";
export default {
  data() {
    return {
      series: ["1", "2"],
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
  created: {},
  mounted() {
    // this.getseries();
    this.drawfunc1();
    this.drawfunc2();
    this.drawfunc3();
    this.drawfunc4();
  },
  methods: {
      goto(id){
          this.id=id
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
  },
};
</script>

<style lang='scss' scoped>
</style>