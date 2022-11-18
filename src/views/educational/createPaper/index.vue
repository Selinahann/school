<template>
  <div class="create-paper-page">
    <header class="header-bar">
      <h2 class="title">创建试卷</h2>
      <el-steps :active="step_index" simple>
        <el-step title="基本信息" icon="el-icon-edit"></el-step>
        <el-step title="选择题目" icon="el-icon-upload"></el-step>
        <el-step title="步骤 3" icon="el-icon-picture"></el-step>
      </el-steps>
    </header>
    <el-form class="form" ref="form" :model="form" label-position="top">
      <div v-if="step_index === 1">
        <el-form-item label="考试名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="考试时间">
              <el-date-picker
                v-model="form.start_time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="课程">
              <el-cascader
                v-model="form.outline_id"
                :options="outline_options"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="班级">
              <el-select v-model="form.class_id" placeholder="请选择">
                <el-option
                  v-for="item in classList"
                  :key="item.class_id"
                  :label="item.class_name"
                  :value="item.class_id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="考试类型">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option label="日考" value="日考"></el-option>
                <el-option label="周考" value="周考"></el-option>
                <el-option label="月考" value="月考"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="step_index = 2">下一步</el-button>
        </el-form-item>
      </div>
      <div v-else>
        <template v-if="form.questions.length < 1">
          <div class="btn-group">
            <el-row :gutter="20">
              <el-col :span="12">
                <a href="javascript:;" @click="intellect">智能生成</a>
              </el-col>
              <el-col :span="12">
                <a href="javascript:;">手动选题</a>
              </el-col>
            </el-row>
          </div>
        </template>
        <template v-else>
          <h2>{{form.title}}</h2>
          <div class="question-list">
            <div v-for="(item, index) in form.questions" :key="index">
              <h3>{{item.name}}</h3>
            </div>
          </div>
        </template>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'create-page',
  props: {
    question_type_id: String
  },
  data () {
    return {
      step_index: 1,
      outline_options: [],
      classList: [],
      form: {
        title: '',
        type: '',
        questions: [],
        class_id: '',
        start_time: '',
        end_time: '',
        outline_id: '',
        majors_id: '',
        subject_id: ''
      }
    }
  },
  computed: {
    majors: {
      get () {
        return [
          this.form.majors_id,
          this.form.subject_id,
          this.form.outline_id
        ]
      },
      set (value) {
        console.log(value)
        this.form.majors_id = value[0]
        this.form.subject_id = value[1]
        this.form.outline_id = value[2]
      }
    },
    optionsAndAnswer: {
      get () {
        return this.form.options.map((item, index) => {
          return {
            value: item,
            isAnswer: this.form.answer.indexOf(index) !== -1
          }
        })
      },
      set (value) {
        console.log(value)
        const answer = []
        this.form.options = value.map((item, index) => {
          if (item.isAnswer) {
            answer.push(index)
          }
          return item.value
        })
        this.form.answer = answer
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.$api.educational.outline.list().then((res) => {
        this.outline_options = res.data
      })
      this.$api.academic.class.list().then((res) => {
        this.classList = res.data
      })
    },
    async fetchClassList (params) {
      const res = await this.$api.academic.class.list(params)
      this.tableData = res.data
      // this.pagination = res.pagination
    },
    onSubmit () {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            console.log(this.form)
            this.$api.educational.question.create(this.form).then(() => {
              resolve()
            }).catch(() => {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject()
            })
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject()
          }
        })
      })
    },
    intellect () {
      this.$api.educational.question.random({
        outline_id: this.form.outline_id[2]
      }).then((res) => {
        this.form.questions = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.create-paper-page {
  width: 100%;
  background: #fff;
  min-height: calc(100vh - 60px);
  .header-bar {
    margin-bottom: 20px;
    padding: 0 20px;
    padding-top: 20px;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .form {
    width: 50%;
    margin: 0 auto;
    .el-cascader, .el-date-editor, .el-input, .el-select{
      width: 100%;
    }
  }
  .btn-group {
    a {
      background: #fbfbff;
      height: 150px;
      display: block;
      text-align: center;
      color: #007aff;
      line-height: 150px;
      border-radius: 5px;
    }
  }
}
</style>
