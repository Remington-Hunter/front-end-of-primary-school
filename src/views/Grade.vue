<template>
  <div>
    <el-button @click="toGradeAnalysis"></el-button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      id: 0,
      data: [],
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getData();
  },
  methods: {
    getseries() {
      // alert(1);
      var Data = new FormData();
      Data.append("id", this.id);
      axios({
        url: "https://www.azur1tee.top/api/answer/get_result",
        method: "post",
        data: Data,
        headers: {
          'Authorization': window.localStorage.getItem("authorization"),
          // "Content-Type": "application/json",
        },
      }).then((res) => {
        var data = res.data.data;
        console.log(res);
        this.data = data;
        this.getBarData(data);
        this.getColData(data);
        this.getPieData(data);
        this.getLineData(data);
        this.getCompletionData(data);
        this.initStates();
        this.getExcelData();
      });
    },
    getprops(data){
      this.headArr=[];
      // var data=this.data;
      // var question2 = data.questionInfo[this.v2];
      var len = data.questionInfo.length
      var c={label:"序号",prop:"0"}
      this.headArr.push(c);
      for (var i = 0; i < len; i++) {
        var s = "第"+(i+1)+"题："
        if(data.questionInfo[i].info.content==null){
          s+="内容为空"
        }
        else{
          s+=data.questionInfo[i].info.content;
        }
        c = { label: s, prop: (i + 1).toString() };
        this.headArr.push(c);
      }
    },
    getCompletionData(data) {
      for (var i = 0; i < this.data.length; i++) {
        if (
          data[i].question.type === 2 ||
          data[i].question.type === 5 ||
          data[i].question.type === 14
        ) {
          // console.log(11)
          var data_i = data[i].answerList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            var s = { id: j + 1, content: data_i[j].content };
            item.push(s);
          }
          this.completion.push(item);
        } else if (data[i].question.type === 3) {
          var data_i = data[i].optionList;
          var item = [];
          for (let j = 1; j < data_i.length; j++) {
            var c = "" + j + "星";
            console.log(data[i]);
            var s = { content: c, num: data_i[j].answerNum };
            console.log("data_i[j].answerNum" + data_i[j].answerNum);
            item.push(s);
          }
          this.completion.push(item);
        } else {
          var data_i = data[i].optionList;
          var item = [];
          for (let j = 0; j < data_i.length; j++) {
            var s = { content: data_i[j].content, num: data_i[j].answerNum };
            item.push(s);
          }
          this.completion.push(item);
        }
      }
    },
    toGradeAnalysis() {
      this.$router.push({ name: "gradeanalysis", params: { id: id } });
    },
     getAnswerData(){
      var Data=new FormData();
      Data.append("id",this.id);
      axios({
        url:'https://www.azur1tee.top/api/answer/get_result_by_questionnaire',
        method:'post',
        data:Data,
        headers: {
          Authorization: window.localStorage.getItem("authorization"),
        },
      }).then((res)=>{
        var data=res.data.data;
        this.answerData=data.answerInfo;
        console.log(data)
        console.log(res);
        // this.getAnswerData(data);
        this.getAnswerExcel(data);
      })
    },
    exportExcel() {
      // 设置当前日期
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let name = year + "" + month + "" + day;
      // console.log(name)
      /* generate workbook object from table */
      //  .table要导出的是哪一个表格
      var wb = XLSX.utils.table_to_book(document.querySelector("#demo2"));
      console.log(wb.Sheets.Sheet1)
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        //  name+'.xlsx'表示导出的excel表格名字
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          name + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    getAnswerExcel(data){
      this.getprops(data);
      this.table1 = [];
      var answerData = data.answerInfo;
      var len = answerData.length;
      // 
      for(var i=0;i<len;i++){
        var c = {};
        c["0"]=i+1;
        var item=answerData[i].answerList;
        for(var j=0;j<item.length;j++){
          if(data.questionInfo[j].info.type==2||data.questionInfo[j].info.type==5||data.questionInfo[j].info.type==14){
            c[(j+1).toString()]=item[j].content;
          }
          else if(data.questionInfo[j].info.type==3){
            var t=item[j].number-'0';
            if(t==0){
              c[(j+1).toString()]='无评价';
            }
            else{
              c[(j+1).toString()]=''+(t)+'星';
            }
            
          }
          else{
            var t='';
            for(var k=0;k<item[j].number.length;k++){
              var num=item[j].number[k]-'0';
              if(k==0){
                t=data.questionInfo[j].optionList[num].content;
              }
              else{
                t+='、'+data.questionInfo[j].optionList[num].content;
              }
            }
            c[(j+1).toString()]=t;
          }
        }
        this.table1.push(c);
        console.log(1111);
        console.log(this.table1);
      }
      
    },
    exportData() {
      this.excelData = this.completion; //将你要导出的数组数据（historyList）赋值给excelDate
      this.export2Excel(); //调用export2Excel函数，填写表头（clomns里的type）和对应字段(historyList里的属性名)
    },
    //表格数据写入excel
    export2Excel() {
      var that = this;
      require.ensure([], () => {
        const {
          export_json_to_excel,
        } = require("../assets/excel/Export2Excel");
        //这里使用绝对路径( @表示src文件夹 )，使用@/+存放export2Excel的路径【也可以写成相对于你当前"xxx.vue"文件的相对路径，例如我的页面放在assets文件夹同级下的views文件夹下的“home.vue”里，那这里路径也可以写成"../assets/excel/Export2Excel"】
        const tHeader = [content, num]; // 导出的excel表头名信息
        const filterVal = ["content", "num"]; // 导出的excel表头字段名，需要导出表格字段名
        const list = that.excelData;
        const data = that.formatJson(filterVal, list);

        export_json_to_excel(tHeader, data, "学生报名信息汇总"); // 导出的表格名称，根据需要自己命名
      });
    },
   
    //格式转换，直接复制即可,不需要修改什么
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
  },
};
</script>

<style lang="" scoped>
</style>