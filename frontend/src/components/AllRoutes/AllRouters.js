import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CreateNote } from '../../screens/CreateNote/CreateNote'
import { LandingPage } from '../../screens/LandingPage/LandingPage'
import { LoginScreen } from '../../screens/LoginScreen/LoginScreen'
import { MyNotes } from '../../screens/MyNotes/MyNotes'
import { ProfileScreen } from '../../screens/ProfileScreen/ProfileScreen'
import { RegisterScreen } from '../../screens/RegisterScreen/RegisterScreen'
import { SingleNotes } from '../../screens/SingleNotes/SingleNotes'

export const AllRouters = ({search}) => {
  return (
    <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/mynotes' element={<MyNotes search={search} />} />
        <Route path='/login' element={<LoginScreen/>} />
        <Route path='/profile' element={<ProfileScreen/>} />
        <Route path='/register' element={<RegisterScreen/>} />
        <Route path='/createnote' element={<CreateNote/>} />
        <Route path='/notes/:id' element={<SingleNotes/>} />
    </Routes>
  )
}
