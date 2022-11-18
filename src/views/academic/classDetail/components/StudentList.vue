<template>
  <div>
    <el-button type="primary" @click="createEmployeeVisible = true">添加学员</el-button>
    <el-table
      :data="students"
      style="width: 100%"
    >
      <el-table-column
        prop="user_name"
        label="学生姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="native_place"
        label="籍贯">
      </el-table-column>
      <el-table-column
        prop="native_place"
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">调班</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'StudentList',
  props: {
    students: Array
  }
}
</script>

<style lang="scss" scoped>

</style>
