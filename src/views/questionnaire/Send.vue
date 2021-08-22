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
        <el-col :span="20">
          <el-row>
            <el-col :span="16">
              <div class="ui-copy-text"><button
                  type="button"
                  class="ui-button"
                >复制</button>
                <div class="copy-text-input">
                  <input
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
                href="https://wj.qq.com/s2/8918766/dd18/"
              >打开</a></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><a
                class="ui-button"
                id="down"
                target="_blank"
                href="/survey/get_qrcode?url=https%3A%2F%2Fwj.qq.com%2Fs2%2F8918766%2Fdd18%2F&amp;type=3"
              >下载二维码</a></el-col>

            <el-col
              :span="4"
              id="share-method-qq"
            ><a
                class="share-btn"
                target="_blank"
                rel="noopener noreferrer"
                href="http://connect.qq.com/widget/shareqq/index.html?url=https%3A%2F%2Fwj.qq.com%2Fs2%2F8918766%2Fdd18%2F&amp;showcount=0&amp;desc=&amp;summary=为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！
&amp;title=问卷标题
&amp;site=qq&amp;pics=https%3A%2F%2Fwj.qq.com%2Fimage%2Flogo_word%402x.png"
              ><svg
                  class="icon icon-logo-qq"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 90 90"
                >
                  <path d="M60.5 46.7c-1.6-3-2.8-5.3-2.8-8.1C57.5 31 51.9 25.1 45 25c-6.9.1-12.5 6-12.7 13.6 0 2.8-1.2 5.1-2.8 8.1-2.3 4.5-1.6 10.3-.4 10.3.8 0 2.2-.9 3.4-2.5.6 1.9 1.6 3.6 3 5-2 .6-3.3 1.7-3.2 2.9.1 1.7 3 2.9 6.5 2.7 2.7-.1 5-1.1 5.8-2.3h.8c.8 1.2 3.1 2.1 5.8 2.3 3.5.2 6.4-1.1 6.5-2.7.1-1.2-1.3-2.2-3.2-2.9 1.4-1.3 2.4-3 3-5 1.2 1.6 2.6 2.5 3.4 2.5 1.2 0 1.9-5.8-.4-10.3z"></path>
                </svg></a></el-col>
            <el-col
              :span="4"
              id="share-method-qzone"
            ><a
                class="share-btn"
                target="_blank"
                rel="noopener noreferrer"
                href="https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=https%3A%2F%2Fwj.qq.com%2Fs2%2F8918766%2Fdd18%2F&amp;sharesource=qzone&amp;title=问卷标题
&amp;pics=https%3A%2F%2Fwj.qq.com%2Fimage%2Flogo_word%402x.png&amp;summary=为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！
"
              ><svg
                  class="icon icon-logo-qzone"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 90 90"
                >
                  <path d="M65.9 39.4L53 38.2c-1-.1-1.2-.2-1.5-1.1L46 24.8c-.5-1-1.3-1-1.8 0l-5.9 12.3c-.4.7-.6.8-1.6.9l-12.5 1.4c-1.2.1-1.4.9-.6 1.7l9.8 9.1c.5.4.5.6.3 1.2l-2.5 13.3c-.2 1.1.4 1.6 1.4 1l11.2-6.5c.8-.5 1.5-.5 2.3 0l11.3 6.5c1 .6 1.7.1 1.4-1l-1.9-10.6c1.2-.4 2.3-.9 2.9-1.4l-.3.1c-4 1-9.5 1.5-14.6 1.5-1.9 0-3.7-.1-5.5-.2-1.5-.1-3-.3-4.4-.5-.5-.1 0-.4 0-.4l13.5-9.6s.4-.2 0-.3c-5.6-.9-11.7-1.1-17.5-1.1h-.4c3.9-.9 8.8-1.4 14.2-1.4 3.2 0 6.2.2 8.9.5 0 0 1.5.2 2.3.3.6.1 0 .4 0 .4l-13.6 9.4s-.3.2 0 .2c4.2.6 9.3.8 13.9.9l-.2-1.1c-.1-.7 0-.9.5-1.4l9.6-9c1.1-.7.9-1.4-.3-1.6z"></path>
                </svg></a></el-col>
            <el-col
              :span="4"
              id="share-method-weibo"
            ><a
                class="share-btn"
                target="_blank"
                rel="noopener noreferrer"
                href="https://service.weibo.com/share/share.php?title=问卷标题
&amp;url=https%3A%2F%2Fwj.qq.com%2Fs2%2F8918766%2Fdd18%2F&amp;source=bookmark&amp;appkey=&amp;pic=https%3A%2F%2Fwj.qq.com%2Fimage%2Flogo_word%402x.png&amp;ralateUid="
              ><svg
                  class="icon icon-logo-weibo"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 90 90"
                >
                  <path d="M56.3 44.5c-1.8-.4-.9-1.3-.9-1.3s1.8-3-.4-5.1c-2.7-2.7-9.1.3-9.1.3-2.5.8-1.8-.3-1.5-2.2 0-2.2-.8-6-7.3-3.8S24.9 42.5 24.9 42.5c-3.9 5.2-3.4 9.3-3.4 9.3 1 8.9 10.5 11.4 17.8 12 7.8.6 18.2-2.7 21.4-9.4s-2.6-9.6-4.4-9.9zM39.9 61.2c-7.7.3-13.9-3.5-13.9-8.7s6.2-9.3 13.9-9.6 14 2.8 14 8-6.3 9.9-14 10.3z"></path>
                  <path d="M38.4 46.3c-7.8.9-6.9 8.2-6.9 8.2 0 1.4.8 2.8 2.1 3.5 3.8 2.3 8.8 1.4 11.6-2.1 2.3-3.1.9-10.5-6.8-9.6zm-2 10.2c-1.4.2-2.6-.7-2.6-1.9.1-1.4 1.1-2.5 2.5-2.6 1.7-.2 2.7.8 2.7 2-.1 1.4-1.2 2.4-2.6 2.5zm4.6-3.9c-.4.3-.9.3-1.3 0l-.1-.1c-.2-.5-.1-1.2.4-1.5.4-.4 1-.4 1.3 0l.1.1c.2.6 0 1.2-.4 1.5zM60.1 41.3c.6 0 1.2-.4 1.2-1.1v-.1c1-8.5-7-7-7-7-.7 0-1.3.5-1.3 1.2s.5 1.3 1.2 1.3h.1c5.7-1.3 4.4 4.4 4.4 4.4.1.8.7 1.3 1.4 1.3z"></path>
                  <path d="M59.2 26.5c-2.1-.4-4.2-.4-6.3.1-.1 0-.1.1-.2.1-1 .3-1.6 1.3-1.3 2.3.2.8 1 1.4 1.8 1.4.6-.1 1.1-.2 1.7-.4 3.7-.3 7.2 1.4 9.2 4.5 1 1.9 1.2 4.1.6 6.1-.2.6-.3 1.2-.4 1.8 0 .9.8 1.7 1.7 1.7h.1c.9 0 1.6-.1 1.8-1.6 2.9-10.1-3.8-14.9-8.7-16z"></path>
                </svg></a></el-col>
          </el-row>

        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
export default {
  props:{
    ma:{
      type:String,
      defalut:''
    },
    input:{
      type:String,
      defalut:'http://82.157.97.70/vj/'
    },
    lianjie:{
      type:String,
      defalut:''
    }
  },
};
</script>

<style  scoped>
#container {
  position: relative;
  margin: 0 auto;
  padding: 20px 20px 70px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  min-height: 100%;
  max-width: 1240px;
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