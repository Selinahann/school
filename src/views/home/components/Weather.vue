<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>
        {{date}}
        <el-button type="text"><i class="el-icon-location-outline"></i>龙陵柑橘基地</el-button>
      </span>
      <el-button style="float: right;" type="primary">查看天气</el-button>
    </div>
    <div class="content">
      <el-row>
        <el-col :span="6">
          <div class="temp">
            <b>{{weatherData.temp}}</b>
            <sup>&degC</sup>
          </div>
          <p class="conditionstext">{{weatherData.conditionstext}}</p>
          <img class="oss" :src="weatherData.ossPath" />
        </el-col>
        <el-col :span="18" class="info-data">
          <el-col :span="8">
            <h2>湿度</h2>
            <output>{{weatherData.rain}}</output>
          </el-col>
          <el-col :span="8">
            <h2>降雨</h2>
            <output>{{weatherData.rain}}</output>
          </el-col>
          <el-col :span="8">
            <h2>积温</h2>
            <output>{{weatherData.rain}}</output>
          </el-col>
          <el-col :span="8">
            <h2>积雨</h2>
            <output>{{weatherData.rain}}</output>
          </el-col>
          <el-col :span="8">
            <h2>风向</h2>
            <output>{{weatherData.rain}}</output>
          </el-col>
          <el-col :span="8">
            <h2>风速</h2>
            <output>{{weatherData.rain}}</output>
          </el-col>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import moment from 'moment'
export default {
  name: 'weather',
  data () {
    return {
      date: moment(new Date()).format('YYYY年MM月DD日星期E'),
      weatherData: {}
    }
  },
  created () {
    this.fetchWeatherData()
  },
  methods: {
    async fetchWeatherData () {
      const res = await this.$api.home.weather({
        ProvCityAreaId: 101190101
      })
      this.weatherData = res.data.weather.weatherNowVo
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  .temp {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-size: 50px;
    sup {
      font-size: 24px;
    }
  }
  .oss {
    @include wh(100%, auto);
  }
  .conditionstext {
    text-align: center;
    font-size: 12px;
    line-height: 50px;
  }
  .info-data {
    height: 268px;
    .el-col {
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      output {
        font-size: 30px;
        line-height: 50px;
      }
      h2 {
        color: #586771;
      }
    }
  }
}
</style>
