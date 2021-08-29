<template>
  <div>
    <div></div>
    <div id="">
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
  </div>
</template>


<script>
export default {
  props: {
    num: {
      type: Number,
    },
  },
  data() {
    return {
      series: ["1", "2", "3"],
      msg1: "饼状图",
      id: this.id1,
      bar: [],
      data: [],
      pie: [],
      col: [],
      line: [],
      completion: [],
      historyList: [],
      type: 0,
      states: [],
      s: {},
      answer: [],
      answerData: [],
      headArr: [],
      table1: [],
    };
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
          Authorization: window.localStorage.getItem("authorization"),
          // "Content-Type": "application/json",
        },
      }).then((res) => {
        var data = res.data.data;
        console.log(res);
        this.data = data;
        // this.getBarData(data);
        // this.getColData(data);
        // this.getPieData(data);
        // this.getLineData(data);
        // this.getCompletionData(data);
        // this.initStates();
        // this.getExcelData();
      });
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
        console.log(data);
        console.log(res);
        // this.getAnswerData(data);
        // this.getAnswerExcel(data);
      });
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
      var wb = XLSX.utils.table_to_book(document.querySelector("#"));
      console.log(wb.Sheets.Sheet1);
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
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
  mounted() {
    this.id = this.num;
    c
    this.getseries();
    this.getAnswerData();
  },
};
</script>

<style lang="" scoped>
</style>