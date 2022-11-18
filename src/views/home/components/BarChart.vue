<template>
  <el-card class="data-info" header="地块采收统计">
    <div id="chart" ref="chartbox"></div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'bar-chart',
  mounted () {
    // this.initChart()
    this.farmRecoveryStaticsData()
  },
  methods: {
    async farmRecoveryStaticsData () {
      const res = await this.$api.home.farmRecoveryStatics()
      console.log(res, '图表')
      const xdata = res.data.map(item => item.name)
      const data = res.data.reduce((prev, item) => {
        prev[0].push(item.one)
        prev[1].push(item.two)
        return prev
      }, [[], []])
      this.initChart(xdata, data)
    },
    initChart (xdata, data) {
      var myChart = echarts.init(this.$refs.chartbox)
      // 绘制图表
      myChart.setOption(
        {
          legend: {
            data: ['预计采收量', '实际采收量'],
            align: 'right',
            bottom: 10,
            textStyle: {
              color: '#fff'
            },
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 35
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          },

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          yAxis: {
            type: 'value',
            name: '公斤',
            nameTextStyle: {
              align: 'right'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#606266'
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#606266',
                fontWeight: 'normal',
                fontSize: '12'
              }
            }
          },
          xAxis: {
            type: 'category',
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#606266'
              }
            },
            axisLabel: {
              inside: false,
              textStyle: {
                color: '#606266',
                fontWeight: 'normal',
                fontSize: '12'
              }
            },
            data: xdata
          },
          series: [
            {
              name: '预计采收量',
              type: 'bar',
              itemStyle: {
                normal: {
                  show: true,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#009ba9'
                    },
                    {
                      offset: 1,
                      color: '#026873'
                    }
                  ]),
                  barBorderRadius: 0,
                  borderWidth: 0
                }
              },
              zlevel: 2,
              barWidth: '15%',
              data: data[0]
            },
            {
              name: '实际采收量',
              type: 'bar',
              barWidth: '15%',
              itemStyle: {
                normal: {
                  show: true,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#9ef4ff'
                    },
                    {
                      offset: 1,
                      color: '#66bbc5'
                    }
                  ]),
                  barBorderRadius: 0,
                  borderWidth: 0
                }
              },
              zlevel: 2,
              data: data[1]
            }
          ]
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
#chart {
  @include wh(100%, 400px);
}
</style>
