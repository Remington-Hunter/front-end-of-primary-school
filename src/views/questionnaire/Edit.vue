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
          <normal1
            @problem_change="changeState"
            @currentQuestionnaire="getCurrentQuestionnaire"
            :type="this.questionnaire_type"
            :copy_questionnaire_info="copy_questionnaire_info"
            @problem_store="saveQues(1)"
            ref="child"
          />
        </el-tab-pane>

        <el-tab-pane
          label="发布"
          name="second"
        >
          <send
            :ma="ma"
            :input="input"
            :lianjie="lianjie"
            :download_lianjie="download_lianjie"
          />
        </el-tab-pane>

        <!-- <el-tab-pane
          label="统计"
          name="third"
          :disabled="state || !is_saved"
        >
          <CrossAnalysis :id="this.questionnaire_id"></CrossAnalysis>
        </el-tab-pane> -->
      </el-tabs>
      <el-row style='position: absolute;right:100px;top:12vh;'>
        <el-button
          type="primary"
          plain
          @click="saveQues(0)"
        >保存
        </el-button>
        <el-button
          type="primary"
          plain
          @click="getProblemInfo"
        >预览
        </el-button>
        <!-- <el-button
          v-if="activeName==='first'"
          type="primary"
          @click="handleDown"
          plain
        >导出PDF<i class="el-icon-download el-icon--right"></i></el-button> -->
        <el-button
          type="primary"
          @click="$router.go(-1)"
          plain
        >返回
        </el-button>
      </el-row>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="60%"
      center
    >
      <el-button
        v-if="activeName==='first'"
        type="primary"
        @click="handleDown"
        class="dc-pdf"
        plain
      >导出PDF<i class="el-icon-download el-icon--right"></i></el-button>
      <d-preview
        id="demo5"
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
import Normal1 from "./Normal1.vue"
// import Normal from "./NormalQuestion"
import Send from "./Send.vue"
import DPreview from "./DialogPreview.vue"
import draggable from 'vuedraggable'
import axios from 'axios';
import htmlToPdf from "@/assets/js/htmlToPdf";
import CrossAnalysis from '@/views/CrossAnalysis'

