'use client'

import React from 'react'
import ProjectHeader from '@/components/editor/ProjectHeader'
import VideoEditor from '@/components/editor/VideoEditor'

const EditorPage = () => {
    return (
        <div className='flex flex-col h-screen'>
            <ProjectHeader />
            <VideoEditor />
        </div>
    )
}

export default EditorPage