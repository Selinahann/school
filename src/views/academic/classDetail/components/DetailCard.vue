<template>
  <div class="detail-card">
    <div class="info-car">
      <h2>班级名称</h2>
      <div class="info-data">
        <el-row>
          <el-col :span="8">
            <div class="info-num">
              <output>29</output>
              <h2>班级人数</h2>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="info-num">
              <output>100%</output>
              <h2>出勤率</h2>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="info-num">
              <output>0%</output>
              <h2>违纪律</h2>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="info">
      <el-descriptions class="margin-top" :column="1">
        <el-descriptions-item label="专业">web前端</el-descriptions-item>
        <el-descriptions-item label="课程">网页设计</el-descriptions-item>
        <el-descriptions-item label="讲师">刘宇</el-descriptions-item>
        <el-descriptions-item label="主任">熊新军</el-descriptions-item>
      </el-descriptions>
      <el-descriptions style="margin-top: 20px" title="班委信息" :column="2">
        <el-descriptions-item label="学委">刘宇</el-descriptions-item>
        <el-descriptions-item label="纪委">重机枪</el-descriptions-item>
        <el-descriptions-item label="生委">六科</el-descriptions-item>
        <el-descriptions-item label="班长">刘睿</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailCard'
}
</script>

<style lang="scss" scoped>
.detail-card {
  background: #fff;
  margin: 20px;
  border-radius: 4px;
  overflow: hidden;
  .info-car {
    padding: 20px;
    background: #007aff;
    color: #fff;
    height: 90px;
    // text-align: center;
    .info-data {
      margin-top: 20px;
      text-align: center;
      output {
        font-size: 18px;
      }
      h2 {
        font-size: 12px;
        margin-top: 10px;
      }
    }
  }
  .info {
    padding: 20px;
  }
}
</style>
