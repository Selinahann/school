<template>
  <div>
    <super-table
      title="专业管理"
      :data="tableData"
      :pagination="pagination"
      :column="column"
      @filter="this.fetchMajorsList"
    >
      <template v-slot:tools>
        <el-button type="primary" @click="dialogFormVisible = true">添加专业</el-button>
      </template>
      <template v-slot:action="scope">
        <el-button type="text" size="small" @click="$router.push('/educational/majors/' + scope.row.majors_id)">详情</el-button>
        <el-popconfirm
          :title="`确定要删除专业${scope.row.majors_id}吗？`"
          @confirm="handlerDelete(scope.row.majors_id)"
        >
          <el-button slot="reference" type="text" size="small">删除</el-button>
        </el-popconfirm>
      </template>
    </super-table>
    <el-dialog title="添加专业" :visible.sync="dialogFormVisible">
      <el-form label-position="top" :model="createMajorsParams" :rules="rules" ref="createform">
        <el-form-item prop="room_num" label="专业名称">
          <el-input v-model="createMajorsParams.name"></el-input>
        </el-form-item>
        <el-form-item prop="remark"  label="专业介绍">
          <el-input v-model="createMajorsParams.remark"></el-input>
        </el-form-item>
        <el-form-item prop="duration"  label="学习时长">
          <el-input v-model="createMajorsParams.duration">
            <el-select v-model="createMajorsParams.unit" slot="append" style="width:60px;" placeholder="单位">
              <el-option label="年" value="年"></el-option>
              <el-option label="月" value="月"></el-option>
              <el-option label="天" value="天"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item prop="type"  label="设置价格">
          <el-input-number v-model="createMajorsParams.price">
          </el-input-number>
        </el-form-item>
        <el-form-item prop="subject"  label="课程设置">
          <subject-edit v-model="createMajorsParams.subject" />
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
  name: 'EducationalMajors',
  data () {
    return {
      dialogFormVisible: false,
      createMajorsParams: {
        name: '',
        price: '',
        remark: '',
        duration: '',
        unit: '月',
        subject: []
      },
      rules: {
        name: [
          { required: true, message: '请输入专业名称' }
        ],
        price: [
          { required: true, message: '请输入专业费用' }
        ],
        remark: [
          { required: true, message: '请输入专业介绍' }
        ],
        duration: [
          { required: true, message: '请输入专业学习时长' }
        ],
        unit: [
          { required: true, message: '请选择时长单位' }
        ],
        subject: [
          { required: true, message: '请输入专业课程' }
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
          name: 'name',
          label: '专业名称',
          props: {
            width: 160
          }
        },
        {
          name: 'remark',
          label: '课程简介',
          props: {
            width: 680
          }
        },
        {
          name: 'duration',
          label: '时间'
        },
        {
          name: 'price',
          label: '费用'
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
          name: '',
          price: '',
          remark: '',
          duration: '',
          unit: '月',
          subject: []
        }
        this.$refs.createform.resetFields()
      }
    }
  },
  methods: {
    async fetchMajorsList (params) {
      const res = await this.$api.educational.majors.list(params)
      this.tableData = res.data
      // this.pagination = res.pagination
    },
    add_question_command (title) {
      this.create_title = `添加${title}`
      this.create_drawer_visible = true
    },
    onCreateSubmit () {
      console.log(this.createMajorsParams)
      this.$api.educational.majors.create(this.createMajorsParams).then(() => {
        this.dialogFormVisible = false
        this.fetchMajorsList({})
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
      this.$api.educational.majors.delete(id).then(() => {
        this.$message({
          message: '课程删除成功',
          type: 'success'
        })
        this.fetchMajorsList({})
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
