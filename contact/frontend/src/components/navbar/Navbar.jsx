import React from 'react'
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg d-flex fixed-top ps-3 pe-3" style={{ backgroundColor: "azure"}}>
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
                        <li className="nav-item">
                            <a className="nav-link" href="/chat"><i className="fa-solid fa-comments me-1"></i> Contact</a>
                        </li>
                        <li className="nav-item d-lg-none">
                            <a className="nav-link" href="/login"><i className="fa-solid fa-user me-1"></i> Login</a>
                        </li>
                        <li className="nav-item d-lg-none">
                            <a className="nav-link" href="/signup"><i className="fa-solid fa-right-from-bracket me-1"></i> Sign up</a>
                        </li>
                    </ul>
                    <div className="dropdown d-none d-lg-block">
                        <div className="d-none d-sm-flex justify-content-end">
                            <a href="/login" target="_blank" className="btn btn-light me-2">로그인</a>
                            <a href="/signup" target="_blank" className="btn btn-light">회원가입</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar