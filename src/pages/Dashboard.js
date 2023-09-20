import React, { useContext, useState } from 'react'
import notify from '../images/notify.svg'
import trans from '../images/total_transactions_icon.svg'
import revenue from '../images/Vector.svg'
import likes from '../images/Vector (1).svg'
import users from '../images/Vector (2).svg'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'
import Card from '../components/Card'
import Chart from '../components/Chart'
import { PieChart } from '../components/PieChart'
import Schedules from '../components/Schedules'
import Sidebar from '../components/Sidebar'
import { FiMenu } from 'react-icons/fi'
import { Context } from '../context/contextApi'

export default function Dashboard() {
    const cache = `
    bg-[#DDEFE0]
    bg-[#F4ECDD]
    bg-[#EFDADA]
    bg-[#DEE0EF]
    
    `

    const [showSidebar, setShowSidebar] = useState(false)

    const getBgAndId = (card) => {
        switch (card.title) {
            case "Revenues":
                return { bg: '#DDEFE0', icon: revenue }
                break;

            case "Transactions":
                return { bg: '#F4ECDD', icon: trans }
                break;

            case "Likes":
                return { bg: '#EFDADA', icon: likes }
                break;

            case "Users":
                return { bg: '#DEE0EF', icon: users }
                break;

            default:
                return { bg: '#DEE0EF', icon: users }
                break;
        }
    }

    const { user, cardData } = useContext(Context)


    return (
        <div className='bg-[#F5F5F5] relative flex flex-row items-center w-full ' >

            {/* Sidebar */}
            <div className={`sidebar transition-all duration-500 z-50 ${showSidebar ? 'left-0' : '-left-80'} fixed h-full w-64 mx-3 top-0 sm:left-0 py-4`}>
                <Sidebar setShowSidebar={setShowSidebar} />
            </div>

            {/* Dashboard UI */}
            <div className=' ml-0 sm:ml-64 w-full flex flex-col space-y-5 px-10 pt-6 '>

                {/* User Navbar */}
                <nav className="flex flex-row justify-between">
                    <strong className='text-2xl '>Dashboard</strong>

                    <div className="info hidden sm:flex space-x-10">
                        <div className="input relative">
                            <input placeholder='Search...' className='rounded-xl px-3 py-2' type="text" />
                            <div className="icon absolute right-3 top-3">
                                <BiSearch />
                            </div>
                        </div>
                        <img src={notify} alt="" srcset="" />
                        <img className='w-9 h-9 rounded-full' src={user?.img} alt="" srcset="" />
                    </div>

                    {/* Hamburger only shows on small screen */}
                    <div onClick={() => {
                        setShowSidebar(!showSidebar)
                    }} className="icon sm:hidden text-2xl self-center cursor-pointer">
                        <FiMenu />
                    </div>

                </nav>

                {/* Upper four Cards */}
                <div className="first grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  h-1/5 gap-5 ">
                    {cardData && cardData.map((card) => {
                        return <Card
                            bg={getBgAndId(card).bg}
                            icon={getBgAndId(card).icon}
                            text={card.title}
                            value={card.value}
                        />
                    })}
                </div>

                {/* Line Chart */}
                <div className="chart">
                    <Chart />
                </div>

                {/* Lower Pie Chart & Schedules */}
                <div className="bottom grid grid-cols-1 lg:grid-cols-2 gap-8">

                    <div className="piechart bg-white rounded-2xl">
                        <PieChart />
                    </div>

                    <div className="schedules bg-white rounded-2xl">
                        <Schedules />
                    </div>
                </div>

            </div>

        </div>
    )
}
