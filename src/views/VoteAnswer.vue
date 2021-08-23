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
            <el-tag v-if="[1,4,7,11].includes(question.type)">多选</el-tag>
          </div>
          <div class="q-instruction">{{ question.comment }}</div>
        </div>

        <div class="question-body ">
          <!-- 单选题 -->
          <div v-if="[0,6,10].includes(question.type)">
            <el-radio-group
              v-model="question.radio"
              disabled
            >
              <el-radio
                v-for="(item, index) in question.selectionList"
                :key="index"
                :label="index"
              >
                {{ item.content }}<span class="q-instruction">{{ item.comment }}</span>
                <span class="sel-total">({{item.total}}票)</span>
                <el-progress
                  :percentage="item.percentage"
                  :color="customColor"
                ></el-progress>
              </el-radio>
            </el-radio-group>
          </div>
          <!-- 多选题 -->
          <div v-else-if="[1,4,7,11].includes(question.type)">
            <el-checkbox-group
              v-model="question.checkList"
              disabled
            >
              <el-checkbox
                v-for="(item, index) in question.selectionList"
                :key="index"
                :label="index"
              >{{ item.content }}
                <span class="q-instruction">{{ item.comment }}</span>
                <span class="sel-total">({{item.total}}票)</span>
                <el-progress
                  :percentage="item.percentage"
                  :color="customColor"
                ></el-progress>
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <!-- 评分题 -->
          <div v-else-if="question.type === 3">
            <el-rate
              v-model="
            question.rating"
              :icon-classes="iconClasses"
              void-icon-class="icon-rate-face-off"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              disabled
            >
            </el-rate>
          </div>
          <!-- 填空题 -->
          <div v-else-if="question.type === 2">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="question.answer"
              disabled
            >
            </el-input>
          </div>
        </div>
      </div>
      <div class="page-control">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"VoteAnswer",
  props:{
    headerTitle:{
      type:String,
      default:""
    },
    subtitle:{
      type:String,
      default:""
    },
    questionList:{
      type:Array,
      default:()=>{
        return []
      }
    }
  },
  data() {
    return {
      headerTitle: "社交网站满意度问卷",
      subtitle:
        "为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！",
      questionList: [
        // {
        //   type: 0, //问题种类：单选
        //   text: "您是否使用过xx社交网站？",
        //   selectionList: [{ content: "a选项", total: "5", comment: "我是备注",percentage:10 },
        //   { content: "b选项", total: "10", comment: "",percentage:20 },
        //   { content: "c选项", total: "10", comment: "",percentage:70 },],
        //   radio: 1,
        //   checkList: [],
        //   answer: "输入你的答案",
        //   rating: 0,
        //   required: true, //是否必填
        // },
        // {
        //   type: 1, //问题种类：多选
        //   text: "您使用xx社交网站的目的是？",
        //   selectionList: [{ content: "a选项", total: "10", comment: "我是备注",percentage:10.3 },
        //   { content: "b选项", total: "10", comment: "",percentage:20 },
        //   { content: "c选项", total: "10", comment: "" ,percentage:70}],
        //   radio: "",
        //   checkList: [0, 1],
        //   answer: "输入你的答案",
        //   rating: 0,
        //   required: false,
        // },
        // {
        //   type: 2, //问题种类：填空
        //   text: "您使用xx社交网站的目的是？",
        //   answer: "你的答案",
        //   required: false,
        // },
        // {
        //   type: 3, //问题种类：评分
        //   text: "您使用xx社交网站的目的是？",
        //   rating: 4,
        //   required: false,
        // },
      ],
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
    };
  },
  created(){
  }
};
</script>

<style scoped>
@import "../assets/css/icon/preview.css";
#prev {
  width: 1000px;
  min-height: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}
</style>
