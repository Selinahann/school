<template>
  <div class="authority">
    <!-- {{views}} -->
    {{checkedViews}}
    <el-row v-for="(route, index) in views" :key="index">
      <el-col :span="3">
        <template v-if="route.children">
          <el-checkbox
            :indeterminate="route.indeterminate"
            v-model="route.checkAll"
            @change="(value) => handleCheckAllChange(route, value)"
          >{{route.meta.title}}</el-checkbox>
        </template>
        <template v-else>
          <el-checkbox
            :label="route.name"
            v-model="checkedViews"
          >{{route.meta.title}}</el-checkbox>
        </template>
      </el-col>
      <el-col :span="21">
        <el-checkbox-group v-model="checkedViews">
          <template v-for="(subitem, subindex) in route.children">
            <el-checkbox :key="subindex" :label="subitem.name">{{subitem.meta.title}}</el-checkbox>
          </template>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <el-button @click="onSubmit">确定设置</el-button>
  </div>
</template>

<script>
import { menu } from '@/router'

export default {
  name: 'authority',
  props: {
    viewsData: Array,
    architectures_id: String
  },
  data () {
    return {
      views: [],
      checkedViews: []
    }
  },
  watch: {
    viewsData () {
      this.initViewsData()
    }
  },
  created () {
    this.initViewsData()
  },
  methods: {
    initViewsData () {
      const viewsId = this.viewsData.map(item => item.view_id)
      this.checkedViews = viewsId
      this.views = menu.map((item) => {
        if (item.children) {
          const isCheckall = item.children.reduce((prev, item) => {
            if (viewsId.includes(item.name)) {
              item.checked = true
            } else {
              item.checked = false
              return false
            }
            return prev
          }, true)
          console.log(isCheckall)
          return {
            ...item,
            checkAll: isCheckall,
            indeterminate: !isCheckall
          }
        } else {
          return {
            ...item,
            checkAll: viewsId.includes(item.name),
            indeterminate: !viewsId.includes(item.name)
          }
        }
      })
      console.log(this.views)
    },
    handleCheckAllChange (item, val) {
      console.log(item)
      item.indeterminate = false
      if (item.children) {
        item.children.forEach(subitem => {
          if (val) {
            if (!this.checkedViews.includes(subitem.name)) {
              this.checkedViews.push(subitem.name)
            }
          } else {
            const index = this.checkedViews.indexOf(subitem.name)
            if (index !== -1) {
              this.checkedViews.splice(index, 1)
            }
          }
          subitem.checked = val
        })
      }
    },
    onSubmit () {
      this.$api.enterprise.architectures.setview({
        architectures_id: this.architectures_id,
        view_authority: this.checkedViews
      }).then(() => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.authority {
  border: 1px solid #eee;
  ::v-deep .el-row {
    border-bottom: 1px solid #eee;
    .el-col {
      padding: 20px;
    }
    .el-col:first-child {
      border-right: 1px solid #eee;
    }
  }
}
</style>
