import { Modal } from '@material-ui/core'
import moment from 'moment'
import React from 'react'
import { useState } from 'react'
import { MdOutlineDone } from 'react-icons/md'

export default function EventUpdateModal({ event, setUpdateModalOpen, setEvents, updateModalOpen }) {
    const [title, setTitle] = useState(event?.data.title)
    const [label, setLabel] = useState(event.data.label)

    const updateEvent = () => {
        setEvents(prevEvents => {
            return prevEvents.map((e) => {
                return e.id === event.id ? { ...event, data: { ...event.data, title, label } } : e
            })
        })
        setUpdateModalOpen(false)
    }

    const deleteEvent = () => {
        setEvents(prevEvents => {
            return prevEvents.filter((e) => {
                return e.id !== event.id
            })
        })
        setUpdateModalOpen(false)
    }

    return (
        <Modal
            open={updateModalOpen}
            onClose={() => setUpdateModalOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className='flex items-center h-screen justify-center '>

                <div className="box relative  bg-white rounded-md  shadow-2xl h-96 w-[24rem] px-5 py-5">

                    <div className='text-center font-semibold text-2xl'>Update Schedule</div>

                    <div className="flex h-[14rem] mt-6 flex-col justify-between">

                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title here" required></input>

                        <div className="start flex items-center">
                            <span className='w-1/3 text-lg font-medium'>From  </span>
                            <span className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  '>
                                {moment(event?.start).format('DD/MM/YY')}
                            </span>
                        </div>

                        <div className="end flex items-center">
                            <span className='w-1/3 text-lg font-medium'>To  </span>
                            <span className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  '>
                                {moment(event?.end).format('DD/MM/YY')}
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
                        <button onClick={deleteEvent} type="button" class="text-gray-900 bg-red border border-red-300 focus:outline-none hover:bg-red-100 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb- ">Delete</button>

                        <button onClick={updateEvent} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
                    </div>

                </div>
            </div>
        </Modal>
    )
}
