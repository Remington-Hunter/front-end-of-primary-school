<template>
    <div class="1" style="margin-top:2%">
        <div class="2" style="margin-top:2%;margin-left:50%">
            这是顶部栏
            <!-- 这是我放顶部栏的位置 -->
        </div>       

        <v-app>
        <div class="3" style="margin-top:5%" >
            <v-card class="common_question" style="margin-left:15%">  
                <span class="iconfont icon-wenjuan" style="margin-left:28%;margin-top:10%"></span>
                <div style="margin-top:-2%;margin-left:36%">普通问卷</div>
                <div style="margin-left:30%">
                    <v-btn class="ma-2" color="primary" to="/Home">
                    <!-- to进行跳转 由于普通问卷页面没有做好，这里先转到home试一下-->
                        创建
                    <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
                    </v-btn>
                </div>
            </v-card>

        <v-card class="common_question" style="margin-left:60%;margin-top:-22.6%">  
            <span class="iconfont icon-wenjuantoupiao" style="margin-left:28%;margin-top:10%"></span>
            <div style="margin-top:-2%;margin-left:36%">投票问卷</div>
            <div  style="margin-left:30%">
                <v-btn class="ma-2" color="primary" to="/Home">
                <!-- to进行跳转 由于普通问卷页面没有做好，这里先转到home试一下-->
                    创建
                <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
                </v-btn>
            </div>
        </v-card>

        </div>
         <div class="3" style="margin-top:3%">
            <v-card class="common_question" style="margin-left:15%">  
                <span class="iconfont icon-dibudaohanglan-" style="margin-left:28%;margin-top:10%"></span>
                <div style="margin-top:-2%;margin-left:36%">报名问卷</div>
                <div style="margin-left:30%">
                    <v-btn class="ma-2" color="primary" to="/Home">
                    <!-- to进行跳转 由于普通问卷页面没有做好，这里先转到home试一下-->
                        创建
                    <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
                    </v-btn>
                </div>
            </v-card>
            <v-card class="common_question" style="margin-left:60%;margin-top:-22.2%">  
                <span class="iconfont icon-wenjuantiaocha" style="margin-left:28%;margin-top:10%"></span>
                <div style="margin-top:-2%;margin-left:36%">考试问卷</div>
                <div style="margin-left:30%">
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
    height: 280px!important;
    width: 25%;
}

</style>