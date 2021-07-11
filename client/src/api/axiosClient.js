import axios from 'axios';

export default axios.create({
    baseURL: `http://localhost:3001`,
    // baseURL: process.env.BASE_URL_AXIOS,
    headers:{
        'content-type': 'application/json'
    }
})