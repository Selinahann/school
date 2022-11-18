<template>
  <div>
    <super-table
      title="教室列表"
      :filters="filters"
      :data="tableData"
      :pagination="pagination"
      :column="column"
      @filter="this.fetchQuestionsList"
    >
      <template v-slot:tools>
        <el-button type="primary" @click="dialogFormVisible = true">添加教室</el-button>
      </template>
      <template v-slot:action="scope">
        <el-button type="text" size="small" @click="handlerEdit(scope.row)">编辑</el-button>
        <el-popconfirm
          :title="`确定要删除教室${scope.row.room_num}吗？`"
          @confirm="handlerDelete(scope.row.room_id)"
        >
          <el-button slot="reference" type="text" size="small">删除</el-button>
        </el-popconfirm>
      </template>
    </super-table>
    <el-dialog title="添加教室" :visible.sync="dialogFormVisible">
      <el-form label-position="top" :model="createRoomParams" :rules="rules" ref="createform">
        <el-form-item prop="room_num" label="教室号">
          <el-input v-model="createRoomParams.room_num"></el-input>
        </el-form-item>
        <el-form-item prop="floor"  label="楼层">
          <el-input v-model="createRoomParams.floor"></el-input>
        </el-form-item>
        <el-form-item prop="type"  label="教室类型">
          <el-select v-model="createRoomParams.type" placeholder="请选择教室类型">
            <el-option label="学生教室" value="1001"></el-option>
            <el-option label="办公室" value="1002"></el-option>
            <el-option label="会议室" value="1003"></el-option>
          </el-select>
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
  name: 'questions',
  data () {
    return {
      dialogFormVisible: false,
      createRoomParams: {
        room_num: '',
        floor: '',
        type: ''
      },
      rules: {
        room_num: [
          { required: true, message: '请输入教室号' }
        ],
        floor: [
          { required: true, message: '请输入楼层' }
        ],
        type: [
          { required: true, message: '请选择教室类型' }
        ]
      },
      filters: {
        type: {
          type: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '已占用', value: 1 },
            { label: '未占用', value: 2 }
          ],
          props: {
            placeholder: '教室类型'
          }
        }
      },
      column: [
        {
          name: 'room_num',
          label: '教室号',
          props: {
            width: 680
          }
        },
        {
          name: 'floor',
          label: '楼层',
          props: {
            width: 80
          }
        },
        {
          name: 'type',
          label: '类型'
        },
        {
          name: 'action',
          label: '操作',
          props: {
            width: 120
          }
        }
      ],
      pagination: {
        page: 1,
        page_size: 10,
        total: 10
      },
      tableData: []
    }
  },
  watch: {
    dialogFormVisible (value) {
      if (!value) {
        this.createRoomParams = {
          room_num: '',
          floor: '',
          type: ''
        }
        this.$refs.createform.resetFields()
      }
    }
  },
  methods: {
    async fetchQuestionsList (params) {
      const res = await this.$api.academic.room.list(params)
      this.tableData = res.data
      // this.pagination = res.pagination
    },
    add_question_command (title) {
      this.create_title = `添加${title}`
      this.create_drawer_visible = true
    },
    onCreateSubmit () {
      this.$refs.createform.validate((valid) => {
        if (valid) {
          if (this.createRoomParams.room_id) {
            console.log('编辑')
            this.dialogFormVisible = false
            this.fetchQuestionsList({})
          } else {
            this.$api.academic.room.create(this.createRoomParams).then(() => {
              this.dialogFormVisible = false
              this.fetchQuestionsList({})
            }).catch(() => {
              // this.dialogFormVisible = false
            })
          }
        }
      })
    },
    handlerDelete (id) {
      this.$api.academic.room.delete(id).then(() => {
        this.$message({
          message: '班级删除成功',
          type: 'success'
        })
        this.fetchQuestionsList({})
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
