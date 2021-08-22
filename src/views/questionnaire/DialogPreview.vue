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
        v-for="(question, index) in list"
        :key="index"
      >
        <!-- 题目标题 -->
        <div class="question-head ">
          <div class="question-title">
            <span class="question-seq"><b>{{ index + 1 }}</b></span>
            <span class="text">{{ question.name }}</span>
            <span
              v-if="question.must_write_select"
              class="question-required"
            >*</span>
            <el-tag v-if="question.problem_type === '多选题'">多选</el-tag>
          </div>
          <div class="q-instruction">{{ question.instruction }}</div>
        </div>

        <div class="question-body ">
          <!-- 单选题 -->
          <div v-if="question.problem_type === '单选题'">
            <el-radio-group v-model="question.radio">
              <el-radio
                v-for="(item, index) in question.selection_list"
                :key="index"
                :label="index"
              >
                {{ item }}</el-radio>
            </el-radio-group>
          </div>
          <!-- 多选题 -->
          <div v-else-if="question.problem_type === '多选题'">
            <el-checkbox-group v-model="question.checkList">
              <el-checkbox
                v-for="(item, index) in question.selection_list"
                :key="index"
                :label="index"
              >{{ item }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <!-- 评分题 -->
          <div v-else-if="question.problem_type === '评分题'">
            <el-rate
              v-model="question.rating"
              :icon-classes="iconClasses"
              void-icon-class="icon-rate-face-off"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            ></el-rate>
          </div>
          <!-- 填空题 -->
          <div v-else-if="question.problem_type === '填空题'">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  props: ['headerTitle', 'subtitle', 'list'],
};
</script>

<style scoped>
@import "../../assets/css/icon/preview.css";
#prev {
  width: 100%;
  min-height: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}

.s-main {
  position: relative;
  padding: 0px 80px;
  margin: auto;
  padding-bottom: 15px;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  overflow: hidden;
}
</style>
