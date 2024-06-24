import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

//Interceptors son funciones
//que serán ejecutadas después de que
//el request es enviado o después
//de que es recibida la response

axiosClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axiosClient.interceptors.response.use((response)=>{
    return response
}, (error)=>{
    const{response} = error;
    if(response.status == 401){
        localStorage.removeItem('ACCESS_TOKEN')
    } 

    throw error;
})


export default axiosClient;