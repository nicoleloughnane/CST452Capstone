import axios from 'axios'
export default() => {
  return axios.create({
    //url of the backend
    baseURL: `http://localhost:3000/api/v1` 
  })
} 