<template>
  <div>
    <el-tree
      :data="subject"
      node-key="key"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <template v-if="node.level === 1">
          <span><el-input placeholder="请输入课程名称" v-model="data.subject_title" size="mini"></el-input></span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="() => handlerAddOutline(data)">
              添加
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => handlerDeleteSubject(node, data)">
              删除
            </el-button>
          </span>
        </template>
        <template v-else>
          <span><el-input placeholder="请输入单元课题名称" v-model="data.outline_title" size="mini"></el-input></span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="() => handlerDeleteSubject(node, data)">
              删除
            </el-button>
          </span>
        </template>
      </span>
    </el-tree>
    <a href="javascript:;" @click="handlerAddSubject">添加课程</a>
  </div>
</template>

<script>
export default {
  name: 'SubjectEdit',
  props: {
    value: Array
  },
  data () {
    return {
      subject: [
        {
          key: +new Date(),
          subject_title: '',
          children: []
        }
      ]
    }
  },
  watch: {
    value (newvalue) {
      this.subject = newvalue
    },
    subject: {
      handler (newvalue) {
        this.$emit('input', newvalue)
      },
      deep: true
    }
  },
  methods: {
    handlerAddSubject () {
      this.subject.push(
        {
          key: +new Date(),
          subject_title: '',
          children: []
        }
      )
    },
    handlerDeleteSubject (node, data) {
      if (node.level === 1) {
        const index = this.subject.reduce((prev, item, index) => {
          if (item.key === data.key) return index
          return prev
        }, 0)
        this.$delete(this.subject, index)
      } else {
        const children = node.parent.data.children
        const index = children.reduce((prev, item, index) => {
          if (item.key === data.key) return index
          return prev
        }, 0)
        children.splice(index, 1)
      }
    },
    handlerAddOutline (item) {
      console.log(item)
      item.children.push({
        outline_title: '',
        key: +new Date()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tree {
  ::v-deep .el-tree-node__content {
    width: 100%;
    display: flex;
    height: auto;
    .custom-tree-node {
      flex: 1;
      display: flex;
      span:first-child {
        flex: 1;
        margin-right: 10px;
      }
      span:last-child {
        flex-shrink: 0;
        width: 100px;
        display: flex;
        button {
          flex: 1;
          width: 50%;
          text-align: center;
        }
        // margin-right: 10px;
      }
    }
  }

    .el-tree-node__children {
      .custom-tree-node {
        span:last-child {
          margin-right: 20px;
        }
      }
    }
}
</style>
