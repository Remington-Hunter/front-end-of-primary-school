<template>
  <div>
    <!-- <di</div> -->
    <div>
      <el-select v-model="v1" filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div>
      <el-select v-model="v2" filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <el-button type="primary" @click="getAnalysis(v1, v2)">提交</el-button>
    <el-table :data="table1" border height="550" style="width: 100%">
      <template v-for="(item, index) in headArr">
        <el-table-column
          :key="index"
          :prop="item.prop"
          :label="item.label"
          align="center"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row[item.prop] }}
            </span>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: 0,
      answer: [],
      answerData: [],
      options: [],
      //   options2:[],
      v1: "",
      v2: "",
      data: [],
      ishow: false,
      table1: [],
      headArr:[],
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    // console.log(this.id);
    this.getAnswerData();
  },
  methods: {
      getString(str){
          if(str.length>10){
              str=str.substring(0,10)+'...';
          }
          return str;
      },
    getprops(data) {
        this.headArr=[];
        var data=this.data;
      var question2 = data.questionInfo[this.v2];
    //   console.log(question2)
      var len = question2.optionList.length;
      var c={label:'X/Y',prop:'0'};
      this.headArr.push(c);
    //   var c = { 0: "X\\Y" };
      for (var i = 0; i < len; i++) {
          var s='';
          if(question2.optionList[i].content==null){
              s=''+(i+1)+'星';
          }
          else{
              s=question2.optionList[i].content
          }
        c={label:s,prop:(i+1).toString()} 
        this.headArr.push(c);
      }
      c={label:'总计',prop:(len+1).toString()}
      this.headArr.push(c);
    //   for(var i=0;i<len;i++){
    //       c={label:'',prop:i+1};
    //       this.headArr.push(c)
    //   }
    //   console.log('我是');
    //   console.log(this.headArr)
    },
    tableRowClassName: function (obj) {
      if (obj.rowIndex % 2 == 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
      return "";
    },
    getAnswerData() {
      var Data = new FormData();
      Data.append("id", this.id);
      axios({
        url: "https://www.azur1tee.top/api/answer/get_result_by_questionnaire",
        method: "post",
        data: Data,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
        },
      }).then((res) => {
        var data = res.data.data;
        this.answerData = data.answerInfo;
        // console.log(data)
        // console.log(res);
        // this.getAnswerData(data);
        this.data = data;
        this.getOptions(data);
        
        // console.log(1111);
      });
    },
    getOptions() {
        var data=this.data;
      //   var answerInfo=data.answerInfo;
      var questionInfo = data.questionInfo;
      //   console.log(answerInfo.length)
      for (var i = 0; i < questionInfo.length; i++) {
        if (questionInfo[i].info.type == 2) {
          continue;
        } else {
          var content = "" + (i + 1) + "." + questionInfo[i].info.content;
          if (content.length > 10) {
            content = content.substring(0, 10) + "...";
          }
          var c = { value: i, label: content };
        }
        this.options.push(c);
      }
    },
    getAnalysis(v1, v2) {
      this.table1 = [];
      console.log(1324141)
    console.log(this.table1)
      var data = this.data;
    //   console.log(v1);
    //   console.log(v2);
      var question1 = data.questionInfo[v1];
      var question2 = data.questionInfo[v2];
      var answerData = data.answerInfo;
      var len = question2.optionList.length;
      var c={}
      // console.log(c);
    //   console.log(question1.length);
      for (var i = 0; i < question1.optionList.length; i++) {
        c = {};
        if (question1.optionList[i].content == null) {
          c['0'] = "" + (i + 1) + "星";
        } else {
          c['0'] = question1.optionList[i].content;
        }

        // console.log(question1.optionList[i].content);
        var num = 0;
        var item = [];
        for (var j = 0; j < question2.optionList.length; j++) {
          var num1 = 0;
          var s1 = i.toString();
          var s2 = j.toString();
          for (var k = 0; k < answerData.length; k++) {
            // var answer=;
            // if()
            // console.log(k);
            // console.log("fafafafaf");
            // console.log(answerData[k].answerList);
            // console.log(answerData[k]);
            // console.log(s1);
            // console.log(answerData[k].answerList[v2]);
            // console.log(s2);
            // if(){}
            if (answerData[k].answerList.length == 0) {
              continue;
            }
            // if(answerData[k].answerList[v1]||answerData[k].answerList[v2])
            if (
              answerData[k].answerList[v1].number.indexOf(s1) != -1 &&
              answerData[k].answerList[v2].number.indexOf(s2) != -1
            ) {
              num1++;
            }
          }
          item.push(num1);
          num += num1;
        }
        for (var j = 0; j < question2.optionList.length; j++) {
          var t = 0;
          if (num == 0) {
            t = 0.0;
          } else {
            // console.log(item[j]);
            // console.log(num);
            t = (item[j] / num) * 100;
          }
          t = t.toFixed(2);
          var c1 = t;
          c[(j + 1).toString()] = "" + item[j] + "(" + c1 + ")" + "%";
        }
        c[(len + 1).toString()] = num;
        // console.log("c");
        // console.log(c);
        this.table1.push(c);
      }
    //   console.log(this.table1);
    this.getprops();
    
    },
    
  },
};
</script>
<style scoped>
</style>>
    