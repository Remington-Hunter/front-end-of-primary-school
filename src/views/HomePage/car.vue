<template>
  <v-carousel
    cycle
    height="400"
    :interval="2500"
    hide-delimiter-background
    :show-arrows="false"
    id="building"
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        height="100%"
        id="a"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <p class="text-h3">
            {{ slide[0] }}
          </p>
          <p class="text-h6">
            {{ slide[1] }}
          </p>
          <img :src="slide[2]">
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        ['多方式创建编辑问卷', '自由创建、导入问卷、使用模板三种方式随意选择', require("../../assets/pic/1.png")],
        ['简约好用的问卷系统', '简约好用，轻松开启在线调试', require("../../assets/pic/2.png")],
        ['数据实时在线统计分析', '回收数据实时在线统计，图表化展示，清晰直观', require("../../assets/pic/3.png")],
      ],
    }
  },
}
</script>

<style scoped>
#building {
  background: url("../../assets/pic/car.jpg");
  width: 100%;
  height: 100%;
  position: relative;
  background-size: 100% 100%;
}
#a {
  background-color: rgba(0, 0, 0, 0);
  border-color: #ffffff;
  color: rgba(255, 255, 255, 0.87);
}
.row {
  flex-direction: column;
}
</style>