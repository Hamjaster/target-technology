import React from 'react'

export default function Card({ bg, text, value, icon }) {

    function addCommasToNumber(number) {
        // Convert the number to a string
        const numberString = number.toString();

        // Use regular expression to add commas every three digits from the right
        const formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return formattedNumber;
    }


    return (
        <div className={`relative bg-[${bg}] rounded-2xl flex flex-col justify-end space-y-1 px-7 h-32 py-5`}>

            <div className="absolute top-4 right-5">
                <img className='w-7' src={icon} />
            </div>
            <div className="text-md font-medium">Total {text}</div>
            <div className="text-3xl font-bold">{text === 'Revenues' ? '$' : ''}{addCommasToNumber(value)}</div>

        </div>
    )
}
