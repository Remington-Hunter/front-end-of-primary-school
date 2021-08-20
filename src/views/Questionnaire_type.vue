<template>
  <div class="1" style="margin-top:2%">
    <div class="2" style="margin-top:2%;margin-left:50%">
      这是顶部栏
      <!-- 这是我放顶部栏的位置 -->
    </div>

    <v-app>
      <div class="3" style="margin-top:5%">
        <v-card class="common_question" style="margin-left:15%; margin-right: 7%; display: inline-block">
          <span class="iconfont icon-wenjuan" style="text-align: center;display:block;"></span>
          <div style="text-align: center;display:block;">普通问卷</div>
          <div style="text-align: center;display:block;">
            <v-btn class="ma-2" color="primary" to="/Home">
              <!-- to进行跳转 由于普通问卷页面没有做好，这里先转到home试一下-->
              创建
              <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
          </div>
        </v-card>

        <v-card class="common_question" style="margin-right:15%; margin-left: 7%; display: inline-block">
          <span class="iconfont icon-wenjuantoupiao" style="text-align: center;display:block;"></span>
          <div style="text-align: center;display:block;">投票问卷</div>
          <div style="text-align: center;display:block;">
            <v-btn class="ma-2" color="primary" to="/Home">
              <!-- to进行跳转 由于普通问卷页面没有做好，这里先转到home试一下-->
              创建
              <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
          </div>
        </v-card>

      </div>
      <div class="3" style="margin-top:3%">
        <v-card class="common_question" style="margin-left:15%; margin-right: 7%; display: inline-block">
          <span class="iconfont icon-dibudaohanglan-" style="text-align: center;display:block;"></span>
          <div style="text-align: center;display:block;">报名问卷</div>
          <div style="text-align: center;display:block;">
            <v-btn class="ma-2" color="primary" to="/Home">
              <!-- to进行跳转 由于普通问卷页面没有做好，这里先转到home试一下-->
              创建
              <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
          </div>
        </v-card>
        <v-card class="common_question" style="margin-right:15%; margin-left: 7%; display: inline-block">
          <span class="iconfont icon-wenjuantiaocha" style="text-align: center;display:block;"></span>
          <div style="text-align: center;display:block;">考试问卷</div>
          <div style="text-align: center;display:block;">
            <v-btn class="ma-2" color="primary" to="/Home">
              <!-- to进行跳转 由于普通问卷页面没有做好，这里先转到home试一下-->
              创建
              <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>
    </v-app>

  </div>


</template>

<script>

</script>


<style>

.common_question {
  height: 100% !important;
  width: 25%;
}

</style>