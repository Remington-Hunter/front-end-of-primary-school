<template>
  <div class=''>
    <div v-for="(item,index) in data" :key="(item, index)">
      <div>{{item.id}}:{{item.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data:{
      type:Array,
      default: () => {
        return [];
      },
    }
  },
  data () {
    return {

    };
  },
  methods: {

  },
};
</script>

<style lang='scss' scoped>

</style>