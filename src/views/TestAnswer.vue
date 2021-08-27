<template>
  <div id="c-top">
    <!-- 可以编辑 -->
    <!--未提交的所有问卷-->
    <div class="s-main ">
      <!-- 问卷标题 -->
      <div class="header-title">
        {{ headerTitle }}
        <!-- <span><CountDown
    :remainTime="count_down_time"/></span> -->
      </div>
      <!-- 问卷副标题 -->
      <div class="header-subtitle">{{ subtitle }}</div>
      <div>总分:{{total_grade}}</div>
      <!-- 题目列表 -->
      <div
        class="question-list"
        v-for="(question, index) in questionList"
        :key="index"
      >
        <!-- 题目标题 -->
        <div class="question-head ">
          <div class="question-title">
            <span class="question-seq"
              ><b>{{ index + 1 }}</b></span
            >
            <span class="text">{{ question.text }}</span>
            <span v-if="question.required" class="question-required">*</span>

            <span
              class="sel-total"
              v-show="[12, 13, 14].includes(question.type)"
              >(分值{{ question.point }})</span
            >
            <el-tag v-if="[1, 7, 11, 13].includes(question.type)">多选</el-tag>
          </div>
          <div class="q-instruction">{{ question.comment }}</div>
        </div>

        <div class="question-body ">
          <!-- 单选题 -->
          <!-- @click.native.prevent="clickitem(question, index)" -->
          <div v-if="[0, 6, 10, 12].includes(question.type)">
            <el-radio-group v-model="question.radio" disabled>
              <el-radio
                v-for="(item, index) in question.selectionList"
                :key="index"
                :label="index"
              >
                {{ item.content }}
                <div class="q-instruction">{{ item.comment }}</div>
              </el-radio>
            </el-radio-group>
            <div v-if="question.type === 12">
              <div>
                正确答案:选项{{ parseInt(question.correct_answer) + 1 }}
              </div>
              <div>
                你的得分:{{question.grade}}
              </div>
              <div>答案解析:{{ question.analysis }}</div>
            </div>
          </div>
          <!-- 多选题 -->
          <div v-else-if="[1, 7, 11, 13].includes(question.type)">
            <el-checkbox-group v-model="question.checkList" disabled>
              <el-checkbox
                v-for="(item, index) in question.selectionList"
                :key="index"
                :label="index"
                >{{ item.content }}
                <span class="q-instruction">{{ item.comment }}</span>
              </el-checkbox>
            </el-checkbox-group>
            <div v-if="question.type === 13">
              <div>
                正确答案:
                <span
                  v-for="(item, index) in strtolist(question.correct_answer)"
                  :key="(item, index)"
                >
                  选项{{ parseInt(item) + 1 }}
                  <span
                    v-if="index < strtolist(question.correct_answer).length - 1"
                    >,</span
                  >
                </span>
              </div>
              <div>
                你的得分:{{question.grade}}
              </div>
              <div>答案解析:{{ question.analysis }}</div>
            </div>
          </div>
          <!-- 评分题 -->
          <div v-else-if="question.type === 3">
            <el-rate
              disabled
              v-model="question.rating"
              :icon-classes="iconClasses"
              void-icon-class="icon-rate-face-off"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            >
            </el-rate>
          </div>
          <!-- 填空题 -->
          <div v-else-if="question.type === 2 || question.type === 14">
            <el-input
              disabled
              type="textarea"
              autosize
              v-model="question.answer"
            >
            </el-input>
            <div v-if="question.type === 14">
              <div>正确答案:{{ question.correct_answer }}</div>
              <div>
                你的得分:{{question.grade}}
              </div>
              <div>答案解析:{{ question.analysis }}</div>
            </div>
          </div>

          <!-- <div>
                  正确答案是
                  <span v-if="question.type ">
                  {{question.correct_answer}},你的答案是{{question.answer}}
                </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CollectQuestion",
  components: {},
  props: {
    headerTitle: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    questionList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    total_grade:{
        type: Number,
        default: 0
    }

  },
  data() {
    return {
      //   headerTitle: "社交网站满意度问卷",
      //   subtitle:
      //     "为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！",
      //   questionList: [],
    };
  },
  methods: {
    strtolist(x) {
      var xx = x.split("");
      for (var j = 0; j < xx.length - 1; j++) {
        //两两比较，如果前一个比后一个大，则交换位置。
        for (var i = 0; i < xx.length - 1 - j; i++) {
          if (xx[i] > xx[i + 1]) {
            var temp = xx[i];
            xx[i] = xx[i + 1];
            xx[i + 1] = temp;
          }
        }
      }
      return xx;
    },
    orderlist(xx) {
      for (var j = 0; j < xx.length - 1; j++) {
        //两两比较，如果前一个比后一个大，则交换位置。
        for (var i = 0; i < xx.length - 1 - j; i++) {
          if (xx[i] > xx[i + 1]) {
            var temp = xx[i];
            xx[i] = xx[i + 1];
            xx[i + 1] = temp;
          }
        }
        return xx;
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/css/icon/preview.css";
#pre {
  width: 1000px;
  min-height: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}
#c-top {
  margin-top: -8vh;
  padding-top: 100px;
  background: rgba(235, 246, 254, 1);
  min-height: 100vh;
}
.skin-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.background-image {
  height: 640px;
  overflow: hidden;
  width: 100%;
  background-size: cover;
  object-fit: cover;
  object-position: top;
}
.c-foot {
  padding: 10px 0 40px;
  text-align: center;
  color: #999;
  position: relative;
  z-index: 10;
}
</style>
