<template>
  <div class="detail-page">
    <detail-card class="detail-card" />
    <div class="content">
      <el-tabs v-model="activeName">
        <el-tab-pane label="班级学生" name="students">
          <StudentList :students="[]" />
        </el-tab-pane>
        <el-tab-pane label="班级课表" name="second">
          2
        </el-tab-pane>
        <el-tab-pane label="成绩单" name="second">
          2
        </el-tab-pane>
        <el-tab-pane label="点名表" name="second">
          2
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import DetailCard from './components/DetailCard.vue'
import StudentList from './components/StudentList.vue'
export default {
  name: 'classDetail',
  data () {
    return {
      activeName: 'students'
    }
  },
  components: {
    DetailCard,
    StudentList
  }
}
</script>

<style lang="scss" scoped>
.detail-page {
  @include flex(row);
  .detail-card {
    width: 300px;
  }
  .content {
    flex: 1;
    background: #fff;
    margin-top: 20px;
    margin-right: 20px;
    min-height: calc(100vh - 130px);
    padding: 20px;
    border-radius: 4px;
    overflow: hidden;
  }
}
</style>
