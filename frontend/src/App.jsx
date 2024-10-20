
// import {BrowserRouter, Routes, Route} from 'react-router-dom';

// import Login from "./Pages/Login";

// import Signup from "./Pages/Signup";
// import Home from "./Pages/Home";
// import GalleryPage from './Pages/GalleryPage';


// const App=()=> {

//   return (
//    <BrowserRouter>
//     <Routes>
//         <Route path="/" element={<Home />}/>
//           <Route index element={<Home />} />
//           <Route path='/register' element={<Signup/>}/>
//         <Route path='/login' element={<Login/>}/>
//           
          
//     </Routes>
//   </BrowserRouter>
//   )
// }

// export default App
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Register from './Pages/User/Register/Register'
import Home from './Pages/Home'
import GalleryPage from './Pages/GalleryPage';
import Login from "./Pages/User/Login/Login";
import ResetPass from "./Pages/User/Login/resetpass";
import Dashboard from "./Pages/User/Dashboard/Dashboard";
import AdminLogin from "./Pages/Admin/Admin Login/AdminLogin";
import AdminResetPass from "./Pages/Admin/Admin Login/AdminResetPass";
import AdminRegister from "./Pages/Admin/Admin Register/AdminRegister";
import AdminDashboard from "./Pages/Admin/Admin Dashboard/AdminDashboard";
import Event from "./Pages/Events/event";
import Excellia from './Pages/Excellia'
function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/excellia' element={<Excellia/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/ResetPassword" element={<ResetPass />} />
        <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Admin/Login" element={<AdminLogin />} />
          <Route path="/Admin/ResetPassword" element={<AdminResetPass />} />
          <Route path="/Admin/Register" element={<AdminRegister />} />
          <Route path="/Admin/Dashboard" element={<AdminDashboard />} />
          <Route path="/Event" element={<Event />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home />}/>
        <Route path="gallery" element={<GalleryPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
