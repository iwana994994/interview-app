import {axios} from "axios"
const axiosInstance = axios.create({
baseUrl: "http://localhost:3000/api",
withCredential:true
})
export default axiosInstance