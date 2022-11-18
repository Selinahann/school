<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

</style>
<script>
export default {
  created () {
    if (window.location.pathname !== '/login') {
      this.$store.dispatch('user/fetchUserInfo').then(() => {
        if (!this.$store.state.user.views.includes(this.$route.name)) {
          this.$message({
            message: '没有权限访问',
            type: 'success'
          })
          window.location.href = '/home'
          // this.$router.replace('/home')
        }
      })
    }
  }
}
</script>
