<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item
        v-for="(item, index) in questions"
        :key="index"
        :title="item.type"
        :name="item.type"
      >
        <el-table
          :data="item.questions"
          style="width: 100%"
        >
          <el-table-column
            prop="date"
            label="题目"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="难易度"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="分值">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'select-questions',
  data () {
    return {
      questions: [
        {
          type: '单选题',
          questions: []
        },
        {
          type: '多选题',
          questions: []
        },
        {
          type: '判断题',
          questions: []
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
