import axios from "axios";

export const newMes = (client, requestDto)=>{
    return client.current.publish({
        destination: "/app/new", 
        body: JSON.stringify(requestDto),
    })
} 
export const editMes = (client, requestDto)=>{
    return client.current.publish({
        destination: "/app/edit", 
        body: JSON.stringify(requestDto),
    })
}
export const removeMes = (client, requestDto)=>{
    return client.current.publish({
        destination: "/app/remove", 
        body: JSON.stringify(requestDto),
    })
}

// export const confirmMes = (token, mesId)=>{
//     return axios.put(`/mes/${mesId}`, {}, {
//         headers: {
//             "Authorization": `Bearer ${token}`,
//         }
//     })
// }

export const confirmMes = (client, requestDto)=>{
    return client.current.publish({
        destination: "/app/confirm",
        body: JSON.stringify(requestDto),
    })
}

export const numOfSender = (token)=>{
    return axios.get('/mes/count', {
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    })
}

export const numOfMes = (token, senderId)=>{
    return axios.get(`/mes/count/${senderId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}




