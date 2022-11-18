<template>
<el-container class="base-layout">
  <el-container>
    <el-aside width="170px">
      <slide-menu />
    </el-aside>
    <el-main class="main">
      <el-header :style="{padding: '0', height: 'auto'}">
        <header-bar />
      </el-header>
      <div class="content">
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue'
import SlideMenu from './components/SlideMenu.vue'

export default {
  name: 'base-layout',
  components: {
    HeaderBar,
    SlideMenu
  }
}
</script>

<style lang="scss" scoped>
.base-layout {
  .main {
    @include wh(calc(100vw - 200px), calc(100vh));
    background: #f4f6f9;
    padding: 0;
    .content {
      // padding: 20px;
    }
  }
}
</style>
