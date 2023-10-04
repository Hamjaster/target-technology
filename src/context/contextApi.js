import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext('')

export const ContextProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [chartData, setChartData] = useState({})
    const [schedules, setSchedules] = useState([])
    const [cardData, setCardData] = useState([])
    const [pieChartData, setPieChartData] = useState({})
    const [KanbanData, setKanbanData] = useState(
        localStorage.getItem('kanban') ? JSON.parse(localStorage.getItem('kanban')) :
            [{
                id: 'col-1',
                column: 'To-do',
                tasks: [
                    {
                        id: 'task-1.1', title: 'Daraz clone', desc: 'Clone full-stack daraz web-ecommerce store'
                    },
                    {
                        id: 'task-1.2', title: 'Update Portfolio', desc: 'Adding nice animations to developer portfolio'
                    },
                ]
            },
            {
                id: 'col-2',
                column: 'In Progress',
                tasks: [
                    {
                        id: 'task-2.1', title: 'Testing the Web App', desc: 'Adding unit tests to the backend APIs'
                    },
                ]
            },
            {
                id: 'col-3',
                column: 'In Review',
                tasks: [

                ]
            },
            {
                id: 'col-4',
                column: 'Completed',
                tasks: [

                ]
            },
            ]
    )
    const [toolbarDate, setToolbarDate] = useState(new Date());
    const [view, setView] = useState('month')
    const [label, setLabel] = useState('')
    const [date, setDate] = useState(new Date())


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

    useEffect(() => {
        localStorage.setItem('kanban', JSON.stringify(KanbanData))
    }, [KanbanData])


    return (
        <Context.Provider value={{ user, setUser, chartData, schedules, cardData, pieChartData, KanbanData, setKanbanData, toolbarDate, setToolbarDate, view, setView, label, setLabel, date, setDate }}>
            {children}
        </Context.Provider>
    )
}