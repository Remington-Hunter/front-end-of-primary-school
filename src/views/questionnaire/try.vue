<template>
  <div>
    <div>
      <el-button
        type="text"
        @click="dialogVisible = true"
        id="tishi"
      >查看编辑提示</el-button>
      <el-button
        class="btn"
        type="primary"
        size="medium"
        @click="open"
      >发布问卷</el-button>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
    >
      <div>
        <p class="ming">格式说明</p>
        <div class="shuo">
          <p>第一行默认为问卷标题，问卷题目自动添加题号</p>
          <p>请在题目开头使用 [单选题]、[多选题]、[填空题]、[评分题] 来标注不同的题型，其中选择题需要至少设置一个选项，如无标注会识别为填空题。</p>
          <p>目前仅支持上述四种题型，更多题型敬请期待</p>
        </div>
        <p class="ming">题目样例</p>
        <div class="shuo">
          {{tm}}
        </div>
      </div>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>

    <div class="try-main ">
      <div class="edit">
        <div id="leftBox"><textarea
            wrap="off"
            cols="2"
            id="leftNum"
            disabled
          ></textarea></div>
        <textarea
          @input="handleTextareaInput"
          v-model="textarea"
          onscroll="document.getElementById('leftNum').scrollTop = this.scrollTop;"
          id="edit-content"
        ></textarea>
      </div>

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
              <span class="question-seq"><b>{{ index + 1 }}</b></span>
              <span class="text">{{ question.text }}</span>
              <span
                v-if="question.required"
                class="question-required"
              >*</span>

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
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      textarea: '示例--问卷调研用户使用习惯调查\n\n[单选题]请问您最常用的创建问卷方式是？\n从空白问卷开始创建\n使用已有的问卷模板\n使用导入功能自动创建\n\n[填空题]请您用一句话评价下问卷平台',
      list: [],
      questionList: [],
      headerTitle: "",
      subtitle: "",
      flag: false,
      num: "",
      dialogVisible: false,
      tm: '[单选题]请问您最常用的创建问卷方式是？\n从空白问卷开始创建\n使用已有的问卷模板\n使用导入功能自动创建\n\n[填空题]请您用一句话评价下问卷平台\n\n[多选题]以下特性中，您认为比较重要的是？\n创建方式多样\n免费好用\n在线实时统计\n多终端自动适应显示\n\n[评分题]请为问卷平台评一下分',
      questionnaire_id: ""
    }
  },
  methods: {
    c() {
      this.list = this.textarea.split('\n');
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].match(/^[ ]*$/)) {
          this.list.splice(i, 1);
          i = i - 1;
        }
      }
      this.questionList = [];
      var reg = /^\[{1}(.+)].*/;
      var l = this.list;
      var c = {};
      if (this.list.length > 0) {
        this.headerTitle = this.list[0];
      }
      for (var i = 1; i < l.length; i++) {
        l[i] = l[i].replace(/^\s*/, "");
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
              case '多选题': {
                c.type = 1; c.text = text;
                c.checkList = [];
                c.selectionList = []; break;
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
              default: {
                c.type = 2;
                c.text = l[i];
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
            default: {
              c.type = 2;
              c.text = l[i];
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
    },
    current_questionnaire() {
      var xx = []
      var x = this.questionList;
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
        item.optionList = [];
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
      formData.title = this.headerTitle;
      formData.description = '';
      formData.needNum = -1;
      formData.userId = window.localStorage.getItem("user_id");
      formData.questionList = xx;
      var url = ''
      url = "https://www.azur1tee.top/api/questionnaire/save_questionnaire"
      formData.type = 0
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
        if (res.data.code === 200 || res.data.code === 201) {
          var Data1 = new FormData();
          this.questionnaire_id = res.data.data;
          Data1.append("questionnaireId", this.questionnaire_id);
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
            // if (res.data.code === 200 || res.data.code === 201) {
            //   this.$message({message: "问卷已发布", type: "success"});
            // }
          });
        }
      });
    },

    handleTextareaInput(e) {
      var str = this.textarea;
      str = str.replace(/\r/gi, "");
      str = str.split("\n");
      let n = str.length;
      var lineobj = document.getElementById("leftNum");
      for (var i = 1; i <= n; i++) {
        if (document.all) {
          this.num += i + "\r\n";   //判断浏览器是否是IE  
        } else {
          this.num += i + "\n";
        }
      }
      lineobj.value = this.num;
      this.num = "";
      this.c();
    },
    return() {
      this.$router.push("/mine");
    },
    open() {
      this.$confirm('发布后将离开编辑页面, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '发布成功!'
        });
        this.current_questionnaire();
        this.return();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发布'
        });
      });
    }
  },
  mounted() {
    this.c();
    this.handleTextareaInput()
  },
}
</script>

<style scoped>
@import "../../assets/css/icon/preview.css";
.preview {
  background-color: #fff;
  max-height: 80vh;
  min-height: 80vh;
  width: 55vw;
  margin: auto;
  padding: 40px 80px;
  overflow-y: auto;
  padding-right: 100px;
}
.t-area {
  height: 80vh;
  width: 30vw;
}

.try-main {
  display: flex;
  margin: 0 auto;
  margin-top: 10px;
  width: 85vw;
}
.edit {
  display: flex;
  height: 80vh;
  width: 30vw;
  background: rgb(247, 247, 247);
}
#leftBox {
  width: 35px;
  height: 100%;
  text-align: left;
  float: left;
  padding-right: 5px;
}
#edit-content {
  padding: 10px 8px;
  width: 100%;
  height: 100%;
  line-height: 24px;
  font-size: 14px;
  color: black;
  font-family: inherit;
  border: 2px solid #eaeaea;
  background: rgb(255, 255, 255, 1);
  box-sizing: border-box;
  outline: none;
  resize: none;
}
#leftNum {
  padding: 10px 4px;
  line-height: 24px;
  font-size: 14px;
  text-align: right;
  resize: none;
  border-left: 2px solid #eaeaea;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  background: rgb(247, 247, 247);
  color: #999;
  text-align: right;
  font-weight: bold;
}
.header-title {
  font-size: 22px;
}
.btn {
  margin-top: 10px;
  margin-left: 65vw;
}
#tishi {
  margin-left: 10vw;
}
.shuo {
  margin: 3%;
  background: rgb(247, 247, 247);
  padding: 3%;
  white-space: pre-wrap;
}
.ming {
  margin-left: 3%;
  font-size: 18px;
  font-weight: bold;
  color: #1565c0;
}
</style>
