import React from 'react'
import { useContext } from 'react';
import { Context } from '../../context/contextApi';

export default function GetCustomEvent({ event }) {

    function formatTime(hours) {
        // Ensure hours are within the 0-23 range
        hours = (hours >= 0 && hours <= 23) ? hours : 0;

        // Convert 24-hour format to 12-hour format
        let amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM

        // Convert hours to a string and pad with leading zero if needed
        const formattedHours = hours.toString().padStart(2, '0');

        return `${formattedHours}`;
    }

    const start = `${formatTime(event?.start.getHours())}:${event?.start.getMinutes() > 9 ? event?.start.getMinutes() : "0" + event?.start.getMinutes()}`
    const end = `${formatTime(event?.end.getHours())}:${event?.end.getMinutes() > 9 ? event?.end.getMinutes() : "0" + event?.end.getMinutes()}`

    const label = event?.data?.label
    const title = event?.data?.title
    const { view } = useContext(Context)

    const getMonthClass = (label) => {
        switch (label) {
            case 'red':
                return 'bg-red-600'
                break;
            case 'blue':
                return 'bg-blue-600'
                break;
            case 'green':
                return 'bg-green-600'
                break;
            case 'yellow':
                return 'bg-yellow-600'
                break;
            case 'purple':
                return 'bg-purple-600'
                break;

            default:
                return 'bg-blue-600'
                break;
        }
    }
    const getWeekClass = (label) => {
        switch (label) {
            case 'red':
                return 'bg-red-600 text-red-700 border-red-600'
                break;

            case 'blue':
                return 'bg-blue-600 text-blue-700 border-blue-600'

            case 'yellow':
                return 'bg-yellow-600 text-yellow-700 border-yellow-600'
                break;

            case 'purple':
                return 'bg-purple-600 text-purple-700 border-purple-600'
                break;

            default:
                return 'bg-green-600 text-green-700 border-green-600'
                break;
        }
    }

    return (
        view === "month"
            ? <div className={`${getMonthClass(label)} px-3 rounded-lg w-full `}>
                {title}
            </div>
            : view === "week"
                ? <div className={`${getWeekClass(label)} border-l-4 bg-opacity-40 rounded-tr-2xl rounded-br-2xl w-full h-full flex items-center justify-center pl-2`}>
                    <div style={{ lineHeight: '1.2rem' }} className='text-lg font-semibold'>{title}</div>
                    {/* <div className="time">{start}-{end}</div> */}
                </div>
                : <div className={`${getWeekClass(label)} border-l-4 pl-6 bg-opacity-40 rounded-tr-2xl rounded-br-2xl w-full h-full flex flex-col items-start justify-evenly`}>
                    <div className='text-2xl font-semibold'>{title}</div>
                    <div className="time text-lg">{start} - {end}</div>
                </div>
    )
}
