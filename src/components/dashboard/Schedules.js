import React, { useContext } from 'react'
import { Context } from '../../context/contextApi'

export default function Schedules() {

    const { schedules } = useContext(Context)

    return (
        <div className='pie-chart-box space-y-6 flex flex-col w-full px-6 py-4 sm:px-10 sm:py-7'>

            {/* Heading */}
            <div className="pie-chart-heading flex flex-row justify-between">
                <div className='text-lg sm:text-2xl font-bold'>Today's Schedule</div>
                <div className="text-thin text-sm sm:text-md text-gray-400">See All</div>
            </div>

            {/* Schedules */}
            <div className=' flex flex-col space-y-3 text-[#666] justify-center'>
                {schedules.map((schedule, i) => {
                    return (
                        <div className={`flex flex-col border-l-8  px-2 ${i === 0 ? 'border-[#9BDD7C]' : 'border-[#6972C3]'} sm:py-1 py-[0.5]`}>

                            <div className="sm:text-lg text-md font-semibold">{schedule.meetingTitle}</div>
                            <div className="sm:text-md text-sm font-medium text-gray-400">{schedule.time}</div>
                            <div className="sm:text-md text-sm font-medium text-gray-400">{schedule.location}</div>

                        </div>
                    )
                })}
            </div>

        </div>

    )
}
