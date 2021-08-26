<template>
  <div class="">
      <div :id="id" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
    //   default: "单选题",
    },
    series: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      source1:this.series,

    };
  },
  // components: {},
  // created: {},
  mounted() {
    //   alert(111)
    console.log(111241241)
    console.log(this.source1)
    this.drawfunc()
  },
  methods: {
      drawfunc() {
        let myChart = this.$echarts.init(document.getElementById(this.id));

      var option = {
        legend: {},
        tooltip: {},
        dataset: {
          // 这里指定了维度名的顺序，从而可以利用默认的维度到坐标轴的映射。
          // 如果不指定 dimensions，也可以通过指定 series.encode 完成映射，参见后文。
          dimensions: ["选项", "数量"],
          source: this.source1
          //     [
          //   { product: "Matcha Latte", 2015: 43.3 },
          //   { product: "Milk Tea", 2015: 83.1 },
          //   { product: "Cheese Cocoa", 2015: 86.4 },
          //   { product: "Walnut Brownie", 2015: 72.4 },
          // ],
        },
        xAxis: { type: "value",
        // nameLocation:'end',//坐标轴名称显示位置。
        //     axisLabel : {//坐标轴刻度标签的相关设置。
        //         interval:0,
        //         rotate:"45"
        //     }
        },
        yAxis: {type: "category"},
        series: [
          { type: "bar" ,barWidth : 40,color:'#008fff'},
          // {type: 'bar'},
          // {type: 'bar'}
          // barWidth : 30,
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      // let myChart = this.$echarts.init(document.getElementById(this.id));
      // // var v1,v2;
      // dimensions
      // // 指定图表的配置项和数据
      // var option = {
      //   dataset: {
      //     // dimensions: ["数量","选项" ],
      //     source:this.source1
      //     //     [
      //     //   ["score", "amount", "product"],
      //     //   [89.3, 58212, "Matcha Latte"],
      //     //   [57.1, 78254, "Milk Tea"],
      //     //   [74.4, 41032, "Cheese Cocoa"],
      //     //   [50.1, 12755, "Cheese Brownie"],
      //     //   [89.7, 20145, "Matcha Cocoa"],
      //     //   [68.1, 79146, "Tea"],
      //     //   [19.6, 91852, "Orange Juice"],
      //     //   [10.6, 101852, "Lemon Juice"],
      //     //   [32.7, 20112, "Walnut Brownie"],
      //     // ],
      //   },
      //   grid: { containLabel: true },
      //   xAxis: {
      //     // nameLocation:'end',//坐标轴名称显示位置。
      //     //   axisLabel : {//坐标轴刻度标签的相关设置。
      //     //       interval:0,
      //     //       rotate:"45"
      //     //   }
      //   },
      //   yAxis: { type: "category"},
      //   series: [
      //     {
      //       type: "bar",
      //       encode: {
      //         // 将 "amount" 列映射到 X 轴。
      //         x: this.source1[0][1],
      //         // 将 "product" 列映射到 Y 轴。
      //         y: this.source1[0][0],
      //       },
      //       barWidth : 40,
      //       color:'#008fff'
      //     },
      //   ],
      // };
      // // 使用刚指定的配置项和数据显示图表。
      // myChart.setOption(option);
    },
  },
};
</script>

<style lang='scss' scoped>
</style>