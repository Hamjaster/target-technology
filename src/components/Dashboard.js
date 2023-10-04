import React from 'react'
import Card from '../components/Card'
import Chart from '../components/Chart'
import { PieChart } from '../components/PieChart'
import Schedules from '../components/Schedules'
import { Context } from '../context/contextApi'
import trans from '../images/total_transactions_icon.svg'
import revenue from '../images/Vector.svg'
import likes from '../images/Vector (1).svg'
import users from '../images/Vector (2).svg'
import { useContext } from 'react'

export default function Dashboard() {

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
        <>

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

        </>
    )
}
