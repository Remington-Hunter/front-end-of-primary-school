<template>
  <div>
    <el-button @click="checkItem(questionnaire_id)">查看界面</el-button>
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
      questionnaire_id:''
    }
  },
  created() {
    let query = this.$route.query;
    // this.questionnaire_type = parseInt(this.$route.params.type)
    this.questionnaire_id = query.id;
    // this.checkItem(this.questionnaire_id);
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
  }
}
</script>