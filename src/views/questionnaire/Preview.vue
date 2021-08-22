<template>
  <div id="prev">
    <div class="s-main ">
      <!-- 问卷标题 -->
      <div class="header-title">{{ headerTitle }}</div>
      <!-- 问卷副标题 -->
      <div class="header-subtitle">{{ subtitle }}</div>
      <!-- 题目列表 -->
      <div
        class="question-list"
        v-for="(question, index) in questionList"
        :key="index"
      >
        <!-- 题目标题 -->
        <div class="question-head ">
          <div class="question-title">
            <span class="question-seq"><b>{{ index + 1 }}</b></span>
            <span class="text">{{ question.text }}</span>
            <span
              v-if="question.required"
              class="question-required"
            >*</span>
            <el-tag v-if="question.type === 1">多选</el-tag>
          </div>
        </div>

        <div class="question-body ">
          <!-- 单选题 -->
          <div v-if="question.type === 0">
            <el-radio-group v-model="question.radio">
              <el-radio
                v-for="(item, index) in question.selectionList"
                :key="index"
                :label="index"
              >
                {{ item }}</el-radio>
            </el-radio-group>
          </div>
          <!-- 多选题 -->
          <div v-else-if="question.type === 1">
            <el-checkbox-group v-model="question.checkList">
              <el-checkbox
                v-for="(item, index) in question.selectionList"
                :key="index"
                :label="index"
              >{{ item }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <!-- 评分题 -->
          <div v-else-if="question.type === 3">
            <el-rate
              v-model="question.rating"
              :icon-classes="iconClasses"
              void-icon-class="icon-rate-face-off"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            ></el-rate>
          </div>
          <!-- 填空题 -->
          <div v-else-if="question.type === 2">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="question.answer"
            >
            </el-input>
          </div>
        </div>
      </div>

      <div class="page-control">
        <!-- <el-button
          type="primary"
          id="btn"
        >下一页</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerTitle: "社交网站满意度问卷",
      subtitle:
        "为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！",
      questionList: [
        // {
        //   type: 0, //问题种类：单选
        //   text: "您是否使用过xx社交网站？",
        //   selectionList: ["a选项", "b选项"],
        //   radio: "",
        //   checkList: [],
        //   answer: "输入你的答案",
        //   rating: 0,
        //   required: true, //是否必填
        // },
        // {
        //   type: 1, //问题种类：多选
        //   text: "您使用xx社交网站的目的是？",
        //   selectionList: ["a选项", "b选项", "c选项"],
        //   radio: "",
        //   checkList: [],
        //   answer: "输入你的答案",
        //   rating: 0,
        //   required: false,
        // },
      ],
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
    };
  },
  methods: {
    problem_type_number(str) {
      switch (str) {
        case "单选题":
          return 0;
          break;
        case "多选题":
          return 1;
          break;
        case "填空题":
          return 2;
          break;
        case "评分题":
          return 3;
          break;
      }
    },
  },
  created() {
    let list = JSON.parse(this.$route.query.list);
    let title = this.$route.query.title;
    let description = this.$route.query.description;
    this.headerTitle = title
    this.subtitle = description
    console.log(list.length);
    console.log(list[0]);
    for (var i = 0; i < list.length; i++) {
      let x = {}
      var y = list[i]
      console.log(y);
      x.type = this.problem_type_number(y.problem_type)
      x.text = y.name
      x.selectionList = y.selection_list
      x.required = y.must_write_select === '是' ? true : false
      x.radio = ""
      x.checkList = [],
        x.answer = "",
        x.rating = 0,
        this.questionList.push(x)
    }
  },
};
</script>

<style scoped>
@import "../../assets/css/icon/preview.css";
#prev {
  width: 1000px;
  min-height: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}
</style>
