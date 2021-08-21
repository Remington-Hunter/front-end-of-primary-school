<template>
    <div>
        <div style="margin-top:1%;float:right;">
            <v-btn style="width:80%"> 
                <v-icon>mdi-eye</v-icon>
                预览问卷
            </v-btn>
        </div>
        <div style="margin-left:20%;padding-top:5%">
            <v-card class="question" style="text-align: center;display:block;">
                问卷链接与二维码
               <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="200"
                max-width="200"
                height="150"
                width="170"
                src="https://picsum.photos/id/11/500/300"
                style="display: block"
                ></v-img>
                <!-- 转换成二维码链接地址只需更改这个 -->
                <el-input v-model="input" style="width:50%;display:inline-block;"></el-input>
            </v-card>
        </div>
    </div>
</template>

<script>
    export default {
    data() {
        return {
        input: '问卷链接'
        }
    }
    }
</script>


<style>
.v-btn__content {
    color: #1ea0fa;
}
.question{
    width:80%;
    height: 200% !important;
}
</style>