import React from 'react'
import { FiMenu } from 'react-icons/fi'
import notify from '../images/notify.svg'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'
import { Context } from '../context/contextApi'
import { useContext } from 'react'

export default function Navbar({ showSidebar, setShowSidebar }) {

    const { user } = useContext(Context)

    return (
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
    )
}
