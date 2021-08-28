<template>
  <div style="margin:2% 15%">
    <el-row>
      <el-col :span="8">
        <v-card class="common_question">
          <span
            class="iconfont"
            style="text-align: center;display:block;"
          >&#xe643;</span>
          <div style="text-align: center;display:block;">普通问卷</div>
          <div style="text-align: center;display:block;">
            <v-btn
              height="5vh"
              class="ma-2"
              color="primary"
              @click="saveQues_normal"
            >
              <!-- to进行跳转 由于普通问卷页面没有做好，这里先转到home试一下-->
              创建
              <v-icon
                dark
                right
              >mdi-checkbox-marked-circle
              </v-icon>
            </v-btn>
          </div>
        </v-card>
      </el-col>
      <el-col :span="8">
        <v-card class="common_question">
          <span
            class="iconfont"
            style="text-align: center;display:block;"
          >&#xe69a;</span>
          <div style="text-align: center;display:block;">投票问卷</div>
          <div style="text-align: center;display:block;">
            <v-btn
              height="5vh"
              class="ma-2"
              color="primary"
              @click="saveQues_toupiao"
            >
              <!-- to进行跳转 由于普通问卷页面没有做好，这里先转到home试一下-->
              创建
              <v-icon
                dark
                right
              >mdi-checkbox-marked-circle
              </v-icon>
            </v-btn>
          </div>
        </v-card>
      </el-col>
      <el-col :span="8">
        <v-card class="common_question">
          <span
            class="iconfont"
            style="text-align: center;display:block;"
          >&#xe636;</span>
          <div style="text-align: center;display:block;">报名问卷</div>
          <div style="text-align: center;display:block;">
            <v-btn
              height="5vh"
              class="ma-2"
              color="primary"
              @click="saveQues_baoming"
            >
              <!-- to进行跳转 由于普通问卷页面没有做好，这里先转到home试一下-->
              创建
              <v-icon
                dark
                right
              >mdi-checkbox-marked-circle
              </v-icon>
            </v-btn>
          </div>
        </v-card>
      </el-col>
    </el-row>

    <el-row style="margin-top:40px">
      <el-col :span="8">
        <v-card class="common_question">
          <span
            class="iconfont"
            style="text-align: center;display:block;"
          >&#xe8bb;</span>
          <div style="text-align: center;display:block;">考试问卷</div>
          <div style="text-align: center;display:block;">
            <v-btn
              class="ma-2"
              color="primary"
              @click="saveQues_kaoshi"
              height="5vh"
            >
              <!-- to进行跳转 由于普通问卷页面没有做好，这里先转到home试一下-->
              创建
              <v-icon
                dark
                right
              >mdi-checkbox-marked-circle
              </v-icon>
            </v-btn>
          </div>
        </v-card>
      </el-col>
      <el-col :span="8">
        <v-card class="common_question">
          <span
            class="iconfont"
            style="text-align: center;display:block;"
          >&#xe6e2;</span>
          <div style="text-align: center;display:block;">疫情打卡问卷</div>
          <div style="text-align: center;display:block;">
            <v-btn
              height="5vh"
              class="ma-2"
              color="primary"
              @click="saveQues_daka"
            >
              <!-- to进行跳转 由于普通问卷页面没有做好，这里先转到home试一下-->
              创建
              <v-icon
                dark
                right
              >mdi-checkbox-marked-circle
              </v-icon>
            </v-btn>
          </div>
        </v-card>
      </el-col>
      <el-col :span="8">
        <v-card class="common_question">
          <span
            class="iconfont"
            style="text-align: center;display:block;"
          >&#xe652;</span>
          <div style="text-align: center;display:block;">更多问卷</div>
          <div style="text-align: center;display:block;">
          </div>
        </v-card>
      </el-col>
    </el-row>

  </div>

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      type: "",
      current_questionnaire: {},
    }
  },
  methods: {
    saveQues_normal() {
      this.current_questionnaire.userId = window.localStorage.getItem("user_id")
      this.current_questionnaire.type = 0;
      this.current_questionnaire.questionList = []
      // this.current_questionnaire.title = "题目";
      var formData = this.current_questionnaire
      console.log(JSON.stringify(formData));
      axios({
        method: "post",
        url: "https://www.azur1tee.top/api/questionnaire/save_questionnaire",
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
        data: JSON.stringify(formData),
      }).then((res) => {
        console.log(res);
        this.current_questionnaire.id = res.data.data;
        this.$router.push({ path: "/edit1/0", query: { id: this.current_questionnaire.id } })
        if (res.data.code === 200 || res.data.code === 201) {
          this.is_saved = true
          this.questionnaire_id = res.data.data
        }
        // alert(this.current_questionnaire.id);
      });
    },
    saveQues_toupiao() {
      this.current_questionnaire.userId = window.localStorage.getItem("user_id")
      this.current_questionnaire.type = 1;
      this.current_questionnaire.questionList = []
      // this.current_questionnaire.title = "题目";
      var formData = this.current_questionnaire
      console.log(JSON.stringify(formData));
      axios({
        method: "post",
        url: "https://www.azur1tee.top/api/questionnaire/save_questionnaire",
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
        data: JSON.stringify(formData),
      }).then((res) => {
        console.log(res);
        this.current_questionnaire.id = res.data.data;
        this.$router.push({ path: "/edit1/1", query: { id: this.current_questionnaire.id } })
        if (res.data.code === 200 || res.data.code === 201) {
          this.is_saved = true
          this.questionnaire_id = res.data.data
        }
      });
    },
    saveQues_baoming() {
      this.current_questionnaire.userId = window.localStorage.getItem("user_id")
      this.current_questionnaire.type = 2;
      this.current_questionnaire.questionList = []
      // this.current_questionnaire.title = "题目";
      var formData = this.current_questionnaire
      console.log(JSON.stringify(formData));
      axios({
        method: "post",
        url: "https://www.azur1tee.top/api/questionnaire/save_questionnaire",
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
        data: JSON.stringify(formData),
      }).then((res) => {
        console.log(res);
        this.current_questionnaire.id = res.data.data;
        this.$router.push({ path: "/edit1/2", query: { id: this.current_questionnaire.id } })
        if (res.data.code === 200 || res.data.code === 201) {
          this.is_saved = true
          this.questionnaire_id = res.data.data
        }
        // alert(this.current_questionnaire.id);
      });
    },
    saveQues_kaoshi() {
      this.current_questionnaire.userId = window.localStorage.getItem("user_id")
      this.current_questionnaire.type = 3;
      this.current_questionnaire.questionList = []
      // this.current_questionnaire.title = "题目";
      var formData = this.current_questionnaire
      console.log(JSON.stringify(formData));
      axios({
        method: "post",
        url: "https://www.azur1tee.top/api/questionnaire/save_questionnaire",
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
        data: JSON.stringify(formData),
      }).then((res) => {
        console.log(res);
        this.current_questionnaire.id = res.data.data;
        this.$router.push({ path: "/edit1/3", query: { id: this.current_questionnaire.id } })
        if (res.data.code === 200 || res.data.code === 201) {
          this.is_saved = true
          this.questionnaire_id = res.data.data
        }
        // alert(this.current_questionnaire.id);
      });
    },
    saveQues_daka() {
      this.current_questionnaire.userId = window.localStorage.getItem("user_id")
      this.current_questionnaire.type = 4;
      this.current_questionnaire.questionList = []
      // this.current_questionnaire.title = "题目";
      var formData = this.current_questionnaire
      console.log(JSON.stringify(formData));
      axios({
        method: "post",
        url: "https://www.azur1tee.top/api/questionnaire/save_questionnaire",
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
        data: JSON.stringify(formData),
      }).then((res) => {
        console.log(res);
        this.current_questionnaire.id = res.data.data;
        this.$router.push({ path: "/edit1/4", query: { id: this.current_questionnaire.id } })
        if (res.data.code === 200 || res.data.code === 201) {
          this.is_saved = true
          this.questionnaire_id = res.data.data
        }
        // alert(this.current_questionnaire.id);
      });
    },

  }
}
</script>


<style scoped>
.common_question {
  width: 80%;
  height: 35vh;
  padding: 2vh;
}

.iconfont {
  font-size: 13vh;
  color: #1e88e5;
}
</style>