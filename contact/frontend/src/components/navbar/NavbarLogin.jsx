import React, { useEffect, useState } from 'react'
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { userLogin, validate } from '../../services/user/UserService';
import { useNavigate } from 'react-router-dom';
import { numOfSender } from '../../services/contact/MesService';

const NavbarLogin = () => {
    const navigator = useNavigate();
    const token = localStorage.getItem('token');
    if (!token) navigator('/login');
    validate(token).then(res=>{
        if (!res.data) {
            localStorage.removeItem("token");
            navigator('/login');
        }
    })

    const [disNum, setDisNum] = useState('d-none');
    const [num, setNum] = useState('');

    const [avatarSrc, setAvatarSrc]= useState('');
    const [fullname, setName] = useState('');
    useEffect(()=>{
        userLogin(token).then(res=>{
            setAvatarSrc(res.data.avatar);
            setName(res.data.name);
        });
        numOfSender(token).then(res=>{
            setNum(res.data);
            if (res.data!==0) setDisNum('');
        }).catch(e=>{
            alert(e.response.data);
        })
    }, [token]);

    const [avatarMenu, setAvatarMenu] = useState('d-none');
    const avatarIn = (e)=>{
        e.preventDefault();
        setAvatarMenu('');
    }
    const avatarOut = (e)=>{
        e.preventDefault();
        setAvatarMenu('d-none');
    }

    const logout = (e)=>{
        e.preventDefault();
        localStorage.removeItem('token');
        navigator('/login');
    }
    return (
        <nav className="navbar navbar-expand-lg d-flex fixed-top ps-3 pe-3" style={{ backgroundColor: "azure"}} >
            <div className="container-fluid">
                <a href="#" className='me-2'>
                    <img src="/assets/navbar/logo.png" className='img-fluid' style={{height: "50px"}} />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse text-end" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto d-flex gap-3 ps-3">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#"><i className="fa-solid fa-house me-1"></i> Home</a>
                        </li>
                        <li className="nav-item position-relative">
                            <a className="nav-link" href="/chat"><i className="fa-solid fa-comments me-1"></i> Contact</a>
                            <span className={`${disNum} position-absolute ps-1 pe-1`} style={{top: "1px", right: "65px", background: "red", color: "white", borderRadius: "50%", fontSize: "10px" }}>{num}</span>
                        </li>
                        <li className="nav-item d-lg-none">
                            <a className="nav-link" href="/profile"><i className="fa-solid fa-user me-1"></i> Profile</a>
                        </li>
                        <li className="nav-item d-lg-none">
                            <a className="nav-link" href="#" onClick={logout}><i className="fa-solid fa-right-from-bracket me-1"></i> Logout</a>
                        </li>
                    </ul>
                    <div className="dropdown d-none d-lg-block">
                        <div type="button" onMouseEnter={avatarIn}>
                            <img src={avatarSrc} className="rounded-circle border border-secondary" style={{height: "40px", width: "40px"}}/>
                        </div>
                        <div className={`bg-white border rounded position-absolute end-0 mt-2 ${avatarMenu}`}  onMouseLeave={avatarOut} style={{width:"150px"}}>
                            <div className="d-flex align-items-center justify-content-center border-bottom p-2">
                                <span><i className="fa-solid fa-circle-user fa-lg me-2"></i></span>
                                <span>{fullname}</span>
                            </div>
                            <div className="d-flex align-items-center p-2">
                                <i className="fa-solid fa-user me-2"></i> 
                                <a href="/profile" className='text-decoration-none'>Profile</a>
                            </div>
                            <div className="d-flex align-items-center p-2">
                                <i className="fa-solid fa-right-from-bracket me-2"></i> 
                                <a href="#" onClick={logout} className='text-decoration-none'>Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarLogin