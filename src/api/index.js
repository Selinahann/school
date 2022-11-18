import user from './user'
import home from './home'
import educational from './educational'
import academic from './academic'
import enterprise from './enterprise'

const api = {
  user,
  home,
  educational,
  academic,
  enterprise
}

export default {
  ...api,
  install (Vue) {
    Vue.prototype.$api = api
  }
}
