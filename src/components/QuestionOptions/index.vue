<template>
  <div class="options">
    <div
      v-for="(item, index) in val"
      :key="index"
      class="options-item"
    >
      <el-input v-model="item.value" placeholder="请输入选项内容" size="mini" />
      <div class="tools">
        <template v-if="!item.isAnswer">
          <el-button type="text" @click="handlerSetAnswer(index)">设为正确答案</el-button>
        </template>
        <template v-else>
          <div>
            <el-tag>正确答案</el-tag>
            <el-button type="text" @click="handlerSetAnswer(index)">取消</el-button>
          </div>
        </template>
        <el-link icon="el-icon-delete" :disabled="disabledDeleteBtn" @click="handlerDeleteOptions(index)"></el-link>
      </div>
    </div>
    <el-button
      class="add-options-btn"
      type="primary"
      icon="el-icon-plus"
      @click="handlerAddOptions"
      v-if="!noAdd"
    >添加选项</el-button>
  </div>
</template>

<script>
export default {
  name: 'question-options',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    nums: {
      type: Number,
      default: 4
    },
    type: {
      type: String,
      default: 'radio'
    },
    noAdd: Boolean
  },
  data () {
    return {
      val: this.value
    }
  },
  watch: {
    val: {
      handler (newval) {
        console.log(newval)
        this.$emit('input', newval)
      },
      deep: true
    }
  },
  computed: {
    disabledDeleteBtn () {
      return this.val.length <= 2
    }
  },
  created () {
    this.initOptions()
  },
  methods: {
    initOptions () {
      for (let i = 0; i < this.nums; i++) {
        var item = this.val[i]
        if (!item) {
          this.$set(this.val, i, {
            value: '',
            isAnswer: false
          })
        }
      }
    },
    handlerAddOptions () {
      this.val.push({
        value: '',
        isAnswer: false
      })
    },
    handlerDeleteOptions (index) {
      this.$delete(this.val, index)
    },
    handlerSetAnswer (index) {
      if (this.type === 'radio') {
        console.log(index)
        this.val.forEach((item, i) => {
          if (i === index * 1) {
            item.isAnswer = !item.isAnswer
          } else {
            item.isAnswer = false
          }
        })
      } else {
        this.val[index].isAnswer = !this.val[index].isAnswer
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.options {
  .options-item {
    .tools {
      @include flex(row, center, space-between);
      ::v-deep button {
        font-size: 12px;
      }
    }
  }
  .add-options-btn {
    @include wh(100%, 40px);
    line-height: 40px;
    border: 1px dashed #007aff;
    padding: 0;
    background: transparent;
    color: #007aff;
  }
}
</style>
