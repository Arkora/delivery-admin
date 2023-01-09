import React from 'react'
import {  BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import UploadForm from './pages/UploadForm'
import Update from './pages/Update';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/upload' element={<UploadForm/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/update/:id' element={<Update/>} />        
      </Routes>
    </Router>
  )
}

export default App