// import { useState } from 'react'
import Signup from './pages/signup'
import Login from './pages/login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatInterface from './components/chatInterface';

function App() {

  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <BrowserRouter>
        <Routes>
          <Route path = "/signup" element={<Signup/>}/>
          <Route path = "/login" element={<Login/>}/>
          <Route path = "/chat" element={<ChatInterface/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
