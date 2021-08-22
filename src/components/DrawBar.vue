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
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  // components: {},
  // created: {},
  mounted() {
    //   alert(111)
    console.log(this.id)
    this.drawfunc()
  },
  methods: {
      drawfunc() {
      let myChart = this.$echarts.init(document.getElementById(this.id));

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
  },
};
</script>

<style lang='scss' scoped>
</style>