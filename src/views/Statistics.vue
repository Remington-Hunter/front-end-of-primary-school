<template>
  <div>
    <el-container>
      <el-aside style="width:120px;position:fixed;">
        <el-menu
          active-text-color="#1296db"
          style="height:100vh"
        >
          <el-menu-item
            index="1"
            @click="goto(1)"
          >
            <div class="item-content">
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-icon_gerenpingjibaogao"></use>
              </svg>
              <p class="s-text">回收数据</p>
            </div>
          </el-menu-item>

          <el-menu-item
            index="2"
            @click="goto(2)"
          >
            <div class="item-content">
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-icon_shanghupingji"></use>
              </svg>
              <p class="s-text">统计图表</p>
            </div>
          </el-menu-item>

          <el-menu-item
            index="3"
            @click="goto(3)"
          >
            <div class="item-content">
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-icon_dashujujiaochayanzheng"></use>
              </svg>
              <p class="s-text">交叉分析</p>
            </div>
          </el-menu-item>

          <el-menu-item
            v-show="this.type==4"
            index="3"
            @click="goto(4)"
          >
            <div class="item-content">
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-icon_dilidingweijishu"></use>
              </svg>
              <p class="s-text">学生打卡</p>
            </div>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main style="margin-left:120px">
        <anlysis
          :num="num"
          v-if="this.num<3 ||this.num===4"
        />
        <cross v-if="this.num===3" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import anlysis from "./CrossAnalysis.vue";
import cross from "./getCrossAnalysis.vue";
export default {
  components: {
    anlysis,
    cross,
  },
  data() {
    return {
      type: '',
      id: '',
      num: 2,
      type: 0,
    }
  },
  methods:
  {
    goto(index) {
      this.num = index;
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
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
  flex-direction: column;
  display: flex;
  white-space: nowrap;
  padding-top: 25px;
}
/* .s-text {
  line-height: 20px;
} */
.el-aside {
  position: fixed;
}

.icon {
  margin: 0 auto;
  width: 40px;
  height: 40px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

