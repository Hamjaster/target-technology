import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './reactCalendar.css'
import GetCustomToolbar from './Toolbar'
import GetCustomHeader from './GetCustomHeader'
import Modal from '@mui/material/Modal';
import GetCustomEvent from './GetCustomEvent'
import { Context } from '../../context/contextApi'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'
import { v4 as uuidv4 } from 'uuid';
import EventUpdateModal from './EventUpdateModal'
import { MdOutlineDone } from 'react-icons/md'

const localizer = momentLocalizer(moment) // or globalizeLocalizer
const MemoizedGetCustomToolbar = React.memo(GetCustomToolbar);
const MemoizedGetCustomHeader = React.memo(GetCustomHeader);
const DragAndDropCalendar = withDragAndDrop(Calendar)

export default function Scheduler() {
    const [open, setOpen] = useState(false);
    const [slotInfo, setSlotInfo] = useState()
    const [startDate, setstartDate] = useState()
    const [endDate, setendDate] = useState()
    const [label, setLabel] = useState()
    const [title, setTitle] = useState('')
    const { view } = useContext(Context)

    const [events, setEvents] = useState([
        {
            id: uuidv4(),
            data: {
                title: "Tweeting a thread",
                label: "red"
            },
            start: new Date(),
            end: new Date(moment(new Date()).add(4, 'hours').subtract(1, 'day')),

        },
        {
            id: uuidv4(),
            data: {
                title: "Making cool things",
                label: "green"
            },
            start: new Date(moment(new Date()).subtract(2, 'hours').add(5, 'days')),
            end: new Date(moment(new Date()).subtract(4, 'hours').add(7, 'days')),

        },
        {
            id: uuidv4(),
            data: {
                title: "Updating Porfolio",
                label: "blue"
            },
            start: new Date(moment(new Date()).add(1, 'hours').add(3, 'days')),
            end: new Date(moment(new Date()).add(4, 'hours').add(3, 'days')),

        }
    ])
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
    const [clickedEvent, setClickedEvent] = useState()

    const handleSelectSlot = (slotInfo) => {
        const s = moment(slotInfo.start)
        const e = moment(slotInfo.end)
        console.log(slotInfo.start, slotInfo.end);
        setSlotInfo(slotInfo)
        setstartDate(s);
        setendDate(e);
        setOpen(true)
    };

    const handleCreateEvent = () => {

        console.log(slotInfo.start, slotInfo.end);
        const endDateForMonth = new Date(slotInfo.start)
        endDateForMonth.setHours(23, 59, 59, 999)
        console.log(endDateForMonth);

        setEvents(ev => {
            return [...ev, {
                id: uuidv4(),
                data: {
                    title,
                    label,
                },

                start: slotInfo.start,
                end: view === "month" ? endDateForMonth : slotInfo.end
            }]
        })

        setOpen(false)
    }

    const renderModal = () => {
        if (!open) return;
        return (
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='flex items-center h-screen justify-center '>

                    <div className="box relative  bg-white rounded-md  shadow-2xl h-96 w-[24rem] px-5 py-5">

                        <div className='text-center font-semibold text-2xl'>Create a Schedule</div>

                        <div className="flex h-[14rem] mt-6 flex-col justify-between">

                            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title here" required></input>

                            <div className="start flex items-center">
                                <span className='w-1/3 text-lg font-medium'>From  </span>
                                <span className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  '>
                                    {startDate?.format('DD/MM/YY')}
                                </span>
                            </div>

                            <div className="end flex items-center">
                                <span className='w-1/3 text-lg font-medium'>To  </span>
                                <span className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  '>
                                    {endDate?.format('DD/MM/YY')}
                                </span>
                            </div>

                            <div className="flex flex-row justify-between">
                                <span className='text-lg font-medium'>Select Label </span>
                                <div class="labels flex items-center space-x-3 mb-4">
                                    {['red', 'green', 'blue', 'yellow', 'purple'].map((lbl) => {

                                        return <div onClick={() => setLabel(lbl)} className={`${label === lbl ? `bg-${lbl}-800` : ''} cursor-pointer bg-${lbl}-500 px-3 py-3 rounded-full relative`}>

                                            <div className={`${label === lbl ? '' : 'hidden'} tick text-white absolute top-1 right-1`}>
                                                <MdOutlineDone />
                                            </div>

                                        </div>
                                    })}

                                </div>
                            </div>

                        </div>


                        <div className="absolute bottom-3 right-3">
                            <button onClick={() => setOpen(false)} type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Close</button>
                            <button onClick={handleCreateEvent} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create</button>
                        </div>

                    </div>
                </div>
            </Modal>
        )
    }

    const handleModifyEvent = useCallback(
        ({ start, end, event }) => {
            setEvents(prevEvents => {
                return prevEvents.map((e) => {
                    return e.id === event.id ? { ...e, start, end } : e
                })
            })
        },
        [setEvents],
    )

    useEffect(() => {
        console.log(events);
    }, [events])


    return (
        <div className="h-[85vh]">
            <DragAndDropCalendar
                localizer={localizer}
                timeslots={1}
                events={events}
                defaultView='week'
                step={60}
                components={{
                    toolbar: MemoizedGetCustomToolbar,
                    header: MemoizedGetCustomHeader,
                    event: GetCustomEvent
                }}
                onSelectSlot={handleSelectSlot}
                resizeable={true}
                selectable={true}
                onEventResize={handleModifyEvent}
                onEventDrop={handleModifyEvent}
                onSelectEvent={e => {
                    setUpdateModalOpen(true)
                    setClickedEvent(e)
                }}
            />
            {renderModal()}
            {updateModalOpen && <EventUpdateModal updateModalOpen={updateModalOpen} setEvents={setEvents} event={clickedEvent} setUpdateModalOpen={setUpdateModalOpen} />}
        </div>
    )
}
