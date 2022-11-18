<template>
  <el-card class="ring-chart" header="">
    <div slot="header" class="clearfix">
      <span>
        支出类型统计
      </span>
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="float: right;"
      >
      </el-date-picker>
    </div>
    <div class="content">
      <div id="chart" ref="chartbox"></div>
    </div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'ring-chart',
  data () {
    return {
      date: ''
    }
  },
  mounted () {
    this.fetchFarmPayStaticsData()
  },
  methods: {
    async fetchFarmPayStaticsData () {
      const res = await this.$api.home.farmPayStatics()
      console.log(res, '图表')
      const chartData = [
        {
          name: '人工',
          value: res.data[0].RL
        },
        {
          name: '肥料',
          value: res.data[0].FL
        },
        {
          name: '农药',
          value: res.data[0].NY
        },
        {
          name: '机械',
          value: res.data[0].JX
        },
        {
          name: '物料',
          value: res.data[0].WL
        },
        {
          name: '其他',
          value: res.data[0].QT
        }
      ]
      this.initChart(chartData)
    },
    initChart (chartData) {
      const color = ['#006973', '#007985', '#018490', '#19a9b6', '#7ad8e3', '#97eaf4']
      const formatNumber = function (num) {
        // const reg = /(?=(\B)(\d{3})+$)/g
        // return num.toString().replace(reg, ',')
        return num / 10000 + '万元 20%'
      }
      var myChart = echarts.init(this.$refs.chartbox)
      // 绘制图表
      myChart.setOption(
        {
          color: color,
          legend: {
            align: 'right',
            bottom: 10,
            textStyle: {
              color: '#fff'
            },
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 35
          },
          series: [
            {
              type: 'pie',
              radius: ['35%', '60%'],
              center: ['50%', '50%'],
              data: chartData,
              hoverAnimation: false,
              labelLine: {
                normal: {
                  length: 20,
                  length2: 120,
                  lineStyle: {
                    color: '#606266'
                  }
                }
              },
              label: {
                normal: {
                  formatter: (params) => {
                    return (
                      '{name|' + params.name + '}{value|' + formatNumber(params.value) + '}'
                    )
                  },
                  padding: [0, -100, 25, -100],
                  rich: {
                    icon: {
                      fontSize: 16
                    },
                    name: {
                      fontSize: 12,
                      padding: [0, 10, 0, 4],
                      color: '#606266'
                    },
                    value: {
                      fontSize: 12,
                      color: '#606266'
                    }
                  }
                }
              }
            }
          ]
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.ring-chart {
  border-radius: 0;
}
#chart {
  @include wh(100%, 400px);
}
</style>
