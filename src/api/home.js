import axios from '@/utils/axios'

const home = {
  weather: (params) => axios.get('/farmland/mock/timeWeather', { params }),
  dataOverview: () => axios.get('/farmland/mock//dataOverview'),
  farmRecoveryStatics: () => axios.get('/farmland/mock/farmRecoveryStatics'),
  farmPayStatics: () => axios.get('/farmland/mock/farmPayStatics')
}

export default home
