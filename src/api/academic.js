import axios from '@/utils/axios'

const academic = {
  room: {
    list: () => axios.get('/api/educational/room'),
    create: (params) => axios.post('/api/educational/room', params),
    delete: (id) => axios.delete(`/api/educational/room/${id}`)
  },
  class: {
    list: () => axios.get('/api/educational/class'),
    create: (params) => axios.post('/api/educational/class', params),
    delete: (id) => axios.delete(`/api/educational/class/${id}`)
  }
}

export default academic
