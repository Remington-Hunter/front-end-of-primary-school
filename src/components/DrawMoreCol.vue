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
      console.log('bar');
      console.log(this.series)
  },
  data() {
    return {
      source1:this.series,
      data1:[]
    };
  },
    methods:{
        
    }
}
</script>
<style lang="" scoped>
    
</style>