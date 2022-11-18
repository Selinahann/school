<template>
  <div>
    <header class="page-header">
      <div class="header-bar">
        <h2 class="title">题库列表</h2>
        <div class="tool-group">
          <el-dropdown @command="add_question_command">
            <el-button>添加题目<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, index) in questionTypes"
                :key="index"
                :command="item.question_type_text"
              >{{item.question_type_text}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button>批量导入</el-button>
          <el-button>批量导出</el-button>
        </div>
      </div>
      <el-card>
        <el-form :inline="true" :model="filter_params" class="demo-form-inline">
          <el-form-item >
            <el-select v-model="filter_params.question_type_id" placeholder="题型">
              <el-option
                key="-1"
                label="全部"
                value=""
              >
              </el-option>
              <el-option
                v-for="(item, index) in questionTypes"
                :key="index"
                :label="item.question_type_text"
                :value="item.question_type_id"
              >
              </el-option>
            </el-select>
            <el-select v-model="filter_params.difficulty" placeholder="难度">
              <el-option label="全部" value="" />
              <el-option label="简单" value="1" />
              <el-option label="普通" value="2" />
              <el-option label="困难" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </header>
    <div class="table-list">
      <el-card>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="content"
            label="题目"
            width="680">
          </el-table-column>
          <el-table-column
            prop="question_type_text"
            label="题型"
            width="80">
          </el-table-column>
          <el-table-column
            prop="difficulty"
            label="难易度">
            <template slot-scope="scope">
              <el-rate
                v-model="scope.row.difficulty"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </template>
          </el-table-column>
          <el-table-column
            prop="numUsed"
            label="出题次数"
            width="80"
          >
            <template slot-scope="scope">
              {{scope.row.numUsed * 1}}
            </template>
          </el-table-column>
          <el-table-column
            prop="difficulty"
            label="创建时间">
          </el-table-column>
          <el-table-column
            label="操作"
            width="120"
          >
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">统计</el-button>
              <el-button type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pagination.total"
          :page-size="pagination.page_size * 1"
          :current-page="pagination.page * 1"
          @current-change="pageChange"
        >
        </el-pagination>
      </el-card>
    </div>
    <el-drawer
      :title="create_title"
      :visible.sync="create_drawer_visible"
      direction="btt"
    >
      <create-drawer />
    </el-drawer>

    <super-table
      title="题库列表"
      :filters="filters"
      :data="tableData"
      :pagination="pagination"
      :column="column"
    >
      <template v-slot:tools>
        工具栏
      </template>
    </super-table>
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
      filters: {
        question_type_id: {
          type: 'select',
          options: []
        },
        difficulty: {
          type: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '简单', value: 1 },
            { label: '中等', value: 2 },
            { label: '困难', value: 3 }
          ]
        }
      },
      column: [
        {
          name: 'content',
          label: '题目',
          width: 680
        },
        {
          name: 'question_type_text',
          label: '题型',
          width: 680
        },
        {
          name: 'difficulty',
          label: '难易度',
          width: 680
        },
        {
          name: 'numUsed',
          label: '出题次数',
          width: 680
        },
        {
          name: 'content',
          label: '题目',
          width: 680
        },
        {
          name: 'create_time',
          label: '创建时间'
        },
        {
          name: 'action',
          label: '操作'
        }
      ],
      create_drawer_visible: false,
      create_title: '',
      filter_params: {
        question_type_id: '',
        difficulty: '',
        page: 1,
        page_size: 10
      },
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
    this.fetchQuestionsList()
  },
  methods: {
    async fetchInitData () {
      const apis = [
        this.$api.educational.question.type(),
        this.$api.educational.question.majors()
      ]
      Promise.all(apis).then((res) => {
        console.log(res)
        this.filters.question_type_id = res[0].data
        this.questionTypes = res[0].data
        this.majors = res[1].data
      })
    },
    async fetchQuestionsList () {
      const res = await this.$api.educational.question.list(this.filter_params)
      this.tableData = res.data
      this.pagination = res.pagination
    },
    onSubmit () {
      this.filter_params.page = 1
      this.fetchQuestionsList()
    },
    pageChange (page) {
      this.filter_params.page = page
      this.fetchQuestionsList()
    },
    add_question_command (title) {
      this.create_title = `添加${title}`
      this.create_drawer_visible = true
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
  /deep/ .el-form {
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
