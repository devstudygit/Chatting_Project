import React from 'react'

const Call = ({receiverId}) => {

    
  return (
    <div>
        <div className="ms-5 me-5 mt-3 border border-4 rounded bg-light">
            <div className="d-flex justify-content-center ps-3 pe-3 text-white align-items-center" style={{backgroundColor: "darkblue"}}>
                <h3>Connecting...</h3>
            </div>
            <div className="p-3 d-flex flex-wrap">
                <div className="d-flex w-100 justify-content-center p-3 gap-3">
                    <div className="d-none col-12 col-lg-6 border bg-white rounded" style={{height: "400px"}}>
                        <video id="remote-video" style={{transform: "scaleX(-1)"}} className="h-100 w-100 rounded" autoplay playsinline></video>
                    </div>
                    <div className="col-12 col-lg-9 border bg-white rounded" style={{height: "400px"}}>
                        <video id="local-video" style={{transform: "scaleX(-1)"}} className="h-100 w-100 rounded" autoplay playsinline></video>
                    </div>
                </div>
                <div className="w-100 d-flex justify-content-center">
                    <button className="btn btn-outline-primary me-3" id="muteVideo" ><i className="fa-solid fa-video"></i></button>
                    <button className="btn btn-outline-primary me-3" id="muteAudio"><i className="fa-solid fa-microphone"></i></button>
                    <button className="btn btn-outline-danger" id="hangup"><i className="fa-solid fa-phone-flip"></i></button>
                </div>
            </div>
        </div>
        <div id="call-bell" className="mt-5 d-flex justify-content-center d-none">
            <div className="col-9 col-md-6 col-lg-4 d-flex border rounded border-4 flex-wrap shadow-md bg-white">
                <div className="d-flex justify-content-center text-white w-100" style={{backgroundColor: "darkblue"}}>
                    <h4>Calling</h4>
                </div>
                <div className="d-flex justify-content-center flex-wrap">
                    <div className="w-100 d-flex justify-content-center p-5">
                        <img id="caller-img" src="/static/visual/user.png" className="img-fluid" style={{height: "150px", width: "150px"}} />
                    </div>
                    <div id="caller" className="text-center fs-4 fw-bold w-100 mb-3 ps-5 pe-5">
                        
                    </div>
                    <div className="mb-5">
                        <button id="accept" className="btn btn-success me-3"><i className="fa-solid fa-phone-flip"></i> Accept</button>
                        <button id="reject" className="btn btn-danger"><i className="fa-solid fa-phone-slash"></i> Reject</button>
                    </div>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default Call