import axios from '@/utils/axios'

const educational = {
  question: {
    list: (params) => axios.get('/api/question', { params }),
    type: () => axios.get('/api/question/types'),
    majors: () => axios.get('/api/educational/majors'),
    create: (params) => axios.post('/api/question', params),
    random: (params) => axios.get('/api/question/random', { params })
  },
  majors: {
    list: (params) => axios.get('/api/educational/majors', { params }),
    create: (params) => axios.post('/api/educational/majors', params),
    detail: (id) => axios.get(`/api/educational/majors/${id}`),
    delete: (id) => axios.delete(`/api/educational/majors/${id}`)
  },
  subject: {
    list: (params) => axios.get('/api/educational/subject', { params }),
    create: (params) => axios.post('/api/educational/subject', params)
  },
  outline: {
    list: () => axios.get('/api/educational/ouline')
  },
  student: {
    list: (params) => axios.get('/api/educational/students', { params }),
    create: (params) => axios.post('/api/educational/student', params),
    detail: (id) => axios.get(`/api/educational/student/${id}`),
    delete: (id) => axios.delete(`/api/educational/student/${id}`)
  },
  paper: {
    list: (params) => axios.get('/api/exam/paper', { params })
  }
}

export default educational
