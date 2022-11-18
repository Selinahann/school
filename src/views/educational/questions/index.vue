<template>
  <div>
    <super-table
      title="题库列表"
      :filters="filters"
      :data="tableData"
      :pagination="pagination"
      :column="column"
      @filter="this.fetchQuestionsList"
    >
      <template v-slot:tools>
        <el-dropdown @command="add_question_command" :style="{marginRight: '20px'}">
          <el-button type="primary">添加题目<i class="el-icon-arrow-down el-icon--right"></i></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) in questionTypes"
              :key="index"
              :command="{id: item.question_type_id, text: item.question_type_text}"
            >{{item.question_type_text}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button>批量导入</el-button>
        <el-button>批量导出</el-button>
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
        <el-button @click="handleClick(scope.row)" type="text" size="small">统计</el-button>
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
      <create-drawer ref="createForm" :question_type_id="question_type_id" />
    </el-drawer>
  </div>
</template>

<script>
import CreateDrawer from './components/CreateDrawer.vue'

export default {
  name: 'questions',
  components: {
    CreateDrawer
  },
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
          name: 'content',
          label: '题目',
          props: {
            width: 680
          }
        },
        {
          name: 'question_type_text',
          label: '题型',
          props: {
            width: 80
          }
        },
        {
          name: 'difficulty',
          label: '难易度',
          props: {
            width: 180
          }
        },
        {
          name: 'numUsed',
          label: '出题次数',
          width: 680
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
    async fetchQuestionsList (params) {
      const res = await this.$api.educational.question.list({
        ...params,
        outline_id: params.outline_id ? params.outline_id[2] : ''
      })
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
