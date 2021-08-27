<template>
  <div>
    <el-container>
      <el-aside style="width:120px">
        <el-menu active-text-color="#1296db">
          <el-menu-item
            index="1"
            @click="goto(1)"
          >
            <span class="item-content"><span class="text">回收数据</span></span>
          </el-menu-item>

          <el-menu-item
            index="2"
            @click="goto(2)"
          >
            <span class="item-content">
              <p class="text">统计图表</p>
            </span>
          </el-menu-item>

          <el-menu-item
            index="3"
            @click="goto(3)"
          >
            <span class="item-content"><span class="text">交叉分析</span></span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <anlysis
          :num="num"
          v-if="this.num<3"
        />
        <cross v-if="this.num===3" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import anlysis from "./CrossAnalysis.vue";
import cross from "./getCrossAnalysis.vue"
export default {
  components: {
    anlysis,
    cross,
  },
  data() {
    return {
      id: '',
      num: 2,
    }
  },
  methods:
  {
    goto(index) {
      this.num = index;
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    // this.getseries();
    // this.getAnswerData();
  },
}
</script>

<style>
.v-application ul,
.v-application ol {
  padding-left: 0px;
}
.v-application p {
  margin-bottom: 0;
}
</style>

<style scoped>
.el-menu-item {
  position: relative;
  display: block;
  height: 120px;
  width: 120px;
  color: #333333;
  text-align: center;
  text-decoration: none;
}
.item-content {
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  white-space: nowrap;
}
.text {
  line-height: 20px;
}
</style>