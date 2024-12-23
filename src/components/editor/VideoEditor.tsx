import React, { useState } from 'react'
import ToolPanel from './ToolPanel'
import ToolBar from './ToolBar'
import PreviewPanel from './PreviewPanel'
import TimelinePanel from './TimelinePanel'
import AIAssistantPanel from './AIAssistantPanel'

const VideoEditor = () => {
    const [selectedTool, setSelectedTool] = useState<string | null>(null)

    const handleToolClick = (tool: string) => {
        setSelectedTool(tool)
    }

    return (
        <div className='flex flex-row w-full h-full'>
            <ToolBar
                selectedTool={selectedTool}
                onToolClick={handleToolClick}
            />
            <ToolPanel
                selectedTool={selectedTool}
            />
            <div className='flex flex-col w-full h-full'>
                <PreviewPanel />
                <TimelinePanel />
            </div>
            <AIAssistantPanel />
        </div>
    )
}

export default VideoEditor