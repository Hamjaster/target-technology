
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/contextApi';

export default function GetCustomHeader(header) {
    const { label, setLabel, date, setDate, view } = useContext(Context)
    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const month = () => {

        return (
            <div className=' text-xl sm:text-3xl'>{header.label}</div>
        )
    }
    const week = () => {
        const week = daysOfWeek[header.date.getDay()]
        const date = header.date.getDate()

        return (
            <div className='flex flex-col items-center'>
                <div className='text-2xl sm:text-4xl'>{date}</div>
                <div className='text-xs sm:text-xl'>{week}</div>
            </div>
        )
    }

    return (
        <>
            {view === "month"
                ? month()
                : view === "week"
                    ? week()
                    : <></>
            }

        </>
    )
}
