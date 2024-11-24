import './App.css'
import Call from './components/contact/Call'
import Contact from './components/contact/Contact'
import Login from './components/user/Login'
import Profile from './components/user/Profile'
import SignUp from './components/user/SignUp'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/chat' element={<Contact />}></Route>
          <Route path='/call' element={<Call/>}></Route>
        </Routes>
      </BrowserRouter>  
    </>
  )
}

export default App
