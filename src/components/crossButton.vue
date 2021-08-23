<template>
    <div>
        <el-divider></el-divider>
          <div class="question-head ">
            <div class="question-title">
              <span class="question-seq"><b>第{{ index + 1 }}题：</b></span>
              <span class="text">{item.question.content}}</span>
              <span
                v-if="item.question.type==0"
                class="question-type"
              >单选题</span>
              <span
                v-if="item.question.type==1"
                class="question-type"
              >多选题</span>
              <span
                v-if="item.question.type==2"
                class="question-type"
              >填空题</span>
              <span
                v-if="item.question.type==3"
                class="question-type"
              >评分题</span>
            </div>
          </div>
          <div v-if="item.question.type === 2">
            <el-table
              :data="completion[index]"
              style="width: 100%"
              class="table"
            >
              <el-table-column label="序号">
                <template slot-scope="scope">
                  <!-- <i class="el-icon-time"></i> -->
                  <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="内容">
                <template slot-scope="scope1">
                  <!-- <i class="el-icon-time"></i> -->
                  <span style="margin-left: 10px">{{
                    scope1.row.content
                  }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column
                label="content"
                width="180">
                <template slot-scope="scope1">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope1.row.content }}</span>
                </template>
              </el-table-column> -->
            </el-table>
          </div>
          <div v-else>
            <div v-if="bar[index].length !== 0">
              <!-- <Completion :data1="completion[index]"></Completion> -->
              <div>
                <el-table
                  :data="completion[index]"
                  style="width: 100%"
                  class="table"
                  border
                >
                  <el-table-column label="content">
                    <template slot-scope="scope2">
                      <!-- <i class="el-icon-time"></i> -->
                      <span style="margin-left: 10px">{{
                      scope2.row.content
                    }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="num">
                    <template slot-scope="scope3">
                      <!-- <i class="el-icon-time"></i> -->
                      <span style="margin-left: 10px">{{ scope3.row.num }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div
                style="width: 600px; height: 400px"
                v-if="type === 1"
              >
                <drawBar
                  :id="BarToString(index)"
                  :series="bar[index]"
                ></drawBar>
              </div>
              <div
                style="width: 600px; height: 400px"
                v-if="type === 2"
              >
                <drawLine
                  :id="LineToString(index)"
                  :series="line[index]"
                ></drawLine>
              </div>
              <div
                style="width: 600px; height: 400px"
                v-if="type === 3"
              >
                <drawPie
                  :id="PieToString(index)"
                  :series="pie[index]"
                ></drawPie>
              </div>
              <div
                style="width: 600px; height: 400px"
                v-if="type === 4"
              >
                <drawCol
                  :id="ColToString(index)"
                  :series="col[index]"
                ></drawCol>
              </div>
              <el-button @click="goto(0)">
                <span>表格</span>
              </el-button>
              <el-button @click="goto(1)">
                <span>条形图</span>
              </el-button>
              <el-button @click="goto(2)">
                <span>折线图</span>
              </el-button>
              <el-button @click="goto(3)">
                <span>饼图</span>
              </el-button>
              <el-button @click="goto(4)">
                <span>柱状图</span>
              </el-button>

            </div>
            <div v-else>
              <el-table
                :data="completion[index]"
                style="width: 100%"
              >
                <el-table-column label="序号">
                  <template slot-scope="scope">
                    <!-- <i class="el-icon-time"></i> -->
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="内容">
                  <template slot-scope="scope1">
                    <!-- <i class="el-icon-time"></i> -->
                    <span style="margin-left: 10px">{{
                    scope1.row.content
                  }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
    </div>
</template>
<script>
export default {
    props:{

    }
}
</script>

<style  scoped>
@import "../assets/css/icon/analysis.css";
</style>