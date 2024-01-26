import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Suspense } from 'react'
import { Spinner } from '@chakra-ui/react'

const Projects = React.lazy(() => import('../components/Projects'))
const Dashboard = React.lazy(() => import('../components/dashboard/Dashboard'))
const Scheduler = React.lazy(() => import('../components/calendar/Calendar'))
const Users = React.lazy(() => import('../components/users/Users'))

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

                <Suspense fallback={<div className='flex items-center justify-center h-full w-full'>Loading...</div>}>
                    <Routes>
                        <Route default path='/' element={<Dashboard />} />
                        <Route path='/projects' element={<Projects />} />
                        <Route path='/users' element={<Users />} />
                        <Route path='/calendar' element={<Scheduler />} />
                    </Routes>
                </Suspense>


            </div>

        </div>


    )
}
