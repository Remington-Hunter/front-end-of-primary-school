<template>
    <div :id="this.id" style="width: 600px;height:400px;"></div>
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
  mounted(){
      this.getSeries();
      this.drawfunc();
      console.log(1111);
      console.log(this.series)
  },
  data() {
    return {
      source1:this.series,
      data1:[]
    };
  },
    methods:{
        getSeries(){
          
            console.log(this.source1.length);
            for (var i=0;i<this.source1.length-1;i++){
                var c={type: 'bar'}
                this.data1.push(c);
            }
            console.log(this.data1);
        },
        drawfunc(){
        let myChart = this.$echarts.init(document.getElementById(this.id));
 
        // 指定图表的配置项和数据
        var option = {
            legend: {},
            tooltip: {},
            dataset: {
                // 提供一份数据。
                source: this.source1
            },
            // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
            xAxis: {type: 'category'},
            // 声明一个 Y 轴，数值轴。
            yAxis: {},
            // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
            series: this.data1
        };
 
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        }
    }
}
</script>
<style lang="" scoped>
    
</style>