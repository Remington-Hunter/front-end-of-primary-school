<template>
  <div>
    <div class="tabs">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="编辑"
          name="first"
        >
          <normal />
        </el-tab-pane>

        <el-tab-pane
          label="投放"
          name="second"
        >
          <send />
        </el-tab-pane>

        <el-tab-pane
          label="统计"
          name="third"
          :disabled=true
        >待完成</el-tab-pane>
      </el-tabs>
      <el-row style='position: absolute;right:100px;top:12vh;'>
        <el-button
          type="primary"
          plain
        >保存</el-button>
        <el-button
          type="primary"
          plain
        >预览</el-button>
        <el-button
          v-if="state"
          type="primary"
          icon="el-icon-pause"
          plain
        >暂停回收</el-button>
        <el-button
          v-else
          type="primary"
          icon="el-icon-video-play"
          plain
        >开始回收</el-button>
        <el-button
          type="primary"
          plain
        >导出PDF<i class="el-icon-download el-icon--right"></i></el-button>
        <el-button
          type="primary"
          plain
        >返回</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
import Normal from "./Normal.vue"
import Send from "./Send.vue"
import axios from 'axios';
export default {
  components: {
    Normal,
    Send
  },
  data() {
    return {
      activeName: 'first',
      input: "https://wj.qq.com/s2/8918766/dd18/",
      lianjie: "",
      state: false
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name == 'second') {
        // 触发事件
        this.send_ID();
      }
    },
    send_ID() {
      var data1 = new FormData();
      data1.append("id", window.localStorage.getItem("user_id"));
      axios({
        url: "http://82.157.97.70/api/questionnaire/get_link",
        method: "post",
        data: data1,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
        },
      }).then((res) => {
        console.log(res);
        this.input += 'http://82.157.97.70/vj/';
        this.input += res.data.data;
        this.lianjie = 'http://82.157.97.70/api/qrcode/getQRCode/?content=' + this.input + '&logoUrl=http://82.157.97.70/api/getIcon';
        //alert(this.input);
      });
    },
  }
};
</script>

<style scoped>
.tabs {
  padding: 0 54px;
  padding-top: 5vh;
}
</style>

<style>
.el-tabs__item {
  font-size: 18px !important;
}
.el-tabs__content {
  margin: 40px 100px;
  background-color: white;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
</style>