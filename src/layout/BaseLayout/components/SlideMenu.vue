<template>
  <div class="slide-menu">
    <div class="user-info">
      <el-avatar :size="50"></el-avatar>
      <span class="el-dropdown-link">
        {{info.user_name}}
      </span>
    </div>
    <el-menu
      default-active="2"
      router
      class="el-menu-vertical-demo"
    >
      <template
        v-for="item in menus"
      >
        <el-submenu v-if="item.children" :key="item.path" :index="item.path">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.meta.title}}</span>
          </template>
          <template v-for="subItem in item.children">
            <el-menu-item
              v-if="!subItem.meta.hideMenu"
              :index="subItem.path"
              :key="subItem.path"
            >
              {{subItem.meta.title}}
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item
          v-else-if="!item.meta.hideMenu"
          :index="item.path"
          :key="item.path"
        >
          <i class="el-icon-location"></i>{{item.meta.title}}
        </el-menu-item>
      </template>
      <!-- <el-menu-item index="/large_screen"><i class="el-icon-location"></i>可视化大屏</el-menu-item>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>精准气象</span>
        </template>
        <el-menu-item index="/weather/prediction">天气预报</el-menu-item>
        <el-menu-item index="/weather/early_warning">灾害预警</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数字农村</span>
        </template>
        <el-menu-item index="4-1">天气预报</el-menu-item>
        <el-menu-item index="4-2">灾害预警</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>生产管理</span>
        </template>
        <el-menu-item index="5-1">天气预报</el-menu-item>
        <el-menu-item index="5-2">灾害预警</el-menu-item>
      </el-submenu>
      <el-menu-item index="6"><i class="el-icon-location"></i>物联监控</el-menu-item>
      <el-submenu index="7">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>采收订单</span>
        </template>
        <el-menu-item index="7-1">天气预报</el-menu-item>
        <el-menu-item index="7-2">灾害预警</el-menu-item>
      </el-submenu>
      <el-menu-item index="8"><i class="el-icon-location"></i>产品数源</el-menu-item>
      <el-submenu index="9">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>经营管理</span>
        </template>
        <el-menu-item index="9-1">天气预报</el-menu-item>
        <el-menu-item index="9-2">灾害预警</el-menu-item>
      </el-submenu> -->
    </el-menu>
  </div>
</template>

<script>
import { menu } from '@/router'
import { mapState } from 'vuex'
export default {
  name: 'slide-menu',
  // data () {
  //   return {
  //     menus: menu
  //   }
  // },
  computed: {
    ...mapState('user', ['info', 'views']),
    menus () {
      return menu.reduce((prev, item, index) => {
        if (!item.children) {
          if (this.views.includes(item.name)) {
            prev.push(item)
          }
        } else {
          const children = []
          item.children.forEach(child => {
            if (this.views.includes(child.name)) {
              children.push(child)
            }
          })
          if (children.length >= 1) {
            prev.push({
              ...item,
              children
            })
          }
        }
        return prev
      }, [])
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-menu {
  @include wh(100%, calc(100vh));
  background: #101b2d;
  .user-info {
    @include flex(column, center, center);
    padding: 50px 0;
    .el-avatar {
      display: block;
      margin-bottom: 10px;
    }
    color: #fff;
  }
  ::v-deep .el-menu {
    background: transparent;
    border-right: 0;
    .el-submenu {
      min-width: auto;
      box-sizing: border-box;
      .el-menu-item {
        background: #0d1624;
        border: 0;
        min-width: auto;
        box-sizing: border-box;
        padding-left: 48px !important;
      }
    }
    .el-submenu__title {
      border-top: 0;
      color: #a9acb0;
      &:hover,&:focus {
        background: #007aff;
        color: #fff;
      }
    }
    .el-menu-item {
      color: #a9acb0;
      border-top: 0;
      &:hover,&:focus {
        background: #007aff;
        color: #fff;
      }
    }
  }
}
</style>
