<template>
  <div class="header-bar">
    <a href="javascript:;" class="logo"></a>
    <nav class="topbar-tools">
      <a href="javascript">
        <el-tooltip class="item" effect="dark" content="下载中心" placement="bottom">
          <i class="el-icon-message-solid"></i>
        </el-tooltip>
      </a>
      <a href="javascript">
        <el-tooltip class="item" effect="dark" content="帮助中心" placement="bottom">
          <i class="el-icon-message-solid"></i>
        </el-tooltip>
      </a>
      <el-popover
          width="200"
          trigger="hover"
        >
        <a href="javascript" slot="reference">
            <i class="el-icon-message-solid" ></i>
        </a>
        <el-tabs v-model="activeName">
          <el-tab-pane label="消息通知" name="message">用户管理</el-tab-pane>
          <el-tab-pane label="员工通知" name="second">配置管理</el-tab-pane>
        </el-tabs>
      </el-popover>

      <a href="javascript"><i class="el-icon-message-solid"></i></a>
      <a href="javascript"><i class="el-icon-message-solid"></i></a>
      <a href="javascript"><i class="el-icon-message-solid"></i></a>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'header-bar',
  data () {
    return {
      activeName: 'message'
    }
  }
}
</script>

<style lang="scss" scoped>
.header-bar {
  @include wh(100%, 56px);
  background: #fff;
  display: flex;
  justify-content: flex-end;
  .topbar-tools {
    display: block;
    color: #ccc;
    @include flex(row);
    a {
      @include wh(56px, 56px);
      @include flex(row, center, center);
      font-size: 24px;
      i {
        color: #000;
      }
      &:hover {
        background: #f4f6f9;
        i {
          color: #007aff;
        }
      }
    }
  }
}
</style>
