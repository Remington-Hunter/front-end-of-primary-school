<template>
  <div class=''>
    <div v-for="(item,index) in source1" :key="(item,index)">
      <div>{{index+1}}:{{item.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data1:{
      type:Array,
      default: () => {
        return [];
      },
    }
  },
  data () {
    return {
      source1:this.data1
    };
  },
  methods: {
    
  },
  mounted(){
    // console.log("12e2141")
    // console.log(this.source1)
    // console.log(this.source1.length)
  }
};
</script>

<style lang='scss' scoped>

</style>