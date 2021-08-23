<template>
  <div>
    <div style="width:20%;float:left">
      <v-card
        :loading="loading"
        class="mx-auto my-12"
        max-width="374"
        style="left:20%"
      >

        <v-img
          height="250"
          src="../assets/cooking.png"
        ></v-img>

        <!-- <v-avatar style="left:40%">
      <img
        :src="img"
        
      >
    </v-avatar> -->
        <v-card-title>{{username}}</v-card-title>
        <v-card-text>

          <div>这是您的个人中心，请完善您的个人信息吧！</div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <!-- <v-card-title>Tonight's availability</v-card-title> -->
        <v-card-actions>
          <v-btn
            color="deep-purple lighten-2"
            text
            @click="reserve(true)"
          >
            我的账户
          </v-btn>
          <v-btn
            color="deep-purple lighten-2"
            text
            @click="goBack"
            style="left:45%"
          >
            返回
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div style="width:70%;float:left">

      <v-card
        :loading="loading"
        class="mx-auto my-12"
        max-width="1000"
        style="left:10%"
        v-show="flag"
      >

        <v-card-text>
          <v-card-title>账户信息</v-card-title>
          <div style="margin-left:15px">用户名:{{username}}</div>
          <br />
          <br />
          <br />
          <br />
          <v-card-title>账户设置</v-card-title>
          <div style="margin-left:15px">
            <span>手机号码:{{phoneNumber}}</span>
            <v-btn
              style="float:right;right:20%"
              elevation="2"
              @click="phoneDialog=true"
            >绑定</v-btn>
          </div>
          <br>
          <br>
          <div style="margin-left:15px">
            <span>我的邮箱:{{emile}}</span>
            <v-btn
              elevation="2"
              style="float:right;right:20%"
              @click="emailDialog = true"
            >绑定</v-btn>
          </div>
          <br>
          <br>
          <br>
          <br>
          <div>
            <v-card-title>我的资源</v-card-title>
            <v-card
              :loading="loading"
              class="mx-auto my-12"
              max-width="250"
              style="left:-35%"
            >
              <v-icon
                large
                color="blue darken-2"
                style="left:43%;margin-top:10px"
              >
                mdi-message-text
              </v-icon>
              <br>
              <br>
              <h3 style="text-align:center">限时免费</h3>
              <br>

              <div style="text-align:center">
                短信条数不受限制
              </div>
              <br>
            </v-card>
          </div>

        </v-card-text>
        <v-dialog
          v-model="phoneDialog"
          max-width="500px"
        >
          <v-card>
            <v-card-text>
              <v-text-field label="请输入新的电话号码"></v-text-field>

              <!-- <small class="grey--text">：</small> -->
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                text
                color="primary"
                @click="updatePhone"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="emailDialog"
          max-width="500px"
        >
          <v-card>
            <v-card-text>
              <v-text-field
                label="请输入新的邮箱"
                v-model="phone"
              ></v-text-field>

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                text
                color="primary"
                @click="updateEmail"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default
  {
    data: () => ({
      loading: false,
      selection: 1,
      // img:'',
      phone: '',
      phoneNumber: '未绑定',
      phoneDialog: false,
      emile: '未绑定',
      emailDialog: false,
      username: window.localStorage.getItem('userName'),
      emailData: '',
      flag: true
    }),
    mounted(){
      this.getData();
    },
    methods:
    {
      getData(){
        axios({
          url:'',
          method:'post',
          headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
          },
        }).then((res)=>{
          if(res.data.data.phone!==null){
            this.phoneNumber=res.data.data.phone
          }
          if(res.data.data.email!==null){
            this.emailNumber=res.data.data.email
          }
        })
      },
      goBack() {
        this.$router.go(-1)
      },
      reserve(item) {
        this.flag = item
      },
      goTo(path) {
        this.$router.replace(path);
      },
      // get_user_img(){
      //   var Data=FormData();
      //   // user_id:
      //   Data.append('user_id',window.localStorage.getItem('user_id'))
      //   axios({
      //     url:'',
      //     method:'post',
      //     data:Data

      //   }).then((res)=>{
      //     this.img=res.data.img,
      //     this.username=res.data.username
      //   })
      // }
      updatePhone() {
        var Data = new FormData();
        this.phoneDialog = true
        Data.append('phone', this.phoneNumber)
        axios({
          url: '',
          mehtod: 'post',
          data: Data,
          headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
          },
        }).then((res) => {
          this.phoneNumber = this.phone,
            this.phone = '',
            this.phoneDialog = false
        })
      },
      updateEmail() {
        var Data = new FormData();
        this.emailDialog = true
        Data.append('email', this.email)
        axios({
          url: '',
          mehtod: 'post',
          data: Data,
          headers: {
          Authorization: window.localStorage.getItem("authorization"),
          "Content-Type": "application/json",
          },
        }).then((res) => {
          this.emailNumber = this.emailData,
            this.emailData = '',
            this.emailDialog = false
        })
      }
    }
  }

</script>

<style scoped>
</style>
