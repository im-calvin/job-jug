import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './components/login/page'
import HomePage from './components/home/page'
import CreateAccountPage from './components/createaccount/page'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path='/register' element={<CreateAccountPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
