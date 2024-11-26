import axios from "axios";

export const newUser = (user) =>{
    return axios.post("/users", user);
}

export const login = (user) => {
    return axios.post("/token", user);
}

// export const loginSocial = ()=>{
//     return axios.get("/token/oauth");
// }

export const validate = (token) => {
    return axios.get(`/token?token=${token}`);
}

export const userLogin = (token)=>{
    return axios.get("/users", {
        headers: {
            "Authorization": `Bearer ${token}`, 
        }
    })
}

export const editInfo = (user, token) =>{
    return axios.put("/users", user, {
        headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json",
        }
    })
}

export const changePw = (user, token) =>{
    return axios.put("/users/password", user, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
}

export const uploadAvatar = (image, token) =>{
    return axios.put("/users/avatar", image, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}