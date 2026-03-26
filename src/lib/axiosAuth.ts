import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}auth`

const apiAuth = axios.create({
    baseURL : BASE_URL,
    timeout : 10000,
    withCredentials : true
})

export default apiAuth