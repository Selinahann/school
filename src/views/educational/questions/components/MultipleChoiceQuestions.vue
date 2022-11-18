<template>
  <div class="single-choice-questions">
    <el-form class="form" ref="form" :model="form" label-position="top">
      <el-form-item label="题目">
        <mavon-editor
          v-model="form.content"
          :boxShadow="false"
          :subfield="false"
          :toolbars="{
            bold: true, // 粗体
            italic: true, // 斜体
            header: true, // 标题
            underline: true, // 下划线
            strikethrough: true, // 中划线
            mark: true, // 标记
            quote: true, // 引用
            ol: true, // 有序列表
            ul: true, // 无序列表
            link: true, // 链接
            code: true, // code
            table: true, // 表格
            /* 1.3.5 */
            trash: true, // 清空
          }"
        />
      </el-form-item>
      <el-form-item label="选项">
        <question-options v-model="optionsAndAnswer" type="checkbox" />
        <!-- <el-rate v-model="form.difficulty"></el-rate> -->
      </el-form-item>
      <el-form-item label="难度">
        <el-rate v-model="form.difficulty"></el-rate>
      </el-form-item>
      <el-form-item label="课程">
        <el-cascader
          v-model="majors"
          :options="outline_options"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="题目解析">
        <el-input v-model="form.explanation"></el-input>
      </el-form-item>
    </el-form>
    <div class="preview">
      <h2>
        <markdown-it-vue class="md-body" :content="form.content" />
        <!-- <MarkdownItVue :content="form.content" /> -->
      </h2>
      <div class="options">
        <el-radio-group v-model="form.answer" disabled>
          <el-radio v-for="(item, index) in form.options" :key="index" :value="item" :label="item.value">{{item}}</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'single-choice-questions',
  props: {
    question_type_id: String
  },
  data () {
    return {
      outline_options: [],
      form: {
        question_type_id: this.question_type_id,
        difficulty: 0,
        content: '',
        outline_id: '',
        majors_id: '',
        subject_id: '',
        options: [],
        answer: [],
        explanation: ''
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
    }
  }
}
</script>

<style lang="scss" scoped>
.single-choice-questions {
  @include wh(100%, 100%);
  @include flex(row);
  min-height: 500px;
  .form {
    width: 50%;
    flex: 1;
    border-right: 1px solid #ccc;
    padding: 20px;
    overflow: auto;
    height: 100%;
  }
  .preview {
    width: 50%;
    flex: 1;
    padding-left: 20px;
  }
}
</style>
