import axios from 'axios'
import vm from '../main'
const servier = axios.create({})

servier.interceptors.request.use(function (config) {
  // 对响应数据做点什么
  const params = {}
  for (var key in config.params) {
    const val = config.params[key]
    if (val) {
      params[key] = val
    }
  }
  config.params = params
  return config
})
servier.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  const response = error.response
  if (response.status === 401) {
    vm.$router.push('/login')
  }
})

export default servier
