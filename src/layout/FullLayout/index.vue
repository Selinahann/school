<template>
  <div class="full-layout">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'full-layout'
}
</script>

<style lang="scss" scoped>
.full-layout {
  @include wh(100vw, 100vh);
}
</style>
