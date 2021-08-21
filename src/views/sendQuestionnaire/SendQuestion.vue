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
                <span>问卷链接与二维码</span>
                <el-input v-model="input" style="margin-top:1%;width:50%;display:inline-block;"></el-input>
               <v-img
               
                max-height="200"
                max-width="200"
                height="150"
                width="170"
                v-bind:src="lianjie"
                style="display: block"
                ></v-img>
                <!-- 转换成二维码链接地址只需更改这个 -->
            </v-card>
        </div>
        <button  @click="change_lianjie()">点击</button>
    </div>
</template>

<script>
    export default {
    data() {
        return {
            input: '问卷链接',
            lianjie:'http://'
        }
    },
     methods:{
        change_lianjie() {
            this.lianjie = 'https://picsum.photos/id/11/500/300';
            alert(this.lianjie);
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