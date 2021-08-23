<template>
  <div
    class="1"
    style="margin-top:2%"
  >

    <v-app>
      <div class="3">
        <v-card
          class="common_question"
          style="margin-left:15%; margin-right: 7%; display: inline-block"
        >
          <span
            class="iconfont"
            style="text-align: center;display:block;"
          >&#xe643;</span>
          <div style="text-align: center;display:block;">普通问卷</div>
          <div style="text-align: center;display:block;">
            <v-btn
              class="ma-2"
              color="primary"
              :to="'/edit'+'/'+0"
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

        <v-card
          class="common_question"
          style="margin-right:15%; margin-left: 7%; display: inline-block"
        >
          <span
            class="iconfont"
            style="text-align: center;display:block;"
          >&#xe69a;</span>
          <div style="text-align: center;display:block;">投票问卷</div>
          <div style="text-align: center;display:block;">
            <v-btn
              class="ma-2"
              color="primary"
              :to="'/edit'+'/'+1"
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

      </div>
      <div
        class="3"
        style="margin-top:3%"
      >
        <v-card
          class="common_question"
          style="margin-left:15%; margin-right: 7%; display: inline-block"
        >
          <span
            class="iconfont"
            style="text-align: center;display:block;"
          >&#xe636;</span>
          <div style="text-align: center;display:block;">报名问卷</div>
          <div style="text-align: center;display:block;">
            <v-btn
              class="ma-2"
              color="primary"
              :to="'/edit'+'/'+2"
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
        <v-card
          class="common_question"
          style="margin-right:15%; margin-left: 7%; display: inline-block"
        >
          <span
            class="iconfont"
            style="text-align: center;display:block;"
          >&#xe8bb;</span>
          <div style="text-align: center;display:block;">更多问卷</div>
          <div style="text-align: center;display:block;">
            <v-btn
              disabled
              class="ma-2"
              color="primary"
              :to="'/edit'+'/'+3"
            >
              <!-- to进行跳转 由于普通问卷页面没有做好，这里先转到home试一下-->
              敬请期待
              <!-- <v-icon
                  dark
                  right
              >mdi-checkbox-marked-circle
              </v-icon> -->
            </v-btn>
          </div>
        </v-card>
      </div>
    </v-app>

  </div>

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      type: "",
      current_questionnaire:{},
    }
  },
  methods:{
    saveQues_normal() {
      this.current_questionnaire.userId = window.localStorage.getItem("user_id")
      this.current_questionnaire.type = 0;
      var formData = this.current_questionnaire
      // console.log(JSON.stringify(formData));
      axios({
        method: "post",
        url: "http://82.157.97.70/api/questionnaire/save_questionnaire",
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
        data: JSON.stringify(formData),
      }).then((res) => {
        console.log(res);
        this.current_questionnaire.id = res.data.data;
        if (res.data.code === 200 || res.data.code === 201) {
          this.is_saved = true
          this.questionnaire_id = res.data.data
        }
      });
    },
  }
}
</script>


<style scoped>
.common_question {
  height: 100% !important;
  width: 25%;
}

.theme--light.v-application {
  background: #f4f6f9;
  color: rgba(0, 0, 0, 0.87);
}
</style>