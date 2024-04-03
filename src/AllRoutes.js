import React from 'react'
import {Routes, Route} from 'react-router-dom'
import LoginForm from './LoginForm/LoginForm'
import TeleCaller from './TeleCaller/TeleCaller'
import SlotChooser from './SlotChooser/SlotChooser'
import Admin from './Admin/Admin'
import DayDashboard from './Components/DayDashboard/DayDashboard'



const AllRoutes = () => {
  return (
    <Routes>
        <Route  path ='/' element={<LoginForm/>}/>
        <Route  path = '/telecaller' element={<TeleCaller/>}/>
        <Route  path = '/slotchooser' element={<SlotChooser/>}/>
        <Route  path = '/admin' element={<Admin/>}/>
        <Route  path = '/daydashboard' element={<DayDashboard/>}/>
     
       
    </Routes>
  )
}

export default AllRoutes
