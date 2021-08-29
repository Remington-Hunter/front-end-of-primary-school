<template>
  <div class="s-main ">
    <el-input
      style="width:50vw;height:50vh"
      type="textarea"
      placeholder="请输入内容"
      v-model="textarea"
    >
    </el-input>
    <el-button type="primary" @click="c"></el-button>
    <el-button @click="current_questionnaire">123</el-button>
    <div class="preview">
      <!-- 问卷标题 -->
      <div class="header-title">
        {{ headerTitle }}
      </div>
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
            <el-radio-group v-model="question.radio">
              <el-radio
                v-for="(item, index) in question.selectionList"
                :key="index"
                :label="index"
                @click.native="clickitem(question)"
              >
                {{ item.content }}
              </el-radio>
            </el-radio-group>
          </div>
          <!-- 多选题 -->
          <div v-else-if="[1, 7, 11, 13].includes(question.type)">
            <el-checkbox-group v-model="question.checkList">
              <el-checkbox
                v-for="(item, index) in question.selectionList"
                :key="index"
                :label="index"
                >{{ item.content }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <!-- 评分题 -->
          <div v-else-if="question.type === 3">
            <el-rate
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
import axios from 'axios'
export default {
  data() {
    return {
      textarea: "",
      list: [],
      questionList: [],
      headerTitle: "",
      subtitle: "",
      flag: false,
    };
  },
  methods: {
    c() {
      console.log(this.textarea);
      this.list = this.textarea.split("\n");
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i] == "") {
          this.list.splice(i, 1);
          i = i - 1;
        }
      }
      console.log(this.list);
      this.questionList = [];
      var reg = /^\[{1}(.+)].*/;
      var l = this.list;
      var c = {};
      if (this.list.length > 0) {
        this.headerTitle = this.list[0];
      }
      for (var i = 1; i < l.length; i++) {
        if (c.type != undefined) {
          if (c.selectionList.length == 0) {
            var select = {};
            select.content = l[i];
            c.selectionList.push(select);
          } else if (l[i].match(reg) != null) {
            this.questionList.push(c);
            c = {};
            var result = l[i].match(reg);
            var text = l[i].substring(5, l[i].length);
            switch (result[1]) {
              case "单选题": {
                c.type = 0;
                c.text = text;
                c.selectionList = [];
                break;
              }
              case "多选题": {
                c.type = 1;
                c.text = text;
                c.selectionList = [];
                break;
              }
              case "填空题": {
                c.type = 2;
                c.text = text;
                this.questionList.push(c);
                c = {};
                break;
              }
              case "评分题": {
                c.type = 3;
                c.text = text;
                this.questionList.push(c);
                c = {};
                break;
              }
            }
          } else {
            var select = {};
            select.content = l[i];
            c.selectionList.push(select);
          }
        } else if (l[i].match(reg) != null) {
          var result = l[i].match(reg);
          var text = l[i].substring(5, l[i].length);
          switch (result[1]) {
            case "单选题": {
              c.type = 0;
              c.text = text;
              c.selectionList = [];
              break;
            }
            case "多选题": {
              c.type = 1;
              c.text = text;
              c.selectionList = [];
              c.checkList = [];
              break;
            }
            case "填空题": {
              c.type = 2;
              c.text = text;
              this.questionList.push(c);
              c = {};
              break;
            }
            case "评分题": {
              c.type = 3;
              c.text = text;
              this.questionList.push(c);
              c = {};
              break;
            }
          }
        } else {
          c.type = 2;
          c.text = l[i];
          this.questionList.push(c);
          c = {};
        }
      }
      if (c.type != undefined && c.selectionList.length != 0) {
        this.questionList.push(c);
      }
      console.log(c);
      console.log(this.questionList);
    },
    current_questionnaire() {
      var xx=[]
      console.log(this.questionList);
      console.log(this.title);
      var x = this.questionList;
      console.log(x);
      for (var i = 0; i < x.length; i++) {
        let item = {};
        // item.problem_type = x.problem_type;
        item.number = i + 1;
        item.content = x[i].text;
        item.type = x[i].type;
        console.log(item.type);
        item.answer = "";
        item.required = 0;
        item.point = 0;
        item.analysis = "";
        if (x[i].selectionList !== undefined) {
          let y = [];
          for (var j = 0; j < x[i].selectionList.length; j++) {
            let z = {};
            z.content = x[i].selectionList[j].content;
            z.limit = "";
            z.comment = "";
            z.number = j + "";
            y.push(z);
          }
          item.optionList = y;
        }
        let y1 = [];
        if (item.type === 3) {
          for (var j = 1; j <= 5; j++) {
            let z = {};
            z.number = j + "";
            y1.push(z);
          }
          item.optionList = y1;
        }
        xx.push(item);
      }

      var formData = {};
      // formData.description = this.subtitle;
      formData.limit = -1;
      formData.title = this.title;
      formData.needNum = -1;
      formData.userId = window.localStorage.getItem("user_id");
      formData.questionList = xx;
      var url = ''
      url = "https://www.azur1tee.top/api/questionnaire/save_questionnaire"
      formData.type = 0
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
        // this.current_questionnaire.id = res.data.data;
        // if (res.data.code === 200 || res.data.code === 201) {
        //   this.is_saved = true
        //   this.questionnaire_id = res.data.data
        // }
      });
    },
  },
};
</script>

<style scoped>
@import "../../assets/css/icon/preview.css";
.preview {
  background-color: #fff;
  height: 100vh;
  width: 1000px;
  margin: auto;
}
</style>
