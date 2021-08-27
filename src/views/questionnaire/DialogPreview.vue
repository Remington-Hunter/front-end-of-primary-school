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
            <el-tag v-if=" ['多选题','投票多选题','报名多选题'].includes(question.problem_type)">多选</el-tag>
          </div>
          <div class="q-instruction">{{ question.instruction }}</div>
        </div>

        <div class="question-body ">
          <!-- 单选题 -->
          <div v-if="['单选题','投票单选题','报名单选题'].includes(question.problem_type)">
            <el-radio-group v-model="radio">
              <el-radio
                v-for="(item, index) in question.selection_list"
                :key="index"
                :label="index"
              >
                {{ item.content }}<span
                  class="sel-total"
                  v-show="item.total"
                >(剩余{{item.total}})</span>
                <div class="q-instruction">{{ item.comment }}</div>
              </el-radio>

            </el-radio-group>
          </div>
          <!-- 多选题 -->
          <div v-else-if="['多选题','投票多选题','报名多选题'].includes(question.problem_type)">
            <el-checkbox-group v-model="checkList">
              <el-checkbox
                v-for="(item, index) in question.selection_list"
                :key="index"
                :label="index"
              >{{ item.content }} <span
                  class="sel-total"
                  v-show="item.total"
                >(剩余{{item.total}})</span><span class="q-instruction">{{ item.comment }}</span></el-checkbox>
            </el-checkbox-group>
          </div>
          <!-- 评分题 -->
          <div v-else-if="question.problem_type === '评分题'">
            <el-rate
              v-model="rating"
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
              v-model="answer"
            >
            </el-input>
          </div>
          <div v-else-if="question.problem_type==='定位题'">
            <el-input
                type="textarea"
                autosize
                placeholder="请输入内容"
                v-model="answer"
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
      radio: "",
      checkList: [],
      answer: "",
      rating: 0,
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
.question-title {
  font-size: 16px;
}
</style>
