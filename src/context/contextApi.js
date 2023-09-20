import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext('')

export const ContextProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [chartData, setChartData] = useState({})
    const [schedules, setSchedules] = useState([])
    const [cardData, setCardData] = useState([])
    const [pieChartData, setPieChartData] = useState({})

    const getDataFromApi = async () => {
        try {
            const { data } = await axios.get('https://api.npoint.io/e7268b28c20d13b52e97')

            setChartData(data.chartData)
            setPieChartData(data.pieChartData)
            setSchedules(data.todaysSchedule)
            setCardData(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDataFromApi()
    }, [])


    return (
        <Context.Provider value={{ user, setUser, chartData, schedules, cardData, pieChartData }}>
            {children}
        </Context.Provider>
    )
}