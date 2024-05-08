import { useState } from 'react'
// import { ReactDOM } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function LoginPage(){
  return (<div>Login</div>)
}

function HomePage(){
  return (<div>Login</div>)
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='login' element={LoginPage}></Route>
          <Route path='home' element={HomePage}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
