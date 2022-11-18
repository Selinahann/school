<template>
  <div>
    <super-table
      title="组织架构"
      :data="tableData"
      :column="column"
      row-key="architectures_id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      default-expand-all
      @filter="this.fetchArchitecturesList"
    >
      <template v-slot:tools>
        <el-button type="primary" @click="addChildren">添加部门</el-button>
      </template>
      <template v-slot:action="scope">
        <el-button type="text" size="small" @click="addChildren(scope.row)">添加</el-button>
        <el-popconfirm
          :title="`确定要删除${scope.row.architectures_name}吗？`"
          @confirm="handlerDelete(scope.row.architectures_id)"
        >
          <el-button slot="reference" type="text" size="small">删除</el-button>
        </el-popconfirm>
      </template>
    </super-table>
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
  </div>
</template>

<script>
export default {
  name: 'enterpriseArchitectures',
  data () {
    return {
      dialogFormVisible: false,
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
      column: [
        {
          name: 'architectures_name',
          label: '组织名称'
        },
        {
          name: 'action',
          label: '操作',
          props: {
            width: 120
          }
        }
      ],
      tableData: []
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
  methods: {
    async fetchArchitecturesList (params) {
      const res = await this.$api.enterprise.architectures.list(params)
      this.tableData = res.data
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
</style>
