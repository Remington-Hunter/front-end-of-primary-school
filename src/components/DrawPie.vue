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
      source1:this.series
    };
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
      // 绘制图表
      myChart.setOption({
        title: { text: "饼状图" },
        tooltip: {},
        color:['#009dff', '#40c45f', '#FFC851','#5A5476','#1869A0','#FF9393'],
        series: [
          {
            name: "访问来源",
            type: "pie", // 设置图表类型为饼图
            radius: "55%", // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data:this.source1
            //     [
            //   // 数据数组，name 为数据项名称，value 为数据项值
            //   // { value: 235, name: "视频广告" },
            //   // { value: 274, name: "联盟广告" },
            //   // { value: 310, name: "邮件营销" },
            //   // { value: 335, name: "直接访问" },
            //   // { value: 400, name: "搜索引擎" },
            //   //   { value: 400, name: "搜索引擎1" },
            // ],
          },
        ],
      });
    },
  },
};
</script>

<style lang='scss' scoped>
</style>