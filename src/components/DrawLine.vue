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
    // console.log(this.id)
    this.drawfunc()
  },
  methods: {
      drawfunc() {
      let myChart = this.$echarts.init(document.getElementById(this.id));
      var option = {
        xAxis: {
          type: "category",
          data: this.source1[0],
          nameLocation:'end',//坐标轴名称显示位置。
            axisLabel : {//坐标轴刻度标签的相关设置。
                interval:0,
                rotate:"45"
            }
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.source1[1],
            type: "line",
            color:'#008fff'
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