import React, { useEffect, useState } from 'react'
import { listUser } from '../../services/contact/ContactService';
import { numOfMes } from '../../services/contact/MesService';

const ListContact = ({chatBox}) => {

    const token = localStorage.getItem('token');
    const [users, setUsers] = useState([]);
    useEffect(() => {
        listUser(token).then(res => {
            setUsers(res.data);
            res.data.forEach(sender=>{
                numOfMes(token, sender.id).then(res=>{
                    if (res.data!==0) document.getElementById(`sender${sender.id}`).classList.remove('d-none');
                    document.getElementById(`sender${sender.id}`).innerText=res.data;
                })
            })
        })
    }, [token]);

    return (
        <div className="d-none d-lg-flex flex-wrap col-3 p-3 border rounded">
            <h3 className="w-100 border-bottom border-2 border-dark mb-3">Friends</h3>
            <div className="w-100 scrollable-bar">
                {
                    users.map(user =>
                        <div key={user.id} className='mb-2'>
                            <a href="#" onClick={e => { chatBox(user.id, e) }} className="text-decoration-none d-flex p-2 border rounded" aria-haspopup="true">
                                <div className="d-flex col-6">
                                    <div className="col-4 text-center me-1">
                                        <img src={user.avatar} id="base-image" className="img-fluid w-50" style={{ borderRadius: "50%" }} />
                                    </div>
                                    <div className="d-none d-lg-flex col-7">
                                        {user.name}
                                    </div>
                                </div>
                                <div className="d-flex col-6 justify-content-end">
                                    <div className="d-none position-relative me-3">
                                        <img src="assets/contact/miss-call.png" className="img-fluid" style={{ height: "24px", width: "24px" }} />
                                    </div>
                                    <div className="position-relative me-1">
                                        <i className="fa-solid fa-comments"></i>
                                        <span id={`sender${user.id}`} className={`d-none position-absolute ps-1 pe-1`} style={{ top: "-1px", right: "-7px", background: "red", color: "white", borderRadius: "50%", fontSize: "10px" }}>
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ListContact