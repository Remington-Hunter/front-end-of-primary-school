<template>
  <div class="">
      <div :id="id" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
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