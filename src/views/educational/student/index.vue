<template>
  <div>
    <super-table
      title="学员管理"
      :filters="filters"
      :data="tableData"
      :pagination="pagination"
      :column="column"
      @filter="this.fetchStudentList"
    >
      <template v-slot:tools>
        <el-button type="primary" @click="dialogFormVisible = true">学员报名</el-button>
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
      <el-form label-position="top" :model="createParams" :rules="rules" ref="createform">
        <el-form-item prop="name" label="学员姓名">
          <el-input v-model="createParams.name"></el-input>
        </el-form-item>
        <el-form-item prop="id_card"  label="身份证号">
          <el-input v-model="createParams.id_card"></el-input>
        </el-form-item>
        <el-form-item prop="phone"  label="手机号">
          <el-input v-model="createParams.phone"></el-input>
        </el-form-item>
        <el-form-item prop="sex"  label="性别">
          <el-radio-group v-model="createParams.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="channel"  label="渠道类型">
          <el-select v-model="createParams.channel" placeholder="请选择学员来源">
            <el-option label="招生团队" value="招生团队"></el-option>
            <el-option label="股东介绍" value="股东介绍"></el-option>
            <el-option label="网络推广" value="网络推广"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="highestEducation"  label="学历">
          <el-select v-model="createParams.highestEducation" placeholder="请选择学历">
            <el-option label="初中" value="初中"></el-option>
            <el-option label="高中" value="高中"></el-option>
            <el-option label="中专" value="中专"></el-option>
            <el-option label="大专" value="大专"></el-option>
            <el-option label="本科" value="本科"></el-option>
            <el-option label="研究生" value="研究生"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="nation"  label="民族">
          <el-input v-model="createParams.nation"></el-input>
        </el-form-item>
        <el-form-item prop="pofession"  label="职业">
          <el-input v-model="createParams.pofession"></el-input>
        </el-form-item>
        <el-form-item prop="nativePlace"  label="籍贯">
          <el-input v-model="createParams.nativePlace"></el-input>
        </el-form-item>
        <el-form-item prop="subject_id"  label="专业">
          <el-cascader
            v-model="createParams.subject_id"
            :options="majors"
          ></el-cascader>
        </el-form-item>
        <el-form-item prop="enrollment_teacher_id"  label="招生老师">
          <el-select v-model="createParams.enrollment_teacher_id">
            <el-option
              v-for="item in employee"
              :key="item.user_id"
              :label="item.user_name"
              :value="item.user_id"
            ></el-option>
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
  name: 'educational_student',
  data () {
    return {
      dialogFormVisible: false,
      createParams: {
        name: '', // 学员姓名
        id_card: '', // 学员身份证号
        phone: '', // 手机号
        sex: '', // 性别
        channel: '', // 渠道
        highestEducation: '', // 学历
        nation: '', // 民族
        pofession: '', // 职业
        nativePlace: '', // 籍贯
        majors_id: '', // 专业ID
        subject_id: '', // 课程ID
        enrollment_teacher_id: '' // 招生老师ID
      },
      rules: {
        // room_num: [
        //   { required: true, message: '请输入教室号' }
        // ],
        // floor: [
        //   { required: true, message: '请输入楼层' }
        // ],
        // type: [
        //   { required: true, message: '请选择教室类型' }
        // ]
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
          label: '姓名'
        },
        {
          name: 'id_card',
          label: '身份证号'
        },
        {
          name: 'phone',
          label: '手机号'
        },
        {
          name: 'sex',
          label: '性别'
        },
        {
          name: 'status',
          label: '状态'
        },
        {
          name: 'highestEducation',
          label: '学历'
        },
        {
          name: 'nativePlace',
          label: '籍贯'
        },
        {
          name: 'subject',
          label: '课程'
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
      majors: [],
      employee: []
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
  created () {
    console.log(1231231)
    this.initData()
  },
  methods: {
    async initData (params) {
      const apis = [
        this.$api.educational.outline.list(),
        this.$api.enterprise.employee.list()
      ]
      Promise.all(apis).then(([outline, employee]) => {
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
      })
    },
    async fetchStudentList (params) {
      const res = await this.$api.educational.student.list(params)
      console.log(res.data, 1231)
      this.tableData = res.data
      this.pagination = res.pagination
    },
    add_question_command (title) {
      this.create_title = `添加${title}`
      this.create_drawer_visible = true
    },
    onCreateSubmit () {
      this.$refs.createform.validate((valid) => {
        if (valid) {
          this.$api.educational.student.create({
            ...this.createParams,
            majors_id: this.createParams.subject_id[0],
            subject_id: this.createParams.subject_id[1]
          }).then(() => {
            this.dialogFormVisible = false
            this.fetchStudentList({})
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
      this.createRoomParams = item
      this.dialogFormVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
