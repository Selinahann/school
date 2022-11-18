<template>
  <div class="architectures-page">
    <header class="header-bar">
      <h2>组织架构</h2>
    </header>
    <main class="content" v-if="architectures_id">
      <div class="left-tree">
        <el-button type="primary" class="add-btn" plain @click="addChildren">添加部门</el-button>
        <el-tree
          :data="tableData"
          :current-node-key="architectures_id"
          node-key="architectures_id"
          highlight-current
          default-expand-all
          :expand-on-click-node="false"
          @node-click="(item) => fetchEmployeeList({
            architectures_id: item.architectures_id
          })"
        >
          <span class="custom-tree-node" slot-scope="{ data }">
            <span>{{ data.architectures_name }}</span>
            <span>
              <el-button
                type="text"
                size="mini"
                icon="el-icon-plus"
                :style="{
                  marginRight: '10px'
                }"
                @click="() => addChildren(data)"
              >
              </el-button>
              <el-popconfirm
                :title="`确定要删除${data.architectures_name}吗？`"
                @confirm="handlerDelete(data.architectures_id)"
              >
                <el-button slot="reference" icon="el-icon-delete" type="text" size="small"></el-button>
              </el-popconfirm>
            </span>
          </span>
        </el-tree>
      </div>
      <div class="tab-content">
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色成员" name="employee">
            <el-button type="primary" @click="createEmployeeVisible = true">添加员工</el-button>
            <el-table
              :data="employeeData"
              style="width: 100%">
              <el-table-column
                prop="user_name"
                label="员工姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="id_card"
                label="身份证号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="sex"
                label="性别"
                width="180">
              </el-table-column>
              <el-table-column
                prop="mobile"
                label="手机号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="nation"
                label="民族"
                width="180">
              </el-table-column>
              <el-table-column
                prop="native_place"
                label="籍贯"
                width="180">
              </el-table-column>
              <el-table-column
                prop="education"
                label="学历">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="角色权限" name="second">
            <authority :architectures_id="architectures_id" :viewsData="viewsData" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </main>
    <el-dialog title="添加专业" :visible.sync="dialogFormVisible">
      <el-form label-position="top" :model="createParams" :rules="rules" ref="createform">
        <el-form-item prop="room_num" label="上级部门" v-if="createParams.parent_name">
          <el-input v-model="createParams.parent_name" disabled></el-input>
        </el-form-item>
        <el-form-item prop="architectures_name" label="部门名称">
          <el-input v-model="createParams.architectures_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCreateSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加员工" :visible.sync="createEmployeeVisible">
      <createEmployee ref="employeeform" :architectures_id="architectures_id" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="createEmployeeVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCreateEmployeeSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CreateEmployee from './components/CreateEmployee'
import Authority from './components/Authority'
export default {
  name: 'enterpriseArchitectures',
  components: {
    CreateEmployee,
    Authority
  },
  data () {
    return {
      dialogFormVisible: false,
      createEmployeeVisible: false,
      activeName: 'employee',
      architectures_id: '',
      createParams: {
        parent_id: '',
        parent_name: '',
        architectures_name: ''
      },
      rules: {
        architectures_name: [
          { required: true, message: '请输入部门名称' }
        ]
      },
      employeeData: [],
      tableData: [],
      viewsData: []
    }
  },
  watch: {
    dialogFormVisible (value) {
      if (!value) {
        this.createRoomParams = {
          parent_name: '',
          parent_id: '',
          architectures_name: ''
        }
        this.$refs.createform.resetFields()
      }
    }
  },
  created () {
    this.fetchArchitecturesList()
  },
  methods: {
    async fetchArchitecturesList (params) {
      const res = await this.$api.enterprise.architectures.list(params)
      this.tableData = res.data
      this.architectures_id = res.data[0].architectures_id
      this.fetchEmployeeList({
        architectures_id: res.data[0].architectures_id
      })
    },
    async fetchEmployeeList (params) {
      this.architectures_id = params.architectures_id
      const res = await this.$api.enterprise.employee.list(params)
      this.employeeData = res.data
      this.fetchArchitecturesView()
    },
    async fetchArchitecturesView () {
      const res = await this.$api.enterprise.architectures.view({
        architectures_id: this.architectures_id
      })
      this.viewsData = res.data
    },
    addChildren (item) {
      if (item) {
        this.createParams.parent_id = item.architectures_id
        this.createParams.parent_name = item.architectures_name
      } else {
        this.createParams.parent_id = ''
        this.createParams.parent_name = ''
      }
      this.dialogFormVisible = true
    },
    onCreateEmployeeSubmit () {
      this.$refs.employeeform.submit().then(() => {
        this.createEmployeeVisible = false
        this.fetchEmployeeList({
          architectures_id: this.architectures_id
        })
      })
    },
    onCreateSubmit () {
      this.$api.enterprise.architectures.create(this.createParams).then(() => {
        this.dialogFormVisible = false
        this.fetchArchitecturesList()
      }).catch(() => {
        // this.dialogFormVisible = false
      })
      // this.$refs.createform.validate((valid) => {
      //   if (valid) {
      //     if (this.createRoomParams.room_id) {
      //       console.log('编辑')
      //       this.dialogFormVisible = false
      //       this.fetchQuestionsList({})
      //     } else {
      //       this.$api.academic.room.create(this.createRoomParams).then(() => {
      //         this.dialogFormVisible = false
      //         this.fetchQuestionsList({})
      //       }).catch(() => {
      //         // this.dialogFormVisible = false
      //       })
      //     }
      //   }
      // })
    },
    handlerDelete (id) {
      this.$api.enterprise.architectures.remove(id).then(() => {
        this.$message({
          message: '部门删除成功',
          type: 'success'
        })
        this.fetchArchitecturesList({})
      })
    },
    handlerEdit (item) {
      this.createRoomParams = item
      this.dialogFormVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.architectures-page {
  .header-bar {
    @include flex(row, center, space-between);
    // height: 100px;
    // justify-content: space-between;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    background: #fff;
    // margin-bottom: 20px;
    padding: 20px;
    font-weight: bold;
    // padding-top: 20px;
  }
  .content {
    @include flex(row);
    background: #fff;
    .left-tree {
      width: 300px;
      height: calc(100vh - 160px);
      // padding: 20px;
      border-right: 1px solid #eee;
      .add-btn {
        display: block;
        margin: 20px;
        width: calc(100% - 40px);
      }
      ::v-deep .el-tree {
        .el-tree-node{
          width: 100%;
        }
        .el-tree-node__content {
          font-size: 12px;
          height: auto;
          line-height: 50px;
          border-bottom: 1px solid #eee;
          .custom-tree-node {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding-right: 20px;
          }
        }
      }
    }
    .tab-content {
      padding: 20px;
      width: 100%;
    }
  }
}
</style>
