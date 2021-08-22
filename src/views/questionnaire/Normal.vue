<template>
  <div>
    <el-container style="height: 600px;">
      <el-aside width="200px">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>题目控件</template>
            <el-menu-item index="1-1">单选题</el-menu-item>
            <el-menu-item index="1-2">多选题</el-menu-item>
            <el-menu-item index="1-3">评分题</el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>

      <el-container style="border-left: solid 2px #e6e6e6;">
        <div>
          <div
            @click="dialogFormVisible = true"
            style="cursor: pointer;"
            id="top"
          >
            <div class="header-title">{{title}}</div>
            <div class="header-subtitle">{{ description }}</div>
            <p class="sub">编辑问卷标题和描述</p>
          </div>
          <el-dialog
            title="题目"
            :visible.sync="dialogFormVisible"
            center
          >
            <el-form>
              <el-form-item
                label="标题"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="title"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="描述"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="description"
                  autocomplete="off"
                  type="textarea"
                  autosize
                  placeholder="请输入描述"
                ></el-input>
              </el-form-item>

            </el-form>
            <div
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="dialogFormVisible = false"
              >确 定</el-button>
            </div>
          </el-dialog>

        </div>
      </el-container>
    </el-container>
  </div>
</template>



<script>
import "../../assets/css/icon/preview.css"

export default {
  data() {
    return {
      title: "题目",
      description: "为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！",
      formLabelWidth: '100px',
      dialogFormVisible: false,
    }
  },
  methods: {

  },
};
</script>

<style >
.v-application ul,
.v-application ol {
  padding-left: 0;
}
.v-application p {
  margin-bottom: 0;
}
.el-form-item__content {
  margin-right: 50px;
}
</style>

<style scoped>
#top {
  padding: 20px 120px;
}
#top:hover {
  background-color: rgb(245, 245, 245);
}
.sub {
  color: lightgrey;
  padding-top: 10px;
}
.q-head {
  display: block;
}
.header-title {
  font-size: 22px;
}
.header-subtitle {
  margin-top: 20px;
}
</style>