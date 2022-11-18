<template>
<div class="detail-page">
  <div class="info">
    <h2 class="title">{{detail.name}}</h2>
    <p class="des">{{detail.remark}}</p>
    <footer class="footer-bar">
      <b class="price">{{detail.price}}</b>/<b>{{detail.unit}}</b>
    </footer>
  </div>
  <div class="detail">
    <el-tabs v-model="tabActive">
      <el-button type="primary" @click="dialogFormVisible = true">添加课程</el-button>
      <el-tab-pane label="专业课程" name="first">
        <el-tree
          :data="subject"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <template v-if="node.level === 1">
              <span>{{ data.subject_title }}</span>
              <span>
                <el-button
                  type="text"
                  size="mini">
                  添加
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                >
                  删除
                </el-button>
              </span>
            </template>
            <template v-else>
              <span>{{ data.outline_title }}</span>
              <span>
                <el-button
                  type="text"
                  size="mini"
                >
                  删除
                </el-button>
              </span>
            </template>
          </span>
        </el-tree>
      </el-tab-pane>
    </el-tabs>
  </div>
  <el-dialog title="添加专业" :visible.sync="dialogFormVisible">
    <el-form label-position="top" :model="editParams" :rules="rules" ref="createform">
      <el-form-item prop="subject"  label="课程设置">
        <subject-edit v-model="editParams.subject" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="onCreateSubmit">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: 'majors_detail',
  data () {
    return {
      dialogFormVisible: false,
      tabActive: 'first',
      detail: {},
      subject: [],
      editParams: {
        subject: []
      },
      rules: {}
    }
  },
  created () {
    this.fetchMajorsDetail()
  },
  methods: {
    async fetchMajorsDetail () {
      const res = await this.$api.educational.majors.detail(this.$route.params.id)
      const subjectRes = await this.$api.educational.subject.list({
        majors_id: this.$route.params.id
      })
      this.subject = subjectRes.data
      this.editParams.subject = subjectRes.data
      this.detail = res.data
    },
    onCreateSubmit () {
      this.$refs.createform.validate((valid) => {
        if (valid) {
          this.$api.educational.subject.create({
            subject: this.editParams.subject,
            majors_id: this.$route.params.id
          }).then(async () => {
            const subjectRes = await this.$api.educational.subject.list({
              majors_id: this.$route.params.id
            })
            this.subject = subjectRes.data
            this.editParams.subject = subjectRes.data
          })
          // this.$api.academic.room.create(this.createRoomParams).then(() => {
          //   this.dialogFormVisible = false
          //   this.fetchQuestionsList({})
          // }).catch(() => {
          //   // this.dialogFormVisible = false
          // })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-page {
  // @include flex(row);
  @include wh(100%, calc(100vh - 60px));
  overflow: auto;
  .info {
    background: #fff;
    width: 100%;
    // margin: 20px;
    border-top: 1px solid #eee;
    padding: 20px;
    box-sizing: border-box;
    .title {
      font-size: 24px;
    }
    .des {
      font-size: 12px;
      color: #666;
      margin-top: 20px;
      line-height: 1.5;
    }
    .footer-bar {
      margin-top: 20px;
      .price {
        font-size: 24px;
      }
    }
  }
  .detail {
    background: #fff;
    flex: 1;
    margin-top: 20px;
    // margin-right: 20px;
    padding: 20px;
    ::v-deep .el-tree {
      .el-tree-node{
        width: 100%;
      }
      .el-tree-node__content {
        font-size: 12px;
        height: auto;
        line-height: 40px;
        background: #efefef;
        margin-bottom: 10px;
        .custom-tree-node {
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding-right: 20px;
        }
      }
      .el-tree-node__children {
        .el-tree-node__content {
          background: #fff;
          margin-bottom: 0;
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
}
</style>
