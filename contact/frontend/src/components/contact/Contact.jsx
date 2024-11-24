import React, { useEffect, useRef, useState } from 'react'
import NavbarLogin from '../navbar/NavbarLogin'
import './Contact.css';
import { chatContent, receiver } from '../../services/contact/ContactService';
import { confirmMes, editMes, newMes} from '../../services/contact/MesService';
import { Client } from '@stomp/stompjs';
import { userLogin } from '../../services/user/UserService';
import ListContact from './ListContact';
import Message from './Message';

const Contact = () => {

    const userLoginId = useRef(null);
    const [receiverId, setReceiverId] = useState(null);
    const currentId = useRef(null);
    const [mesSend, setMesSend] = useState(null);
    const scrollableDivRef = useRef(null);
    const setScrollableDivRef = node => {
        if (node) {
        // Scroll to the bottom after the node is updated
        node.scrollTop = node.scrollHeight;
        }
        scrollableDivRef.current = node;
    };
    const token = localStorage.getItem('token');
    useEffect(() => {
        userLogin(token).then(res => {
            userLoginId.current = res.data.id;
        })
    }, [token])
    

    const client = useRef(new Client({
        brokerURL: "ws://localhost:3000/ws",
    }));

    useEffect(() => {
        client.current.activate();
        client.current.onConnect = (frame) => {
            // console.log(frame);
            client.current.subscribe('/topic/new', res => {
                const message = JSON.parse(res.body); // Parse the new message
                if ((message.receiverId === userLoginId.current && message.senderId===Number(currentId.current)) || 
                (message.senderId === userLoginId.current && message.receiverId===Number(currentId.current))) {
                    setListMes(prevMessages => [...prevMessages, message]);
                }
            });

            client.current.subscribe('/topic/edit', res => {
                const message = JSON.parse(res.body);
                setListMes(prevMessages => 
                    prevMessages.map(msg => 
                        msg.id === message.id ? message : msg // Replace the old message with the updated one
                    )
                )
                
            })
            
            client.current.subscribe('/topic/confirm', (res)=>{
                const message = JSON.parse(res.body);
                setListMes(prevMessages=>
                    prevMessages.map(msg=>
                        msg.id === message.id ? message: msg
                    )
                )
            })
            client.current.subscribe('/topic/remove', (res)=>{
                const mesDeleteId = JSON.parse(res.body);
                setListMes(prevMessages=>
                    prevMessages.filter(msg=>
                        msg.id!==mesDeleteId
                    )
                )
            })
        }
    }, [])


    const [receiverAvatar, setAvatar] = useState('');
    const [receiverName, setName] = useState('');
    const [cover, setCover] = useState('');
    const [chatDis, setChatDis] = useState('d-none');
    const [listMes, setListMes] = useState([]);
    const [cancelEdit, setCancelEdit] = useState('d-none');

    useEffect(() => {
        if (receiverId !== null) {
            chatContent(token, receiverId).then(res => {
                setListMes(res.data);
                res.data.forEach(mes=>{
                    if (mes.receiverId=== Number(userLoginId.current) && !mes.confirm){
                        confirmMes(client, {id: mes.id});
                    }
                })
            })
        }
    }, [receiverId, token])

    const chatBox = (id, e) => {
        e.preventDefault();
        setReceiverId(id);
        currentId.current=id;
        setCover('d-none');
        setChatDis('');
        receiver(token, id).then(res => {
            setAvatar(res.data.avatar);
            setName(res.data.name);
        })
    }

    const xmark = (e) => {
        e.preventDefault();
        setCover('');
        setChatDis('d-none');
        setReceiverId(null);
        currentId.current=null;
    }

    const [mesContent, setMesContent] = useState('');

    const formSendMes = (mesSend, e) => {
        e.preventDefault();
        if (!mesSend) {
            const requestDto = {
                content: mesContent,
                senderId: userLoginId.current,
                receiverId: receiverId,
            }
            newMes(client, requestDto);
            setMesContent('');
        } else {
            if (mesContent === mesSend.content) {
                alert("Your message does not change!!!");
                return;
            }
            editMes(client, { id: mesSend.id, content: mesContent });
            setMesSend(null);
            setMesContent('');
            setCancelEdit('d-none');
        }
        listMes.map(mes=>{
            if (mes.receiverId===Number(userLoginId.current) && !mes.confirm){
                confirmMes(client, {id: mes.id});
            }
        })
    }

    const mesEdit = (message, e) => {
        e.preventDefault();
        setCancelEdit('');
        setMesContent(message.content);
        setMesSend(message);
    }

    const cancelEditClick = (e) => {
        e.preventDefault();
        setCancelEdit('d-none');
        setMesContent('');
        setMesSend(null);
    }


    return (
        <div style={{ fontFamily: "Nanum Myeongjo, serif" }}>
            <NavbarLogin />
            <div className="fluid-container d-flex flex-wrap align-items-center justify-content-between p-3 pt-4 mt-5">
                <div className={`${cover} col-12 col-lg-9 ps-5 pe-5 d-flex align-items-center justify-content-center`}>
                    <img src="assets/contact/message.png" className="img-fluid" />
                </div>

                <div className={`col-12 col-lg-9 ${chatDis}`}>
                    <div className="border chat-container m-3">
                        <div className="bg-secondary-subtle text-white p-2">
                            <div className="d-flex flex-wrap">
                                <div className="d-none d-lg-flex col-3 rounded p-2 text-bg-light align-items-center">
                                    <div className="col-2 text-center me-1">
                                        <a href="#" className="link-image" aria-haspopup="true">
                                            <img src={receiverAvatar} className="img-fluid w-50 border" style={{ borderRadius: "50%" }} />
                                        </a>
                                    </div>
                                    <div className="d-none d-lg-flex col-9">
                                        {receiverName}
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 d-flex text-dark fw-bold justify-content-center align-items-center">
                                    Box chat
                                </div>
                                <div className="d-none d-lg-flex col-3 justify-content-end align-items-center border rounded p-2">
                                    <a href="#" onClick={e => { startCall(receiverId, e) }} className="ps-2 pe-2"><i className="fa-solid fa-video"></i></a>
                                    <a href="#" onClick={xmark} className="ps-2 pe-2"><i className="fa-solid fa-xmark"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="scrollable-bar pt-3 p-2" ref={setScrollableDivRef}>
                            {listMes.map(message => {
                                if (message.status === "Message") {
                                    return (
                                        <Message
                                            key={message.id}
                                            message={message}
                                            receiverId={receiverId}
                                            mesEdit={mesEdit}
                                            client={client}
                                        />
                                    );
                                } else if (message.status === "Hangup") {
                                    return (
                                        <div key={message.id} className='ms-5 pb-2 d-flex flex-wrap justify-content-end align-items-center'>
                                            <a className='border d-flex p-1 ps-3 pe-3 rounded align-items-center text-decoration-none text-secondary'>
                                                <div className='me-2'>
                                                    <img src="/assets/contact/finish-call.png" className='img-fluid' style={{ height: "40px", borderRadius: "50%" }} />
                                                </div>
                                                <div className='text-center'>
                                                    <b className='fw-bold'>Finish call</b><br />
                                                    <span style={{ fontSize: "small" }}>Thank you for calling</span>
                                                </div>
                                            </a>
                                        </div>
                                    )
                                } else if ((message.status === "Miss" || message.status === "Reject") && message.senderId === Number(receiverId)) {
                                    return (
                                        <div key={message.id} className='me-5 pb-2 d-flex flex-wrap align-items-center'>
                                            <a href='#' className='border d-flex p-1 ps-3 pe-3 rounded align-items-center text-decoration-none'>
                                                <div className='me-2'>
                                                    <img src="/assets/contact/miss-call.png" className='img-fluid' style={{ height: "40px", borderRadius: "50%" }} />
                                                </div>
                                                <div className='text-center'>
                                                    <b className='fw-bold'>{message.status}ed call</b><br />
                                                    <span style={{ fontSize: "small" }}>Tap to call back</span>
                                                </div>
                                            </a>
                                        </div>
                                    );
                                } else if ((message.status === "Miss" || message.status === "Reject") && message.receiverId === Number(receiverId)) {
                                    <div key={message.id} className='ms-5 pb-2 d-flex flex-wrap justify-content-end align-items-center'>
                                        <a href='#' className='border d-flex p-1 ps-3 pe-3 rounded align-items-center text-decoration-none text-secondary'>
                                            <div className='me-2'>
                                                <img src="/assets/contact/miss-call2.png" className='img-fluid' style={{ height: "40px", borderRadius: "50%" }} />
                                            </div>
                                            <div className='text-center'>
                                                <b className='fw-bold'>{message.status}ed call</b><br />
                                                <span style={{ fontSize: "small" }}>Tap to call again</span>
                                            </div>
                                        </a>
                                    </div>
                                } else if (message.status === "Connecting") {
                                    return (
                                        <div key={message.id} className='ms-5 pb-2 d-flex flex-wrap justify-content-end align-items-center'>
                                            <a href='#' className='border d-flex p-1 ps-3 pe-3 rounded align-items-center text-decoration-none text-secondary'>
                                                <div className='me-2'>
                                                    <img src="/assets/contact/connecting.png" className='img-fluid' style={{ height: "40px", borderRadius: "50%" }} />
                                                </div>
                                                <div className='text-center'>
                                                    <b className='fw-bold'>Calling</b><br />
                                                    <span style={{ fontSize: "small" }}>Connecting ...</span>
                                                </div>
                                            </a>
                                        </div>
                                    );
                                }
                            })
                            }
                        </div>
                        <div className="input-container p-3 d-flex">
                            <a href="#" onClick={cancelEditClick} style={{ fontSize: "small" }} className={`${cancelEdit} border rounded round d-flex text-center align-items-center text-bg-warning text-decoration-none`}>Cancel edit</a>
                            <form className="input-group w-100" onSubmit={e => { formSendMes(mesSend, e) }}>
                                <input type="text" className="form-control" placeholder="Input message here..." required
                                    value={mesContent} onChange={e => { setMesContent(e.target.value) }} />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="submit">Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <ListContact 
                    chatBox={chatBox}
                />
            </div>
        </div>

    )
}

export default Contact