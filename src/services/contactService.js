import {api} from "./config"

export const getUserContacts = async () => {
    try {
        const response  = await api.get('/api/ContactItems/usersContacts/',{
            headers: {
                'Authorization': "Bearer "+ localStorage.getItem('token') 
            }                                                   
        } );
       
        return response.status == "200" ? response.data : false;
    } catch (error) {
        return false;
    }

}


export const deleteUserContact = async (id) => {
    try {
        const response  = await api.delete('/api/ContactItems/'+id, {
            headers: {
                'Authorization': "Bearer "+ localStorage.getItem('token') 
            }                                                   
        });
        return response.status == "200" ? true : false;  
    } catch (error) {
        return false;
    }

}




export const editUserContact = async (id, newContactData) => {
    try {
        const response  = await api.put('/api/ContactItems/'+id, newContactData, {
            headers: {
                'Authorization': "Bearer "+ localStorage.getItem('token') 
            }                                                   
        });
        return response.status == "204" ? true : false  
    } catch (error) {
        return false;
    }

}



export const uploadUserContact = async (contactData) => {
    try {
        const response  = await api.post('/api/ContactItems/', contactData, {
            headers: {
                'Authorization': "Bearer "+ localStorage.getItem('token') 
            }                                                   
        });
 
        return response.status == "201" ? response.data : false;
    } catch (error) {
        return false;
    }

}