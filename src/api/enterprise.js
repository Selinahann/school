import axios from '@/utils/axios'

const enterprise = {
  architectures: {
    list: () => axios.get('/api/enterprise/architectures'),
    create: (params) => axios.post('/api/enterprise/architectures', params),
    remove: (id) => axios.delete(`/api/enterprise/architectures/${id}`),
    view: (params) => axios.get('/api/user/view', { params }),
    setview: (params) => axios.post('/api/user/setIdentityView', params)
  },
  employee: {
    list: (params) => axios.get('/api/enterprise/employee', { params }),
    create: (params) => axios.post('/api/enterprise/employee', params),
    remove: (id) => axios.delete(`/api/enterprise/employee/${id}`)
  },
  role: {
    list: () => axios.get('/api/user/identity ')
  }
}

export default enterprise
