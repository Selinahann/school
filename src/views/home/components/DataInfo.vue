<template>
  <el-card class="data-info" header="">
    <div slot="header" class="clearfix">
      <span>
        数据总览
      </span>
      <el-radio-group style="float: right;" v-model="type">
        <el-radio-button label="month">本月</el-radio-button>
        <el-radio-button label="season">本季</el-radio-button>
        <el-radio-button label="year">本年</el-radio-button>
      </el-radio-group>
    </div>
    <div class="content">
      <div
        v-for="(item, index) in viewData"
        :key="index"
        class="info-car"
      >
        <h2>{{item.name}}</h2>
        <output>{{item.value}}<b>{{item.unit}}</b></output>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'data-info',
  data () {
    return {
      type: 'month',
      overview: {}
    }
  },
  computed: {
    viewData () {
      return this.overview[this.type] || []
    }
  },
  created () {
    this.fetchDataOverview()
  },
  methods: {
    fetchDataOverview () {
      this.$api.home.dataOverview().then((res) => {
        console.log(res)
        this.overview = {
          month: res.month,
          season: res.season,
          year: res.year
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.data-info {
  margin-top: 20px;
  .content {
    .info-car {
      width: 20%;
      float: left;
      text-align: center;
      padding: 20px 0;
    }
  }
}
</style>
