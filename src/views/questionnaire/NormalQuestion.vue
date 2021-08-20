<template>
  <div>
    <v-card class="mx-auto my-12" max-width="1000">
      <v-card elevation="2" class="title">
        <span>
          <v-dialog v-model="dialog_title" width="500">
            <template v-slot:activator="{ on, attrs }">
              <span dark v-bind="attrs" v-on="on">{{ title }}</span>
            </template>
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                修改标题
              </v-card-title>

              <v-card-text>
                <template>
                  <v-text-field v-model="title"> </v-text-field>
                </template>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog_title = false">
                  确认
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </span>
        <div>
          <span>
            <v-dialog v-model="dialog_describe" width="500">
              <template v-slot:activator="{ on, attrs }">
                <span dark v-bind="attrs" v-on="on">添加说明</span>
              </template>
              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  修改问卷说明
                </v-card-title>

                <v-card-text>
                  <template>
                    <v-text-field v-model="describe"> </v-text-field>
                  </template>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog_describe = false">
                    确认
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </span>
        </div>
      </v-card>
      <v-card >
        <v-card-title>
            题目控件
        </v-card-title>
        <div v-for="(item,index) in problem_list" :key="(item,index)">
        <v-btn>
            <v-icon>{{item.icon}}</v-icon>
            {{item.text}}
        </v-btn>
        </div>
    </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "NormalQuestion",
  data() {
    return {
      title: "添加标题",
      dialog_title: false,

      describe: "添加说明",
      dialog_describe: false,

      problem_list:[
          {text:'单选题',icon:'mdi-album'},
          {text:'多选题',icon:'mdi-check-bold'},
          {text:'单选题',icon:'mdi-alpha-i-box'}
      ]
    };
  },
  methods: {
    changeTitle() {
      this.is_change_title = !this.is_change_title;
    },
  },
//   created(){
//       axios({
//         url:'http://82.157.97.70/api/login_username_password',
//         method:'post',
//         params:{
//           password:'123',
//           username:'this.form.nickname'
//         },
//         // data:{}
//         
//       }).then((res)=>{
//         console.log(res)
//         this.$router.push('/')
//       })
//   }
}
</script>

<style scoped></style>
