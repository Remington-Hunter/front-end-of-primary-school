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
          <span class="iconfont"  style="text-align: center;display:block;">&#xe643;</span>
          <div style="text-align: center;display:block;">普通问卷</div>
          <div style="text-align: center;display:block;">
            <v-btn
              class="ma-2"
              color="primary"
              to="/edit"
            >
              <!-- to进行跳转 由于普通问卷页面没有做好，这里先转到home试一下-->
              创建
              <v-icon
                dark
                right
              >mdi-checkbox-marked-circle</v-icon>
            </v-btn>
          </div>
        </v-card>

        <v-card
          class="common_question"
          style="margin-right:15%; margin-left: 7%; display: inline-block"
        >
          <span class="iconfont"  style="text-align: center;display:block;">&#xe69a;</span>
          <div style="text-align: center;display:block;">投票问卷</div>
          <div style="text-align: center;display:block;">
            <v-btn
              class="ma-2"
              color="primary"
              to="/Home"
            >
              <!-- to进行跳转 由于普通问卷页面没有做好，这里先转到home试一下-->
              创建
              <v-icon
                dark
                right
              >mdi-checkbox-marked-circle</v-icon>
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
          <span class="iconfont"  style="text-align: center;display:block;">&#xe636;</span>
          <div style="text-align: center;display:block;">报名问卷</div>
          <div style="text-align: center;display:block;">
            <v-btn
              class="ma-2"
              color="primary"
              to="/Home"
            >
              <!-- to进行跳转 由于普通问卷页面没有做好，这里先转到home试一下-->
              创建
              <v-icon
                dark
                right
              >mdi-checkbox-marked-circle</v-icon>
            </v-btn>
          </div>
        </v-card>
        <v-card
          class="common_question"
          style="margin-right:15%; margin-left: 7%; display: inline-block"
        >
          <span class="iconfont"  style="text-align: center;display:block;">&#xe8bb;</span>
          <div style="text-align: center;display:block;">考试问卷</div>
          <div style="text-align: center;display:block;">
            <v-btn
              class="ma-2"
              color="primary"
              to="/Home"
            >
              <!-- to进行跳转 由于普通问卷页面没有做好，这里先转到home试一下-->
              创建
              <v-icon
                dark
                right
              >mdi-checkbox-marked-circle</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>
    </v-app>

  </div>

</template>

<script>

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