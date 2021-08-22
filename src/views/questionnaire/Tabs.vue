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
          disabled="true"
        >待完成</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Normal from "./NormalQuestion.vue"
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
  background-color: white;
  padding: 24px 54px;
}
</style>

<style>
.el-tabs__item {
  font-size: 18px !important;
}
</style>