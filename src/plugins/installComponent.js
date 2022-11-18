const requireComponent = require.context(
  // 其组件目录的相对路径
  '@/components',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /\.(vue|js)$/
)

// export default {
//   install (Vue) {}
// }
export default (Vue) => {
  // Vue.prototype.$aaa = 123213
  requireComponent.keys().forEach(filePath => {
    const componentConfig = requireComponent(filePath)
    const componentContent = componentConfig.default
    console.log(filePath)
    if (filePath.indexOf('.js') !== -1) {
      Vue.use(componentContent)
    } else {
      Vue.component(componentContent.name, componentContent)
    }
  })
}
