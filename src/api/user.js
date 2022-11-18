import axios from '@/utils/axios'

const user = {
  login: (params) => axios.post('/api/user/login', params),
  register: (params) => axios.post('/api/user/register', params),
  info: () => axios.get('/api/user/info'),
  view: () => axios.get('/api/user/view')
}

export default user
