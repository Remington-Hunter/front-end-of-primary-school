<template>
  <div>
<!--    <el-button @click="checkItem(questionnaire_id)">查看界面</el-button>-->
    <el-button @click="publish(questionnaire_id)">发布</el-button>
    <d-preview
        :headerTitle="this.title"
        :subtitle="this.description"
        :list="this.preview_list"
    ></d-preview>
  </div>
</template>

<script>
import axios from "axios";
import DPreview from "./questionnaire/DialogPreview.vue";

export default {
  components: {
    DPreview,
  },
  data(){
    return{
      state: true,
      current_questionnaire: {},
      is_creating: false,
      total_problem: 1,
      preview_list: [],
      title: "",
      description: "",
      ma: "",
      input: "",
      lianjie: "",
      dialogVisible: false,
      questionnaire_type: "", //问卷类型
      is_saved: false,
      questionnaire_id: '',
      questionnaire_state: "",
      option: false,
    }
  },
  created() {
    let query = this.$route.query;
    // this.questionnaire_type = parseInt(this.$route.params.type)
    this.questionnaire_id = query.id;
    this.questionnaire_type = parseInt(this.$route.params.type);
    this.checkItem(this.questionnaire_id);
  },
  methods:{
    checkItem(item) {
      var Data = new FormData();
      Data.append("id", item);
      axios({
        url:
            "https://www.azur1tee.top/api/questionnaire/get_questionnaire_by_id",
        method: "post",
        data: Data,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
      }).then((res) => {
        this.preview_list = [];
        let q = res.data.data;
        this.title = q.questionnaire.title;
        this.description = q.questionnaire.description;
        let x = q.questionList;
        for (var i = 0; i < x.length; i++) {
          var obj = {};
          obj.problem_type = this.problem_type_info(x[i].question.type);
          obj.name = x[i].question.content;
          obj.instruction = x[i].question.comment;
          obj.must_write_select = x[i].question.required;
          var list = [];
          for (var j = 0; j < x[i].optionList.length; j++) {
            var listitem = {};
            listitem.content = x[i].optionList[j].content;
            listitem.total = x[i].optionList[j].limit;
            listitem.comment = x[i].optionList[j].comment;
            list.push(listitem);
          }
          obj.selection_list = list;
          this.preview_list.push(obj);
        }
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
        case 15:
          return "定位题";
          break;
      }
    },
    publish(id) {
      this.current_questionnaire.id = this.questionnaire_id;
      console.log(this.questionnaire_id);
      console.log(this.current_questionnaire.id);
      this.current_questionnaire.type = this.questionnaire_type;
      var formData = this.current_questionnaire;
      console.log(JSON.stringify(formData));
      axios({
        method: "post",
        url: "https://www.azur1tee.top/api/questionnaire/save_questionnaire",
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
                this.$router.push({ name: "send", params: { id: id } });
              }
            });
          } else {
            this.$message.error("获取链接失败");
          }
        });
      });
    },
  }
}
</script>