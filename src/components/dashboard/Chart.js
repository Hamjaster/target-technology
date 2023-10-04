import React, { useContext, useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale, // x-axis
    LinearScale,    // y-axis
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Context } from '../../context/contextApi'

ChartJS.register(LineElement, LinearScale, PointElement, CategoryScale)


function Chart() {

    const { chartData } = useContext(Context)
    const labels = ['', 'Week 1', 'Week 2', 'Week 3', 'Week 4']
    const [data, setdata] = useState()

    // Setting data to chartData (got from context)
    useEffect(() => {
        if (!chartData.User) return;
        setdata({
            labels,
            datasets: [
                { label: 'User', data: Object.values(chartData.User), tension: 0.4, borderColor: '#9BDD7C', backgroundColor: '#9BDD7C' },
                { label: 'Guest', data: Object.values(chartData.Guest), tension: 0.4, borderColor: '#E9A0A0', backgroundColor: '#E9A0A0' },
            ]
        })
    }, [chartData])

    const options = {
        plugins: {

        },

        elements: {
            point: {
                radius: 0
            }
        },
        scales: {
            x: {
                grid: {
                    display: false, // Set this to false to hide y-axis grid lines
                },
                ticks: {

                    font: {
                        size: 17
                    }
                },
                min: 0
            },
            y: {
                ticks: {
                    font: {
                        size: 17,
                    }
                },
                min: 0
            }
        },
        maintainAspectRatio: false,
        responsive: true

    }

    return (
        <div className='pb-5 bg-white rounded-2xl p-7 space-y-7'>

            {/* Heading Portion & Legends */}
            <div className="top-chart-bar flex flex-row justify-between">

                <div className="activites flex flex-col">
                    <strong className='text-lg sm:text-2xl font-bold'>Activities</strong>
                    <div className="font-thin text-sm sm:text-md text-gray-500">May - June 2021</div>
                </div>

                {/* Mapping to render legends */}
                <div className="legends justify-center flex text-sm flex-col sm:flex-row">
                    {chartData && Object.keys(chartData).map((legend) => {
                        return <div className='flex mx-4 space-x-2 items-center flex-row '>
                            <div className={`sm:w-4 w-3 sm:h-4 h-3 rounded-full ${legend === 'User' ? 'bg-[#9BDD7C]' : 'bg-[#E9A0A0]'} `}> </div>
                            <div>{legend}</div>
                        </div>
                    })}
                </div>
            </div>

            {/* Line Chart */}
            <div className="line-chart relative h-48 w-[99%]">
                {data ?
                    <Line data={data} options={options} />
                    : <></>
                }
            </div>

        </div>
    )
}

export default Chart