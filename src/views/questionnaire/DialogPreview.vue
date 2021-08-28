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
            <span class="question-seq">{{ index + 1 }}.</span>
            <span class="question-text">{{ question.name }}
              <span
                class="sel-total"
                v-show="['考试多选题','考试单选题','考试填空题'].includes(question.problem_type)"
              >(分值{{ question.point}})</span>
              <span
                v-if="question.must_write_select"
                class="question-required"
              >*</span>
              <el-tag v-if=" ['多选题','投票多选题','报名多选题','考试多选题'].includes(question.problem_type)">多选</el-tag>
              <div class="q-instruction">{{ question.instruction }}</div>
            </span>
          </div>
        </div>

        <div class="question-body ">
          <!-- 单选题 -->
          <div v-if="['单选题','投票单选题','报名单选题','考试单选题'].includes(question.problem_type)">
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
          <div v-else-if="['多选题','投票多选题','报名多选题','考试多选题'].includes(question.problem_type)">
            <el-checkbox-group v-model="checkList">
              <el-checkbox
                v-for="(item, index) in question.selection_list"
                :key="index"
                :label="index"
              >{{ item.content }}
                <span
                  class="sel-total"
                  v-show="item.total"
                >(剩余{{item.total}})</span>
                <div class="q-instruction"> {{ item.comment }}</div>
              </el-checkbox>
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
          <div v-else-if="['填空题','考试填空题'].includes(question.problem_type)">
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
              class="loc"
              v-show="locationInfo.country"
              readonly
              v-model="locationInfo.country+locationInfo.province+locationInfo.city+locationInfo.district"
            >
            </el-input>
            <div>
              <v-btn
                @click="getLocation()"
                block
                outlined
                color="#C0C4CC"
              >
                <span style="color:#606266">
                  <i
                    class="el-icon-location-information"
                    style="font-size:20px"
                  ></i> 点击获取地理位置</span>
              </v-btn>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      radio: "",
      checkList: [],
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
      locationInfo: {
        ip: '',
        country: '',
        province: '',
        city: '',
        district: '',
        location: '',
      },
    };
  },
  props: ['headerTitle', 'subtitle', 'list'],
  methods: {
    getLocation() {
      this.$confirm("此操作将获取您的地理位置，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$message({
          type: 'success',
          message: "定位成功!",
        });
        // eslint-disable-next-line
        this.locationInfo.ip = window.localStorage.getItem('Ip')
        // console.log(this.locationInfo.ip)
        var _this = this;
        axios.get("https://restapi.amap.com/v5/ip?key=a593d64ab73229be6b3d1ef802b76849&type=4&ip=" + this.locationInfo.ip)
          .then(response => {
            console.log(response)
            _this.locationInfo.country = response.data.country
            _this.locationInfo.province = response.data.province
            _this.locationInfo.city = response.data.city
            _this.locationInfo.district = response.data.district
            _this.locationInfo.location = response.data.location
            console.log(_this.locationInfo)
          });
      })
        .catch(() => {
          this.$message({
            type: "info",
            message: "定位失败",
          });
        })
    }
  },
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
