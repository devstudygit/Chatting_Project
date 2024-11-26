import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { newUser } from '../../services/user/UserService';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {

    const navigator= useNavigate();

    if (localStorage.getItem("token")) navigator("/profile");

    const [username, setUsername] = useState('');
    const [checkValidUn, setCheckValidUn] = useState('');
    const [password, setPassword] = useState('');
    const [checkValidPw, setCheckValidPw] = useState('');
    const [checkPw, setCheckPw] = useState('');
    const [fullname, setName] = useState('');

    const handleUnInput = (e)=>{
        const value= e.target.value
        setUsername(value);

        const usernameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,10}$/;
    
        if (value.length===0) setCheckValidUn('');
        else if (!usernameRegex.test(value)) setCheckValidUn('is-invalid');
        else setCheckValidUn("is-valid");
    }

    const handlePwInput = (e)=>{
        const valuePw= e.target.value
        setPassword(valuePw);

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*/?])[A-Za-z\d!@#$%^&*/?]{6,15}$/;
    
        if (valuePw.length===0) setCheckValidPw('');
        else if (!passwordRegex.test(valuePw)) setCheckValidPw('is-invalid');
        else setCheckValidPw("is-valid");
    }

    const createUser = (e)=>{
        e.preventDefault();

        if (!(checkValidUn==='is-valid' && checkValidPw==='is-valid')){
            alert("Please check the condition of username or password again!!!");
            return;
        }

        const dataInput= {
            username: username,
            password: password,
            checkPw: checkPw,
            name: fullname,
        }

        newUser(dataInput).then((res)=>{
            alert("Sign up successful!!!")
            navigator('/login');
        }).catch(e=>{
            alert(e.response.data);
        })
    }

  return (
    <div style={{ fontFamily: 'Nanum Myeongjo, serif' }}>
        <div className="d-flex flex-wrap justify-content-center">
            <div className="container-fluid border border-primary rounded m-3 bg-white shadow-lg
                d-flex flex-wrap justify-content-center col-11 col-lg-7">
                <h1 className="w-100 text-center text-white" style={{ backgroundColor: 'darkblue' }}>Welcome to Luna's universe</h1>
                <form id="form-create" className="w-100 ps-3 pe-3" onSubmit={createUser}>
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">Username </label><br />
                        <input type="text" id="username" className={`form-control ${checkValidUn}`} required 
                        value={username} onChange={handleUnInput}/>
                        <div className="invalid-feedback">
                            Username should contain at least one letter and one digit.<br/>
                            The length of username is between 4 and 10 characters.
                        </div>
                    </div><br/>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password </label><br/>
                        <input type="password" id="password" className={`form-control ${checkValidPw}`} required
                        value={password} onChange={handlePwInput}/>
                        <div className="invalid-feedback">
                            Password should contain at least one letter, one digit
                            and one special character (!@#$%^&*/?).<br/>
                            The length of password is between 6 and 15 characters.
                        </div>
                    </div><br/>
                    <div className="form-group">
                        <label htmlFor="pwCheck" className="form-label">Confirm password </label><br/>
                        <input type="password" id="pwCheck" className="form-control" required
                        value={checkPw} onChange={(e)=>{setCheckPw(e.target.value)}}/>
                    </div><br/>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name </label><br/>
                        <input type="text" id="name" className="form-control" required
                        value={fullname} onChange={(e)=>{setName(e.target.value)}}/>
                    </div><br/>
                    <a href="/login" className="w-100 link-secondary">Already have account?</a>
                    <br/><br/>
                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-primary mb-2">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignUp