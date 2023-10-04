import React, { useContext, useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Context } from '../../context/contextApi'
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineClose } from 'react-icons/ai'
import { IoCreateOutline, IoCreateSharp } from 'react-icons/io5'

export default function Task({ id, title, desc, index, isNew, column_id }) {

    const [newTaskDetails, setNewTaskDetails] = useState({ id: uuidv4() })
    const { KanbanData, setKanbanData } = useContext(Context)

    const updateTaskDetails = (e) => {
        setNewTaskDetails({
            ...newTaskDetails, [e.target.name]: e.target.value
        })
    }

    const addNewTaskDetails = () => {
        console.log(column_id);

        const columnToUpdateIndex = KanbanData.findIndex((column) => {
            return column.id === column_id
        })

        console.log(columnToUpdateIndex);

        setKanbanData((prevArray) => {
            const newArray = [...prevArray]
            newTaskDetails.new = false
            console.log(newTaskDetails);
            newArray[columnToUpdateIndex].tasks.push(newTaskDetails)

            // Deleting the temporarily stored task (id:unique)
            const temporaryTaskIndex = newArray[columnToUpdateIndex].tasks.findIndex((task) => {
                return task.id === 'unique'
            })
            newArray[columnToUpdateIndex].tasks.splice(temporaryTaskIndex, 1)

            console.log(temporaryTaskIndex, newArray);
            return newArray;
        })
    }

    const removeTask = () => {
        setKanbanData((prevArray) => {
            const newArray = [...prevArray]
            const currentColumnIndex = newArray.findIndex((col) => {
                return col.id === column_id
            })
            console.log(newArray[currentColumnIndex].tasks, id);
            const taskToRemoveIndex = newArray[currentColumnIndex].tasks.findIndex((task) => {
                return task.id === id
            })
            newArray[currentColumnIndex].tasks.splice(taskToRemoveIndex, 1)
            return newArray;
        })
    }

    return (
        <Draggable draggableId={id} index={index}>

            {(provided, snapshot) => (

                <div ref={provided.innerRef} {...provided.draggableProps}
                    {...provided.dragHandleProps} className={`${snapshot.isDragging ? 'shadow-lg border-2' : ''}  text-xl flex flex-col px-4 py-4 border shadow-sm rounded-lg cursor-pointer bg-gray-100 space-y-2 relative`}>

                    <div onClick={removeTask} className="cross cursor-pointer opacity-40 absolute top-2 right-2 text-sm">
                        <AiOutlineClose />
                    </div>

                    {isNew
                        ?
                        <>
                            <input placeholder='Title' onChange={updateTaskDetails} name='title' className='px-2 text-md py-1 font-semibold bg-gray-100' type="text" value={newTaskDetails.title} />
                            <textarea placeholder='Description' onChange={updateTaskDetails} name='desc' className='px-2 text-md py-1 text-md bg-gray-100' type="text" value={newTaskDetails.desc} />
                            <div onClick={addNewTaskDetails} className='bg-green-400 py-1 rounded-md cursor-pointer text-lg text-white hover:bg-green-500 flex items-center justify-center'>
                                Create
                            </div>
                        </>
                        :
                        <>
                            <div className='font-bold text-xl'>{title}</div>
                            <div className='text-md'>{desc}</div>
                        </>
                    }

                </div>

            )}

        </Draggable>
    )
}
