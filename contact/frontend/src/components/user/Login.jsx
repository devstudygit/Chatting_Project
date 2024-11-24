import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/user/UserService';

const Login = () => {

    const navigator = useNavigate();
    if (localStorage.getItem('token')) navigator("/profile");

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const formLogin = (e)=>{
        e.preventDefault();
        const dataInput = {
            username: username,
            password: password,
        }

        login(dataInput).then((res)=>{
            localStorage.setItem('token', res.data.token);
            // localStorage.setItem
            navigator('/profile');
        }).catch(e=>{
            alert(e.response.data);
        })
    }

  return (
    <div className="" style={{ fontFamily : "Nanum Myeongjo, serif"}}>
        <div className="d-flex flex-wrap justify-content-center pt-5 pb-5">
        <div className="container-fluid border border-primary rounded shadow-lg 
            d-flex flex-wrap justify-content-center col-11 col-lg-7">
            <h1 className="w-100 text-center text-white" style={{ backgroundColor: "darkblue"}}>Join with Luna's universe</h1>
            <form id="form-login" className="w-100 ps-3 pe-3" onSubmit={formLogin}>
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username </label><br/>
                    <input type="text" id="username" className="form-control" required
                    value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                </div><br/>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password </label><br/>
                    <input type="password" id="password" className="form-control"
                    value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>

                </div><br/>
                <a href="/signup" className="w-100 link-secondary">Don't have an account?</a>
                <br/><br/>
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary mb-2">Login</button>
                </div>

            </form>
            <div className="w-100 text-center d-flex flex-wrap justify-content-center">
                <hr className="w-25"/><span className="m-1"><b>or</b></span><hr className="w-25"/>
            </div>
            <div className="d-flex w-100 justify-content-center pb-5">
                <div className="col-2 d-flex justify-content-center">
                    <div className="border-radius-sm rounded-circle border-2 border border-dark" style={{height: "45px", width: "45px" }}>
                        <a href="/oauth2/authorization/naver" id="naver" className="link-image">
                            <img src="assets/user/naver.png" className="img-fluid" style={{borderRadius: "50%"}} />
                        </a>
                    </div>
                </div>
                <div className="col-2 d-flex justify-content-center">
                    <div className="border-radius-sm rounded-circle border-2 border border-dark" style={{height: "45px", width: "45px" }} >
                        <a href="/oauth2/authorization/kakao" id="kakao" className="link-image">
                            <img src="assets/user/kakao.png" className="img-fluid" style={{borderRadius: "50%"}} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Login