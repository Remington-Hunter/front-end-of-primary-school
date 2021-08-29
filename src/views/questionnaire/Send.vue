<template>
  <div id="container">
    <div class="share-content">
      <h3 class="section-title">问卷链接</h3>
      <el-row>
        <el-col :span="4">
          <div class="qrcode">
            <v-img v-bind:src="lianjie"></v-img>
          </div>
        </el-col>
        <el-col
          :span="17"
          :offset="1"
        >
          <el-row>
            <el-col :span="16">
              <div class="ui-copy-text">
                <button
                  type="button"
                  class="ui-button"
                  id="btn"
                  v-clipboard:copy="input"
                  v-clipboard:success="onCopy"
                >复制
                </button>
                <div class="copy-text-input">
                  <input
                    id="demoInput"
                    type="text"
                    disabled=""
                    class="ui-input"
                    v-model="input"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="8"><a
                class="ui-button"
                target="_blank"
                :href="input"
              >打开</a></el-col>
          </el-row>
          <el-row>
<!--            <el-col :span="4"><a-->
<!--                class="ui-button"-->
<!--                id="down"-->
<!--                target="_blank"-->
<!--                :href="download_lianjie"-->
<!--              >下载二维码</a></el-col>-->
            <el-button
                @click="download_link()"
                style="font-size:16px;background:  #ffffff;color: #333333"
            >下载二维码</el-button>
            <el-button
              @click="get_new_link()"
              style="font-size:16px;background:  #ffffff;color: #333333"
            >获得新链接</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    ma: {
      type: String,
      defalut: ''
    },
    input: {
      type: String,
      defalut: 'https://www.azur1tee.top/vj/'
    },
    lianjie: {
      type: String,
      defalut: ''
    },
    download_lianjie: {
      type: String,
      defalut: ''
    },
  },
  data() {
    return {
      // download_lianjie: "",
      id: '',
    }
  },
  created() {
    this.id = this.$route.params.id;
    // this.get_link()
    // var ss = this.input
    // setTimeout(()=>{
    // this.download_lianjie = 'https://www.azur1tee.top/api/qrcode/downloadQRCode/?content=' + this.input + '&logoUrl=https://www.azur1tee.top/api/getIcon';
    // },1000)
    //     this.download_lianjie += 'https://www.azur1tee.top/vj/';
    //     this.download_lianjie += this.input;
  },
  mounted() {
    this.id = this.$route.query.id;
    // this.download_link();
    console.log(this.id);
  },
  methods: {
    downloadImg() {
      var oQrcode = document.querySelectorAll('.channelQrcode img')
      var url = oQrcode[0].src
      var a = document.createElement('a')
      var event = new MouseEvent('click')
      // 自定义下载后图片的名称
      a.download = '二维码'
      a.href = url
      a.dispatchEvent(event)
    },
    onCopy: function () {
      alert("复制成功")
    },
    download_link() {
      window.open(this.download_lianjie, '_blank');
    },
    get_link() {
      var data = new FormData();
      data.append("id", this.id);
      axios({
        url: "https://www.azur1tee.top/api/questionnaire/get_link",
        method: "post",
        data: data,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
        },
      }).then((res) => {
        console.log(res);
        this.input = 'https://www.azur1tee.top/vj/';
        this.input += res.data.data;
        this.ma = res.data.data;
        this.lianjie = 'https://www.azur1tee.top/api/qrcode/getQRCode?content=' + this.input + '&logoUrl=https://www.azur1tee.top/api/getIcon';
        this.download_lianjie = 'https://www.azur1tee.top/api/qrcode/downloadQRCode/?content=' + this.input + '&logoUrl=https://www.azur1tee.top/api/getIcon';
        // this.download_lianjie = 'https://www.azur1tee.top/api/qrcode/downloadQRCode/?content=' + this.input + '&logoUrl=https://www.azur1tee.top/api/getIcon';
        //alert(this.input);
        // this.download_lianjie = 'https://www.azur1tee.top/api/qrcode/downloadQRCode/?content=' + this.input + '&logoUrl=https://www.azur1tee.top/api/getIcon';
      });
    },
    get_new_link() {
      var data1 = new FormData();
      var questionnaireId = this.ma.split("_");
      data1.append("id", questionnaireId[0]);
      // alert(questionnaireId[0])
      axios({
        url: "https://www.azur1tee.top/api/questionnaire/get_new_link",
        method: "post",
        data: data1,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
        },
      }).then((res) => {
        console.log(res);
        this.input = 'https://www.azur1tee.top/vj/';
        this.input += res.data.data;
        this.lianjie = 'https://www.azur1tee.top/api/qrcode/getQRCode?content=' + this.input + '&logoUrl=https://www.azur1tee.top/api/getIcon';
        //alert(this.input);
        this.download_lianjie = 'https://www.azur1tee.top/api/qrcode/downloadQRCode/?content=' + this.input + '&logoUrl=https://www.azur1tee.top/api/getIcon';
      });
    }
  },
};
</script>

<style scoped>
#container {
  position: relative;
  margin: 0 auto;
  padding: 20px 20px 70px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  min-height: 100%;
  background-color: #fff;
}

.share-content {
  padding: 30px 10px 30px 60px;
}

.section-title {
  font-weight: bold;
  margin: 0px 0 30px 0;
  text-align: left;
  width: 100%;
}

.qrcode {
  border: 1px solid #e1e7f2;
  border-radius: 3px;
  overflow: hidden;
  width: 150px;
  height: 150px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-right: 10px;
  -webkit-box-shadow: 0px 3px 8px 0px rgba(224, 229, 236, 0.4);
  box-shadow: 0px 3px 8px 0px rgba(224, 229, 236, 0.4);
}

.qrcode img {
  max-width: 100%;
}

.copy-text-input {
  margin-right: 75px;
}

.ui-input {
  background-color: #f6f6f6;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right-color: transparent;
}

.ui-button,
.ui-input,
.share-btn {
  height: 45px;
  line-height: 45px;
  border: 1px solid #e1e7f2;
  -webkit-box-shadow: 0px 3px 8px 0px rgba(224, 229, 236, 0.4);
  box-shadow: 0px 3px 8px 0px rgba(224, 229, 236, 0.4);
}

.ui-input {
  width: 100%;
  line-height: normal;
  padding-left: 13px;
  padding-right: 13px;
  border-radius: 4px;
  color: #333;
}

.ui-button {
  float: right;
  width: 75px;
  text-align: center;
  min-width: 75px;
}

.share-btn {
  display: block;
  width: 45px;
  border-radius: 3px;
}

a.ui-button {
  text-decoration: none;
  color: #333;
}

#down {
  min-width: 105px;
}

.el-row {
  margin-bottom: 20px;
}

.el-col-4,
.el-col-8 {
  max-width: fit-content;
  margin-right: 20px;
}

.el-col-16 {
  margin-right: 20px;
}
</style>