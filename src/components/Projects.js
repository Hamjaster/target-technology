import React from 'react'
import { useState } from 'react';
import Kanban from './kanban/Kanban'
export default function Projects() {

    return (
        <div className='overflow-hidden'>
            <Kanban />
        </div>
    )
}
