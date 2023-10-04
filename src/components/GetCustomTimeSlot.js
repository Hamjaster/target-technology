import React from 'react'

export default function GetCustomTimeSlot(time) {
    console.log(time);
    return (
        <div>{time.value.getHours()} : {time.value.getMinutes()}</div>
    )
}
