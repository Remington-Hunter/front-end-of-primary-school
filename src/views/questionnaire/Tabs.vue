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
          <normal
            @problem_change="changeState"
            @currentQuestionnaire="getCurrentQuestionnaire"
          />
        </el-tab-pane>

        <el-tab-pane
          label="投放"
          name="second"
          :disabled="state"
          @click="sendQues"
        >
          <send
            :ma="ma"
            :input="input"
            :lianjie="lianjie"
          />
        </el-tab-pane>

        <el-tab-pane
          label="统计"
          name="third"
          :disabled="state || !is_saved"
        >
          <CrossAnalysis :id="this.current_questionnaire.id"></CrossAnalysis>
        </el-tab-pane>
      </el-tabs>
      <el-row style='position: absolute;right:100px;top:12vh;'>
        <el-button
          type="primary"
          plain
          @click="saveQues"
          :disabled="state"
        >保存</el-button>
        <el-button
          type="primary"
          plain
          :disabled="state"
          @click="getProblemInfo"
        >预览</el-button>
        <el-button
          v-if="state"
          type="primary"
          icon="el-icon-pause"
          :disabled="state"
          plain
        >暂停回收</el-button>
        <el-button
          v-else
          type="primary"
          icon="el-icon-video-play"
          :disabled="state"
          plain
        >开始回收</el-button>
        <el-button
          type="primary"
          @click="handleDown"
          :disabled="state"
          plain
        >导出PDF<i class="el-icon-download el-icon--right"></i></el-button>
        <el-button
          type="primary"
          @click="$router.go(-1)"
          plain
        >返回</el-button>
      </el-row>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="60%"
    >
      <d-preview
        :headerTitle="this.title"
        :subtitle="this.description"
        :list="this.preview_list"
      ></d-preview>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Normal from "./Normal.vue"
// import Normal from "./NormalQuestion"
import Send from "./Send.vue"
import DPreview from "./DialogPreview.vue"
import axios from 'axios';
import htmlToPdf from "@/assets/js/htmlToPdf";
import CrossAnalysis from '@/views/CrossAnalysis'
export default {
  components: {
    Normal,
    Send,
    CrossAnalysis,
    DPreview,
  },
  data() {
    return {
      activeName: 'first',
      state: true,
      current_questionnaire: {},
      is_creating: false,
      total_problem: 1,
      preview_list: [],
      title: '',
      description: '',
      ma: '',
      input: '',
      lianjie: '',
      dialogVisible: false,
      questionnaire_type:"",//问卷类型
      questionnaire_state:"",
      is_saved:false
    };
  },
  methods: {
    handleDown() {
      htmlToPdf.downloadPDF(document.querySelector("#demo"), "我的问卷");
    },
    getProblemInfo() {
      if (this.is_creating === true || this.total_problem === 1) { return }
      this.dialogVisible = true;
    },
    sendQues() {
      if (this.is_creating === true || this.total_problem === 1) {
        return
      }
      this.current_questionnaire.type= this.questionnaire_type
      var formData = this.current_questionnaire
      axios({
        method: "post",
        url: "http://82.157.97.70/api/questionnaire/save_questionnaire",
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
        data: JSON.stringify(formData),
      }).then((res) => {
        console.log(res);
        this.current_questionnaire.id = res.data.data;
        this.is_saved = true
        if (this.is_creating === true || this.total_problem === 1) { return }
        // var formData = this.current_questionnaire
        var formData = new FormData();
        formData.append("questionnaireId", this.current_questionnaire.id)
        axios({
          method: "post",
          url: "http://82.157.97.70/api/questionnaire/throw_questionnaire",
          headers: {
            Authorization: window.localStorage.getItem("authorization"),
            "Content-Type": "application/json",
          },
          data: formData,
        }).then((res) => {
          this.input = 'http://82.157.97.70/vj/';
          this.input += res.data.data;
          this.lianjie = 'http://82.157.97.70/api/qrcode/getQRCode/?content=' + this.input + '&logoUrl=http://82.157.97.70/api/getIcon';
          this.ma = res.data.data
        });
      });
    },
    saveQues() {
      if (this.is_creating === true || this.total_problem === 1) {
        return
      }
      this.current_questionnaire.type= 0
      var formData = this.current_questionnaire
      axios({
        method: "post",
        url: "http://82.157.97.70/api/questionnaire/save_questionnaire",
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
        data: JSON.stringify(formData),
      }).then((res) => {
        console.log(res);
        this.current_questionnaire.id = res.data.data;
        this.is_saved = true
      });
    },
    getCurrentQuestionnaire(obj) {
      this.current_questionnaire = obj.data
      this.is_creating = obj.is_creating
      this.total_problem = obj.total_problem
      this.preview_list = obj.preview_list
      this.title = obj.title
      this.description = obj.description
      this.questionnaire_state = obj.questionnaire_state
    },
    changeState(index) {
      if (index === false) {
        this.state = true
        return
      }
      else {
        this.state = false
      }
    },
    change_state(){
      var formData = new FormData();
      formData.append("questionnaireID",this.current_questionnaire.id);
      formData.append("");
      axios({
        url: "http://82.157.97.70/api/questionnaire/publish_questionnaire",
        method: "post",
        data: formData,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
        },
      }).then((res) => {
            console.log(res);

        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name == 'second') {
        // 触发事件
        // this.send_ID();
        this.sendQues();
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
        this.input = 'http://82.157.97.70/vj/';
        this.input += res.data.data;
        this.lianjie = 'http://82.157.97.70/api/qrcode/getQRCode/?content=' + this.input + '&logoUrl=http://82.157.97.70/api/getIcon';
        //alert(this.input);
      });
    },
  },
  created(){
    this.questionnaire_type=parseInt(this.$route.params.type)
    console.log(this.questionnaire_type);
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