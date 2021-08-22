<template>
  <div>
    <el-container style="height: 500px;">
      <el-aside width="200px">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>题目控件</template>
            <el-menu-item index="1-1">单选题</el-menu-item>
            <el-menu-item index="1-2">多选题</el-menu-item>
            <el-menu-item index="1-3">评分题</el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>

      <el-container>

        <el-main>
          <el-table :data="tableData">

          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item)
    }
  },
  methods: {

  },
};
</script>

<style >
.v-application ul,
.v-application ol {
  padding-left: 0 !important;
}
</style>