<template>
  <div class=''>
    <!-- <div v-for="(item,index) in source1" :key="(item,index)">
      
      <div>{{index+1}}:{{item.content}}</div>
    </div> -->
    <el-table
        :data="data1"
        style="width: 100%">
        <el-table-column
          label="id"
          width="180">
          <template slot-scope="scope">
            <!-- <i class="el-icon-time"></i> -->
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="content"
          width="180">
          <template slot-scope="scope1">
            <!-- <i class="el-icon-time"></i> -->
            <span style="margin-left: 10px">{{ scope1.row.content }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="content"
          width="180">
          <template slot-scope="scope1">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope1.row.content }}</span>
          </template>
        </el-table-column> -->
      </el-table>
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