export default {
  components: {
    Normal1,
    Send,
    CrossAnalysis,
    DPreview,
    draggable
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
      download_lianjie: '',
      dialogVisible: false,
      questionnaire_type: "",//问卷类型
      is_saved: false,
      questionnaire_id: -1,
      questionnaire_state: "",
      option: false,
      copy_questionnaire_info: {},
      modify_type: 0
    };
  },
  methods: {

    handleDown() {
      htmlToPdf.downloadPDF(document.querySelector("#demo5"), "我的问卷");
    },
    getProblemInfo() {
      if (this.is_creating === true) {
        return
      }
      this.dialogVisible = true;
    },
    sendQues() {
      if (this.is_creating === true) {
        return;
      }
      if (this.questionnaire_id !== -1) {
        this.current_questionnaire.id = this.questionnaire_id;
      }
      var url = ''
      if (parseInt(this.modify_type) === 1) {
        url = "https://www.azur1tee.top/api/questionnaire/edit_questionnaire"
      }
      else {
        url = "https://www.azur1tee.top/api/questionnaire/save_questionnaire"
      }
      console.log(this.questionnaire_id);
      console.log(this.current_questionnaire.id);
      this.current_questionnaire.type = this.questionnaire_type;
      var formData = this.current_questionnaire;
      console.log(JSON.stringify(formData));
      axios({
        method: "post",
        url: url,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
        data: JSON.stringify(formData),
      }).then((res) => {
        console.log(res);
        this.current_questionnaire.id = this.questionnaire_id;
        // var formData = this.current_questionnaire
        var formData = new FormData();
        // alert(this.current_questionnaire.id);
        formData.append("questionnaireId", this.current_questionnaire.id);
        axios({
          method: "post",
          url: "https://www.azur1tee.top/api/questionnaire/throw_questionnaire",
          headers: {
            Authorization: window.localStorage.getItem("authorization"),
            "Content-Type": "application/json",
          },
          data: formData,
        }).then((res) => {
          this.input = "https://www.azur1tee.top/vj/";
          this.input += res.data.data;
          this.lianjie =
            "https://www.azur1tee.top/api/qrcode/getQRCode/?content=" +
            this.input +
            "&logoUrl=https://www.azur1tee.top/api/getIcon";
          this.download_lianjie = 'https://www.azur1tee.top/api/qrcode/downloadQRCode/?content=' + this.input + '&logoUrl=https://www.azur1tee.top/api/getIcon';
          this.ma = res.data.data;
          if (res.data.code === 200 || res.data.code === 201) {
            var Data1 = new FormData();
            Data1.append("questionnaireId", this.current_questionnaire.id);
            axios({
              url:
                "https://www.azur1tee.top/api/questionnaire/publish_questionnaire",
              method: "post",
              data: Data1,
              headers: {
                Authorization: window.localStorage.getItem("authorization"),
                "Content-Type": "application/json",
              },
            }).then((res) => {
              console.log(res);
              if (res.data.code === 200 || res.data.code === 201) {
                this.$message({ message: "问卷已发布", type: "success" });
              }
            });
          } else {
            this.$message.error("获取链接失败");
          }
        });
      });
    },
    saveQues(index) {
      console.log(this.is_creating);
      if (this.is_creating === true) {
        return
      }
      if (this.questionnaire_id !== -1) {
        this.current_questionnaire.id = this.questionnaire_id
      }
      var url = ''
      if (parseInt(this.modify_type) === 1) {
        url = "https://www.azur1tee.top/api/questionnaire/edit_questionnaire"
      }
      else {
        url = "https://www.azur1tee.top/api/questionnaire/save_questionnaire"
      }
      this.current_questionnaire.type = this.questionnaire_type
      // if(this.current_questionnaire.useId === undefined){
      //   var x={}
      //   x=this.copy_questionnaire_info.questionnaire
      //   x.questionList=this.copy_questionnaire_info.questionList
      //   var formData=x
      // }
      // else{
      console.log(this.copy_questionnaire_info);
      var formData = this.current_questionnaire
      console.log(JSON.stringify(formData));
      // }
      axios({
        method: "post",
        url: url,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
        data: JSON.stringify(formData),
      }).then((res) => {
        console.log(res);
        if ((res.data.code === 200 || res.data.code === 201) && index === 0) {
          this.$message({ message: '保存成功', type: 'success' })
        }
        // this.current_questionnaire.id = res.data.data;
        // if (res.data.code === 200 || res.data.code === 201) {
        //   this.is_saved = true
        //   this.questionnaire_id = res.data.data
        // }
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
      console.log(this.current_questionnaire);
    },
    changeState(index) {
      if (index === false) {
        this.state = true
        return
      } else {
        this.state = false
      }
    },
    change_stop_state() {
      var formData = new FormData();
      formData.append("questionnaireId", this.current_questionnaire.id);
      axios({
        url: "https://www.azur1tee.top/api/questionnaire/stop_questionnaire",
        method: "post",
        data: formData,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
        },
      }).then((res) => {
        console.log(res);
        this.change_option();
        if (res.data.code === 200 || res.data.code === 201) {
          this.$message({ message: '问卷已停止回收', type: 'success' })
        }
      });
    },
    change_start_state() {
      var Data = new FormData();
      Data.append("questionnaireId", this.current_questionnaire.id)
      axios({
        url: 'https://www.azur1tee.top/api/questionnaire/publish_questionnaire',
        method: 'post',
        data: Data,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        this.change_option();
        if (res.data.code === 200 || res.data.code === 201) {
          this.$message({ message: '问卷已开始回收', type: 'success' })
        }
      })
    },
    change_option() {
      this.option = !this.option;
    },
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name === 'second') {
        // 触发事件
        // this.send_ID();
        this.sendQues();
      } else if (tab.name === 'first') {
        this.change_stop_state();
      }
    },
    send_ID() {
      var data1 = new FormData();
      data1.append("id", window.localStorage.getItem("user_id"));
      axios({
        url: "https://www.azur1tee.top/api/questionnaire/get_link",
        method: "post",
        data: data1,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
        },
      }).then((res) => {
        console.log(res);
        this.input = 'https://www.azur1tee.top/vj/';
        this.input += res.data.data;
        this.lianjie = 'https://www.azur1tee.top/api/qrcode/getQRCode/?content=' + this.input + '&logoUrl=https://www.azur1tee.top/api/getIcon';
        //alert(this.input);
      });
    },
    problem_type_info(num) {
      switch (num) {
        case 0:
          return "单选题";
          break;
        case 1:
          return "多选题";
          break;
        case 2:
          return "填空题";
          break;
        case 3:
          return "评分题";
          break;
        case 6:
          return "报名单选题";
          break;
        case 7:
          return "报名多选题";
          break;
        case 10:
          return "投票单选题";
          break;
        case 11:
          return "投票多选题";
          break;
        case 12:
          return "考试单选题";
          break;
        case 13:
          return "考试多选题";
          break;
        case 14:
          return "考试填空题";
          break;
        case 15:
          return "定位题";
          break;
      }
    },
  },
  created() {
    let query = this.$route.query;
    this.questionnaire_type = parseInt(this.$route.params.type)
    this.questionnaire_id = query.id;
    this.modify_type = query.modify_type
    var formData = new FormData()
    formData.append("id", this.questionnaire_id)
    if (parseInt(this.modify_type) === 2) {
      axios({
        url: "https://www.azur1tee.top/api/questionnaire/delete_and_get_questionnaire_by_id",
        method: "post",
        data: formData,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
        },
      }).then(res => {
        console.log(res);
      })
    }
    axios({
      url: "https://www.azur1tee.top/api/questionnaire/get_questionnaire_by_id",
      method: "post",
      data: formData,
      headers: {
        Authorization: window.localStorage.getItem("authorization"),
      },
    }).then(res => {
      var x = res.data.data
      x.modify_type = parseInt(this.modify_type)
      this.copy_questionnaire_info = x
      console.log(x);

      //刷新时的预览
      this.title = x.questionnaire.title
      this.description = x.questionnaire.description
      var list = [];
      var y = x.questionList
      for (var i = 0; i < y.length; i++) {
        let item = {};
        item.problem_type = this.problem_type_info(y[i].question.type); //问题种类
        item.problem_number = y[i].question.number; //问题题号
        item.name = y[i].question.content; //题目名字
        item.instruction = y[i].question.comment; //题目备注
        // item.selection_list = x.selection_list; //选择选项列表
        item.selection_list = []
        for (var j = 0; j < y[i].optionList.length; j++) {
          var zz = {}
          zz.content = y[i].optionList[j].content
          zz.total = y[i].optionList[j].limit
          zz.comment = y[i].optionList[j].comment
          item.selection_list.push(zz)
        }
        item.must_write_select = y[i].question.required == 1 ? true : false; //题目是否必选
        item.point = y[i].question.point
        item.question_analysis = y[i].question.analysis
        list.push(item);
      }
      this.preview_list = list
      console.log(list);
    })
  }
};
</script>

<style scoped>
.tabs {
  padding: 0 54px;
  padding-top: 5vh;
}
.dc-pdf {
  margin-left: 60px;
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