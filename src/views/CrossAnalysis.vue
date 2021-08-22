<template>
  <div class="analysis">
    <div id="func1" style="width: 600px; height: 400px"></div>
    <div id="func2" style="width: 600px; height: 400px"></div>
    <div id="func3" style="width: 600px; height: 400px"></div>
    <div id="func4" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      source: [],
      msg1: "饼状图",
      id:'',
    };
  },
  components: {},
  created: {},
  mounted() {
    this.getseries();
    this.drawfunc1();
    this.drawfunc2();
    this.drawfunc3();
    this.drawfunc4();
  },
  methods: {
    getseries() {
        var Data=new FormData();
        Data.append('id',this.id);
        axios({
            url:'http://82.157.97.70/api/questionnaire/',
            method:'post',
            data:Data,
        }).then((res)=>{
            console.log(res);
            
        })
    },
    drawfunc1() {
      let myChart = this.$echarts.init(document.getElementById("func1"));
      // 绘制图表
      myChart.setOption({
        title: { text: "饼状图" },
        tooltip: {},

        series: [
          {
            name: "访问来源",
            type: "pie", // 设置图表类型为饼图
            radius: "55%", // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data: [
              // 数据数组，name 为数据项名称，value 为数据项值
              { value: 235, name: "视频广告" },
              { value: 274, name: "联盟广告" },
              { value: 310, name: "邮件营销" },
              { value: 335, name: "直接访问" },
              { value: 400, name: "搜索引擎" },
              //   { value: 400, name: "搜索引擎1" },
            ],
          },
        ],
      });
    },
    drawfunc2() {
      let myChart = this.$echarts.init(document.getElementById("func2"));
      // 绘制图表
      var option = {
        legend: {},
        tooltip: {},
        dataset: {
          // 这里指定了维度名的顺序，从而可以利用默认的维度到坐标轴的映射。
          // 如果不指定 dimensions，也可以通过指定 series.encode 完成映射，参见后文。
          dimensions: ["product", "2015"],
          source: [
            { product: "Matcha Latte", 2015: 43.3 },
            { product: "Milk Tea", 2015: 83.1 },
            { product: "Cheese Cocoa", 2015: 86.4 },
            { product: "Walnut Brownie", 2015: 72.4 },
          ],
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [
          { type: "bar" },
          // {type: 'bar'},
          // {type: 'bar'}
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    drawfunc3() {
      let myChart = this.$echarts.init(document.getElementById("func3"));

      // 指定图表的配置项和数据
      var option = {
        dataset: {
          source: [
            ["score", "amount", "product"],
            [89.3, 58212, "Matcha Latte"],
            [57.1, 78254, "Milk Tea"],
            [74.4, 41032, "Cheese Cocoa"],
            [50.1, 12755, "Cheese Brownie"],
            [89.7, 20145, "Matcha Cocoa"],
            [68.1, 79146, "Tea"],
            [19.6, 91852, "Orange Juice"],
            [10.6, 101852, "Lemon Juice"],
            [32.7, 20112, "Walnut Brownie"],
          ],
        },
        grid: { containLabel: true },
        xAxis: {},
        yAxis: { type: "category" },
        series: [
          {
            type: "bar",
            encode: {
              // 将 "amount" 列映射到 X 轴。
              x: "amount",
              // 将 "product" 列映射到 Y 轴。
              y: "product",
            },
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    drawfunc4() {
      let myChart = this.$echarts.init(document.getElementById("func4"));
      var option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [450, 232, 301, 734, 1090, 830, 500],
            type: "line",
          },
        ],

      };
      myChart.setOption(option);
    },
  },
};
</script>

<style lang='scss' scoped>
</style>