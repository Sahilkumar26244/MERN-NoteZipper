import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LandingPage } from '../../screens/LandingPage/LandingPage'
import { MyNotes } from '../../screens/MyNotes/MyNotes'

export const AllRouters = () => {
  return (
    <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/mynotes' element={<MyNotes/>} />
    </Routes>
  )
}
