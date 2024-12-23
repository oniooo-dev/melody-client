import React from 'react'
import ToolPanel from './ToolPanel'
import ToolBar from './ToolBar'
import PreviewPanel from './PreviewPanel'
import TimelinePanel from './TimelinePanel'
import AIAssistantPanel from './AIAssistantPanel'

const VideoEditor = () => {
    return (
        <div className='flex flex-row w-full h-full bg-gray-200'>
            <ToolBar />
            <ToolPanel />
            <div className='flex flex-col w-full h-full'>
                <PreviewPanel />
                <TimelinePanel />
            </div>
            <AIAssistantPanel />
        </div>
    )
}

export default VideoEditor