import React, { useEffect, useState } from 'react'
import NavbarLogin from '../navbar/NavbarLogin'
import { editInfo, userLogin, changePw, uploadAvatar } from '../../services/user/UserService';
import "./Profile.css";

const Profile = () => {
    
    const token = localStorage.getItem("token");
    

    const [oldPw, setOldPw] = useState('');
    const [fullname, setName] = useState('');
    const [newPw, setNewPw] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [checkValidPw, setCheckValidPw]= useState('');
    let nameOri;

    useEffect(()=>{
        userLogin(token).then(res=>{
            setName(res.data.name);
            setUsername(res.data.username);
            setAvatar(res.data.avatar);
            nameOri=fullname;
            // const [un, setUn]=useState(res.username);
        }).catch(e=>{
            // localStorage.removeItem('token');
            // navigator('/login');
        });
    }, [token]);

    const handleNewPw = (e)=>{
        const valuePw = e.target.value;
        setNewPw(valuePw);
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*/?])[A-Za-z\d!@#$%^&*/?]{6,15}$/;
    
        if (valuePw.length===0) setCheckValidPw('');
        else if (!passwordRegex.test(valuePw)) setCheckValidPw('is-invalid');
        else setCheckValidPw("is-valid");
    }

    const editForm = (e)=>{
        e.preventDefault();

        if (fullname===nameOri) {
            alert("Please change your name!!!");
            return;
        }
        editInfo({name: fullname}, token).then(res=>{
            setName(res.data.name);
            alert("Your information is updated successful!!!");
        }).catch(e=>{
            alert(e.response.data);
        })
    }

    const changePwForm = (e)=>{
        e.preventDefault();
        
        const dataInput ={
            password: oldPw,
            newPw: newPw,
            checkPw: pwCheck,
        }
        
        changePw(dataInput, token).then(res=>{
            alert("Your password is changed successful!!!");
            setOldPw('');
            setNewPw('');
            setPwCheck('');
            setCheckValidPw('');
        }).catch(e=>{
            alert(e.response.data);
        })
    }

    const avatarForm = e=>{
        e.preventDefault();
        const form = new FormData(e.target);
        uploadAvatar(form, token).then(res=>{
            alert("Your avatar updates successful!")
            location.reload();
        }).catch(e=>{
            alert(e.response.data);
        })

    }

  return (
    <div>
        <NavbarLogin />
        <div className="container-fluid d-flex w-100 justify-content-end mt-5 pt-3">
            <div className="d-none col-3 ps-3 pe-3 pt-3 d-lg-inline">
                <div className="border rounded p-3">
                    <div className="mt-2">
                        <div className="d-flex justify-content-center align-items-center rounded-circle mb-3 w-100">
                            <a href="#" className="link-image avatarImg w-75">
                                <img src={avatar} className={`img-fluid`} style={{ borderRadius: "50%"}} />
                            </a>
                        </div>
                        <div>
                            <form encType="multipart/form-data" onSubmit={avatarForm}>
                                <input className="form-control mb-2 " type="file" name="avatar" required/>
                                <button type="submit" className="btn btn-sm btn-outline-warning mb-2">Change</button>
                            </form>
                        </div>
                    </div>
                    <hr className="w-100"/>
                    <div className="d-flex justify-content-between">
                        <div>
                            <div className="form-group">
                                <label htmlFor="username" className="form-label">Username </label><br/>
                                <strong>{username}</strong>
                            </div><br/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`col-12 col-lg-9 d-flex justify-content-center`}>
                <div className="w-100 rounded border-2 border-dark border bg-white shadow-md mt-3">
                    <div className="offcanvas-header d-flex justify-content-between ps-2 pe-2 border-bottom text-white" style={{backgroundColor: "darkblue"}}>
                        <h5 className="offcanvas-title">Personal Information</h5>
                    </div>
                    <form className="w-100 p-3" onSubmit={editForm}>
                        <div className="input-group">
                            <label htmlFor="name" type="button" className="btn btn-outline-secondary">Name </label>
                            <input type="text" id="name" className="form-control" required
                            value={fullname} onChange={e=>setName(e.target.value)} />
                            <button type="submit" className="btn btn-outline-primary">Save</button>
                        </div>
                    </form>
                    <form className="w-100 p-3" onSubmit={changePwForm}>
                        <div className="form-group">
                            <label htmlFor="old-password" className="form-label">Current password </label><br/>
                            <input type="password" id="old-password" className="form-control" required 
                            value={oldPw} onChange={(e)=>{setOldPw(e.target.value)}} />
                        </div><br/>
                        <div className="form-group">
                            <label htmlFor="new-password" className="form-label">New password </label><br/>
                            <input type="password" id="new-password" className={`form-control ${checkValidPw}`} required
                            value={newPw} onChange={handleNewPw} />
                            <div className="invalid-feedback">
                                Password should contain at least one letter, one digit
                                and one special character (!@#$%^&*/?).<br/>
                                The length of password is between 6 and 15 characters.
                            </div>
                        </div><br/>
                        <div className="form-group">
                            <label htmlFor="pwCheck" className="form-label">Confirm password </label><br/>
                            <input type="password" id="pwCheck" name="phone" className="form-control" required 
                            value={pwCheck} onChange={e=>{setPwCheck(e.target.value)}} />
                        </div>
                        <br/>
                        <div className="col-12 text-center">
                            <button type="submit"  className="btn btn-primary mb-2">Change password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default Profile