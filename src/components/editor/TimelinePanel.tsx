import React from 'react'
import TimelineContainer from './timeline/TimelineContainer'
import { useEditorStore } from '@/store/useEditorStore'

const TimelinePanel = () => {
    return (
        <div className='flex flex-col w-[50vw] p-2'>
            <TimelineContainer />
        </div>
    )
}

export default TimelinePanel