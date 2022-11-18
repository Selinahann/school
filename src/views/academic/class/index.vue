<template>
  <div>
    <super-table
      title="班级列表"
      :filters="filters"
      :data="tableData"
      :pagination="pagination"
      :column="column"
      @filter="this.fetchClassList"
    >
      <template v-slot:tools>
        <el-button type="primary" @click="dialogFormVisible = true">添加班级</el-button>
      </template>
      <template v-slot:action="scope">
        <el-button type="text" size="small" @click="$router.push('/academic/class/' + scope.row.class_id)">管理</el-button>
        <el-popconfirm
          :title="`确定要删除教室${scope.row.room_num}吗？`"
          @confirm="handlerDelete(scope.row.room_id)"
        >
          <el-button slot="reference" type="text" size="small">删除</el-button>
        </el-popconfirm>
      </template>
    </super-table>
    <el-dialog title="添加班级" :visible.sync="dialogFormVisible">
      <el-form label-position="top" :model="createParams" :rules="rules" ref="createform">
        <el-form-item prop="class_name" label="班级名称">
          <el-input v-model="createParams.class_name"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="room_id"  label="班级教室">
              <el-select v-model="createParams.room_id" placeholder="请选择班级教室">
                <el-option
                  v-for="(item, index) in rooms"
                  :key="index"
                  :label="item.room_num"
                  :value="item.room_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="teacher_id"  label="上课讲师">
              <el-select v-model="createParams.teacher_id" placeholder="请选择上课讲师">
                <el-option
                  v-for="(item, index) in employee"
                  :key="index"
                  :label="item.user_name"
                  :value="item.user_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="majors_id"  label="班级课程">
              <el-cascader
                v-model="createParams.majors_id"
                :options="majors"
                placeholder="请选择班级课程"
              ></el-cascader>
              <!-- <el-select v-model="createParams.majors_id" >
                <el-option
                  v-for="(item, index) in majors"
                  :key="index"
                  :label="item.name"
                  :value="item.majors_id"
                ></el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
        </el-row>
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
      createParams: {
        class_name: '',
        room_id: '',
        teacher_id: '',
        subject_id: '',
        majors_id: ''
      },
      rules: {
        class_name: [
          { required: true, message: '请输入班级名称' }
        ],
        room_id: [
          { required: true, message: '请选择班级教室' }
        ],
        teacher_id: [
          { required: true, message: '请选择授课讲师' }
        ],
        subject_id: [
          { required: true, message: '请选择班级课程' }
        ],
        students: [
          { required: true, message: '请选择班级学生' }
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
          name: 'class_name',
          label: '班级名称',
          props: {
            width: 150
          }
        },
        {
          name: 'room_num',
          label: '教室号',
          props: {
            width: 150
          }
        },
        {
          name: 'majors_name',
          label: '专业',
          props: {
            width: 150
          }
        },
        {
          name: 'subject',
          label: '课程',
          props: {
            width: 150
          }
        },
        {
          name: 'teacher_name',
          label: '讲师',
          props: {
            width: 80
          }
        },
        {
          name: 'teacher_name',
          label: '班主任',
          props: {
            width: 80
          }
        },
        {
          name: 'status',
          label: '状态'
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
      tableData: [],
      majors: [], // 专业列表
      employee: [], // 老师列表
      rooms: []
    }
  },
  watch: {
    dialogFormVisible (value) {
      if (!value) {
        this.createParams = {
          class_name: '',
          room_id: '',
          teacher_id: '',
          subject_id: '',
          majors_id: ''
        }
        this.$refs.createform.resetFields()
      }
    }
  },
  created () {
    this.fetchInitData()
  },
  methods: {
    fetchInitData () {
      const apis = [
        this.$api.educational.outline.list(),
        this.$api.enterprise.employee.list(),
        this.$api.academic.room.list()
      ]
      Promise.all(apis).then(([outline, employee, rooms]) => {
        this.majors = outline.data.map(item => {
          return {
            ...item,
            children: item.children.map(subitem => {
              const { children, ...rest } = subitem
              return rest
            })
          }
        })
        this.employee = employee.data
        this.rooms = rooms.data
      })
    },
    async fetchClassList (params) {
      const res = await this.$api.academic.class.list(params)
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
          const majorsId = this.createParams.majors_id[0]
          const subjectId = this.createParams.majors_id[1]
          this.createParams.majors_id = majorsId
          this.createParams.subject_id = subjectId
          console.log(this.createParams, '答案')
          this.$api.academic.class.create(this.createParams).then(() => {
            this.dialogFormVisible = false
            this.fetchClassList({})
          }).catch(() => {
            // this.dialogFormVisible = false
          })
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
      this.createParams = item
      this.dialogFormVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
