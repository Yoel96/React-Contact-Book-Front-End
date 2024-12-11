import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APIURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getNewToken = async()=>{

    const refreshToken=  localStorage.getItem('refreshToken');
    try {
      const response = await api.post('/refresh', {refreshToken });
       
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
       
    } catch (error) {
      
      throw error;
    }
}
 
export {getNewToken, api};
