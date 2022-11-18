<template>
  <div class="super-table">
    <header class="page-header">
      <div class="header-bar">
        <h2 class="title">{{title}}</h2>
        <div class="tool-group">
          <slot name="tools"></slot>
        </div>
      </div>
      <el-card v-if="filters">
        <el-form :inline="true" :model="filter_params" class="demo-form-inline">
          <el-form-item v-for="(item, key, index) in filters" :key="index">
            <template v-if="item.type === 'input'">
              <el-input v-model="filter_params[key]" />
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select v-model="filter_params[key]" v-bind="item.props">
                <el-option
                  v-for="(item, index) in item.options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
            <template v-else-if="item.type === 'cascader'">
              <el-cascader v-bind="item.props" v-model="filter_params[key]" :options="item.options"></el-cascader>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </header>
    <div class="table-list">
      <el-card>
        <el-table v-bind="$attrs" height="100%" size="mini">
          <el-table-column
            v-for="(item, index) in column"
            v-bind="item.props"
            :key="index"
            :prop="item.name"
            :label="item.label"
          >
            <template slot-scope="scope">
              <slot :name="item.name" v-bind:row="scope.row">
                {{scope.row[item.name]}}
              </slot>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          v-bind="pagination"
          @current-change="pageChange"
        >
        </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'super-table',
  data () {
    return {
      filter_params: {}
    }
  },
  props: {
    title: String,
    filters: Object,
    pagination: {
      type: Object,
      default: () => ({
        page: 1,
        page_size: 10
      })
    },
    column: Array
  },
  computed: {
    outherProps () {
      return this.$attrs
    }
  },
  created () {
    this.init_filter_params()
    this.onSubmit()
    console.log(this.$attrs)
    // this.fetchQuestionsList({
    //   page: 1,
    //   page_size: this.pagination.page_size
    // })
  },
  methods: {
    init_filter_params () {
      for (var key in this.filters) {
        this.$set(this.filter_params, key, this.filters[key].value)
        // this.filter_params[key] = this.filters[key].value
      }
    },
    onSubmit () {
      this.$emit('filter', {
        page: 1,
        page_size: this.pagination.page_size,
        ...this.filter_params
      })
    },
    pageChange (page) {
      this.$emit('filter', {
        page: page,
        page_size: this.pagination.page_size,
        ...this.filter_params
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.super-table {
  @include wh(auto, calc(100vh - 56px));
  @include flex(column);
  overflow: hidden;
  .table-list {
    flex: 1;
    height: 50%;
    .el-card {
      height: 100%;
    }
    ::v-deep .el-card__body{
      @include flex(column);
      height: 100%;
      padding: 0;
      .el-table {
        flex: 1;
        overflow: hidden;
        .el-table__header-wrapper {
          th:first-child {
            padding-left: 10px;
          }
          th:last-child {
            padding-right: 10px;
          }
        }
        td:first-child {
          padding-left: 10px;
        }
        td:last-child {
          padding-right: 10px;
        }
      }
      .el-pagination  {
        padding: 20px 0;
        border-top: 0;
        text-align: center;
        flex-shrink: 0;
      }
    }
  }
}
.page-header {
  margin-bottom: 20px;
  flex-shrink: 0;
  .header-bar {
    @include flex(row, center, space-between);
    // height: 100px;
    // justify-content: space-between;
    margin-bottom: 20px;
    padding: 0 20px;
    padding-top: 20px;
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
</style>
