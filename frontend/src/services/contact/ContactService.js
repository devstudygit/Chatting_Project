import axios from "axios";

export const listUser= (token)=>{
    return axios.get("/users/all", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const receiver= (token, receiverId)=>{
    return axios.get(`/users/${receiverId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const chatContent= (token, receiverId)=>{
    return axios.get(`/chat-box/${receiverId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}






