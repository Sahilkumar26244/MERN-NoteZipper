import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LandingPage } from '../../screens/LandingPage/LandingPage'
import { LoginScreen } from '../../screens/LoginScreen/LoginScreen'
import { MyNotes } from '../../screens/MyNotes/MyNotes'
import { RegisterScreen } from '../../screens/RegisterScreen/RegisterScreen'

export const AllRouters = () => {
  return (
    <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/mynotes' element={<MyNotes/>} />
        <Route path='/login' element={<LoginScreen/>} />
        <Route path='/register' element={<RegisterScreen/>} />
    </Routes>
  )
}
