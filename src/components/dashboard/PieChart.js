import React, { useContext } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Context } from '../../context/contextApi'

ChartJS.register(ArcElement);


export function PieChart() {

    const { pieChartData } = useContext(Context)

    const data = {
        labels: Object.keys(pieChartData),
        datasets: [
            {
                label: '# of Votes',
                data: Object.values(pieChartData),
                backgroundColor: ['#98D89E', '#EE8484', '#F6DC7D'],
                hoverBackgroundColor: ['#98D89E', '#EE8484', '#F6DC7D'],
                hoverBorderColor: ['#98D89E', '#EE8484', '#F6DC7D'],
                borderColor: ['#98D89E', '#EE8484', '#F6DC7D'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true
    }

    const getClassBgOfPie = (product) => {
        switch (product) {
            case 'Basic Trees':
                return 'bg-[#98D89E]'
                break;

            case 'Super Hoodies':
                return 'bg-[#EE8484]'
                break;

            case 'Custom Short Pants':
                return 'bg-[#F6DC7D]'
                break;

            default:
                return 'bg-[#EE8484]'
                break;
        }
    }

    return <div className='pie-chart-box space-y-6 flex flex-col w-full px-6 py-0 pt-4 sm:px-10 sm:py-7'>

        {/* Heading */}
        <div className="pie-chart-heading flex flex-row justify-between">
            <div className='text-lg sm:text-xl md:text-2xl font-bold'>Top Products</div>
            <div className="text-thin text-xs self-center text-gray-400">May - June 2021</div>
        </div>

        {/* Chart and Legends */}
        <div className='flex flex-row justify-between'>
            {/* Pie chart */}
            <div className="pie grid grid-cols-1 sm:h-[80%] h-[10%] w-[36%] md:w-[36%]">
                <Pie data={data} options={options} />
            </div>
            {/* Legends */}
            <div className="flex flex-col items-start space-y-2 ">

                {Object.entries(pieChartData).map(([key, value]) => {
                    return <div className='flex items-start space-x-2 flex-row'>

                        <div className={`rounded-full mt-1 w-4 h-4 ${getClassBgOfPie(key)} `}>
                        </div>

                        <div>
                            <div className='text-xs sm:text-lg font-extrabold'>{key}</div>
                            <div className='text-sm font-thin text-gray-400'>{value}</div>
                        </div>

                    </div>
                })}

            </div>

        </div>

    </div>
}
