import {api} from "./config"

export const login = async (userData) => {
    
    try {
        const response = await api.post('/login', userData);
        return response.status <300 && response.status >=200  ? response.data : false;
    } catch (error) {
       
        return false;
    }

} 

export const signUp = async (userData) => {
    try {
        const  response = await api.post('/register', userData);
        return response.status < 300  && response.status >=200 ? true : false;
    } catch (error) {
         
        return false;
    }

}


