import axios from 'axios'
// import router from '../../router'

axios.defaults.timeout = 5000

axios.defaults.baseURL = 'http://localhost:3000'

export default axios
