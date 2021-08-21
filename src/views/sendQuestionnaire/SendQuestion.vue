<template>
  <div>
    <div style="margin-top: 1%; float: right">
      <v-btn style="width: 80%">
        <v-icon>mdi-eye</v-icon>
        预览问卷
      </v-btn>
    </div>
    <div style="margin-left: 20%; padding-top: 5%">
      <v-card class="question" style="text-align: center; display: block">
        <span>问卷链接与二维码</span>
        <el-input
          v-model="input"
          style="margin-top: 1%; width: 50%; display: inline-block"
        ></el-input>
        <v-img
          max-height="200"
          max-width="200"
          height="150"
          width="170"
          v-bind:src="lianjie"
          style="display: block"
        ></v-img>
        <!-- 转换成二维码链接地址只需更改这个src属性 -->
      </v-card>
    </div>
    <v-btn @click="send_ID()">发布问卷</v-btn>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
        input: "",
        lianjie: "",
    };
  },
  methods: {
    change_lianjie() {
      this.lianjie = "https://picsum.photos/id/11/500/300";
      alert(this.lianjie);
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
        this.lianjie = 'http://82.157.97.70/api/qrcode/getQRCode/?content='+this.input+'&logoUrl=http://82.157.97.70/api/getIcon';
        //alert(this.input);
      });
      
    },
  },
};
</script>


<style>
.v-btn__content {
  color: #1ea0fa;
}
.question {
  width: 80%;
  height: 200% !important;
}
</style>