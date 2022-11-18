<template>
  <el-card class="box-card" header="">
    <div slot="header" class="clearfix">
      <span>
        通知消息
      </span>
      <el-button style="float: right;" type="primary">查看通知</el-button>
    </div>
    <div class="notif-list">
      <dl v-for="(item, index) in notif" :key="index">
        <dt></dt>
        <dd>
          <h2>{{item.title}}</h2>
          <p>{{item.des}}</p>
        </dd>
      </dl>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'notification',
  data () {
    return {
      notif: [
        {
          title: '高温蒸色预警',
          time: '1651050102393',
          des: '荔枝处于高温蓝色预警区间，请及时预防',
          icon: ''
        },
        {
          title: '高温蒸色预警',
          time: '1651050102393',
          des: '荔枝处于高温蓝色预警区间，请及时预防',
          icon: ''
        },
        {
          title: '高温蒸色预警',
          time: '1651050102393',
          des: '荔枝处于高温蓝色预警区间，请及时预防',
          icon: ''
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.notif-list {
  dl {
    overflow: hidden;
    padding: 18px 0;
    dt {
      @include wh(60px, 60px);
      background: #586771;
      float: left;
      border-radius: 100%;
    }
    dd {
      margin-left: 70px;
      h2 {
        font-size: 16px;
        color: #fff;
        margin-top: 10px;
      }
      p {
        font-size: 12px;
        margin-top: 10px;
      }
    }
  }
}
</style>
