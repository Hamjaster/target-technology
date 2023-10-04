import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Dashboard from '../components/Dashboard'
import Navbar from '../components/Navbar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Calendar from '../components/Calendar'
import { useEffect } from 'react'
import Users from '../components/users/Users'
import Projects from '../components/Projects'
import Scheduler from '../components/Calendar'

export default function Home() {

    const cache = `
    bg-[#DDEFE0]
    bg-[#F4ECDD]
    bg-[#EFDADA]
    bg-[#DEE0EF]
    
    `
    const navigate = useNavigate()
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <div className='bg-[#F5F5F5] relative flex flex-row items-center w-full ' >

            {/* Sidebar */}
            <div className={`sidebar transition-all duration-500 z-50 ${showSidebar ? 'left-0' : '-left-80'} fixed h-full w-64 mx-3 top-0 sm:left-0 py-4`}>
                <Sidebar setShowSidebar={setShowSidebar} />
            </div>

            <div className=' ml-0 sm:ml-64 w-full flex flex-col space-y-5 px-10 pt-6 '>

                {/* User Navbar */}
                <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

                <Routes>
                    <Route default path='/dashboard' element={<Dashboard />} />
                    <Route path='/projects' element={<Projects />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/calendar' element={<Scheduler />} />
                </Routes>

            </div>

        </div>
    )
}
