<template>
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
    style="right:30%"
  >

    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>
    
    <!-- <v-avatar style="left:40%">
      <img
        :src="img"
        
      >
    </v-avatar> -->
    <v-card-title >{{username}}</v-card-title>
    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1">
        $ • Italian, Cafe
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <!-- <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text> -->

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="reserve"
        style="left:10%"
      >
        我的账户
      </v-btn>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="reserve"
        style="left:45%"
      >
        我的团队
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import axios from 'axios';
export default
  {
    data: () => ({
      loading: false,
      selection: 1,
      // img:'',
      username:window.localStorage.getItem('userName')
    }),
    methods:
    {
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
    }
  }

</script>

<style scoped>
</style>
