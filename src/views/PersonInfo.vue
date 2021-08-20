<template>
  <el-container>
    <el-aside style="width:250px">

      <el-menu :unique-opened="true">
        <el-menu-item
          index="1"
          @click="goTo('/personinfo/profile')"
        >
          <i class="el-icon-document-copy"></i>
          <span slot="title">我的资料</span>
        </el-menu-item>

        <el-menu-item
          index="2"
          @click="goTo('/personinfo/changepw')"
        >
          <i class="el-icon-edit"></i>
          <span slot="title">修改密码</span>
        </el-menu-item>

      </el-menu>

    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
export default
  {
    methods:
    {
      goTo(path) {
        this.$router.replace(path);
      }
    }
  }

</script>

<style scoped>
</style>
