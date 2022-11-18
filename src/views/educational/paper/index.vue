<template>
  <div>
    <super-table
      title="试卷列表"
      :filters="filters"
      :data="tableData"
      :pagination="pagination"
      :column="column"
      @filter="fetchPaperList"
    >
      <template v-slot:tools>
        <el-button
          type="primary"
          @click="$router.push('/educational/paper/create')"
        ><i class="el-icon-arrow-down el-icon-plus"></i>创建试卷</el-button>
      </template>
      <template v-slot:difficulty="scope">
        <el-rate
          v-model="scope.row.difficulty"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}">
        </el-rate>
      </template>
      <template v-slot:action="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">预览</el-button>
        <el-button type="text" size="small">编辑</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </super-table>

    <el-drawer
      :title="create_title"
      :visible.sync="create_drawer_visible"
      :show-close="false"
      size="90%"
      ref="drawer"
      direction="btt"
      class="drawer"
    >
      <template  v-slot:title>
        <header class="drawer-header">
          <h2>{{create_title}}</h2>
          <div class="btn-group">
            <el-button type="info" @click="$refs.drawer.closeDrawer()">取消</el-button>
            <el-button type="primary" @click="handlerCreate">保存</el-button>
          </div>
        </header>
      </template>
    </el-drawer>
  </div>
</template>

<script>

export default {
  name: 'educational-paper',
  data () {
    return {
      question_type_id: '',
      filters: {
        question_type_id: {
          type: 'select',
          options: [],
          props: {
            placeholder: '题型'
          }
        },
        difficulty: {
          type: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '简单', value: 1 },
            { label: '中等', value: 2 },
            { label: '困难', value: 3 }
          ],
          props: {
            placeholder: '难度'
          }
        },
        outline_id: {
          type: 'cascader',
          options: [],
          props: {
            placeholder: '课程'
          }
        }
      },
      column: [
        {
          name: 'title',
          label: '试卷名称',
          props: {
            width: 280
          }
        },
        {
          name: 'questions',
          label: '总题数',
          props: {
            width: 80
          }
        },
        {
          name: 'students',
          label: '考试班级'
        },
        {
          name: 'start_time',
          label: '考试时间',
          props: {
            width: 180
          }
        },
        {
          name: 'students',
          label: '考试人数'
        },
        {
          name: 'action',
          label: '操作',
          props: {
            width: 180
          }
        }
      ],
      create_drawer_visible: false,
      create_title: '',
      pagination: {
        page: 1,
        page_size: 10,
        total: 0
      },
      tableData: [],
      questionTypes: [],
      majors: []
    }
  },
  created () {
    this.fetchInitData()
  },
  methods: {
    async fetchInitData () {
      const apis = [
        this.$api.educational.question.type(),
        this.$api.educational.question.majors(),
        this.$api.educational.outline.list()
      ]
      Promise.all(apis).then((res) => {
        console.log(res)
        this.filters.question_type_id.options = res[0].data.map((item) => {
          return {
            label: item.question_type_text,
            value: item.question_type_id
          }
        })
        this.filters.outline_id.options = res[2].data
        this.questionTypes = res[0].data
        this.majors = res[1].data
      })
    },
    async fetchPaperList (params) {
      const res = await this.$api.educational.paper.list(params)
      this.tableData = res.data
      this.pagination = res.pagination
    },
    add_question_command (item) {
      this.question_type_id = item.id
      this.create_title = `添加${item.text}`
      this.create_drawer_visible = true
    },
    handlerCreate () {
      this.$refs.createForm.onSubmit().then(() => {
        this.$refs.drawer.closeDrawer()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  margin-bottom: 20px;
  .header-bar {
    @include flex(row, center, space-between);
    // height: 100px;
    // justify-content: space-between;
    margin-bottom: 20px;

  }
  .title {
    font-size: 18px;
    font-weight: bold;
  }
  ::v-deep .el-form {
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
.drawer-header {
  @include wh(100%, 60px);
  @include flex(row, center, space-between);
  border-bottom: 1px solid #ccc;
  padding: 0 20px;
}
.drawer {
  ::v-deep .el-drawer__header {
    padding: 0;
    margin: 0;
  }
}
</style>
