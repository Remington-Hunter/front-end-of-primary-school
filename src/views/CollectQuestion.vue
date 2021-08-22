<template>
  <div>
    <PublishQuestion 
    :headerTitle="headerTitle"
    :subtitle="subtitle"
    :questionList="questionList"/>
    <div  type="primary" style="text-align: center;display: block" @click="send_Info()"><el-button big>提交</el-button></div>
  </div>

</template>

<script>
import axios from "axios";
import PublishQuestion from "./questionnaire/PublishQuestion.vue";
export default {
  name: "CollectQuestion",
  components: {
    PublishQuestion,
  },
  data() {
    return {
      ma: this.$route.params.ma,
      current_questionnaire: {},
      headerTitle: "社交网站满意度问卷",
      subtitle:
        "为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！",
      questionList: [],
    };
  },
  methods: {
    showInfo() {
      console.log(this.current_questionnaire);
      this.headerTitle = this.current_questionnaire.questionnaire.title;
      this.subtitle = this.current_questionnaire.description;
      var list=this.current_questionnaire.questionList;
      for (var i = 0; i < list.length; i++) {
        let x = {};
        var y = list[i];
        x.type = y.question.type;
        x.text = y.question.content;
        x.selectionList = [];
        for(var j=0;j<y.optionList.length;j++) {
            x.selectionList.push(y.optionList[j].content);
        }
        console.log(x.selectionList);
        x.required = y.question.required;
        x.radio = "";
        x.checkList = [],
        x.answer = "",
        x.rating = 0,
        this.questionList.push(x);
      }
    },
    getInfo() {
      var formData = new FormData();
      formData.append("md5", this.ma);
      axios({
        method: "post",
        url: "http://82.157.97.70/api/questionnaire/get_questionnaire",
        data: formData,
      }).then((res) => {
        console.log(res.data.data);
        this.current_questionnaire = res.data.data;
        this.showInfo();
      });
    },
    send_Info() {
      var formData = {};
      formData.questionnaireID = 1;

      axios({
        method: "post",
        url: "http://82.157.97.70/api/answer/submit_answer",
        data: formData,
      }).then((res) => {
        console.log(res.data.data);

      });
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style>
.el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #0095ff;
  border: 1px solid #DCDFE6;
  color: #FFF;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
</style>
