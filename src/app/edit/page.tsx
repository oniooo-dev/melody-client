'use client'

import React from 'react'
import ProjectHeader from '@/components/editor/ProjectHeader'
import VideoEditor from '@/components/editor/VideoEditor'
import { useEditorStore } from '@/store/useEditorStore'
import FullscreenView from '@/components/editor/fullscreen/FullscreenView'

const EditorPage = () => {

    // Get the isFullscreen state
    const isFullscreen = useEditorStore((state) => state.isFullscreen)

    return (
        <div className='flex flex-col w-screen h-screen bg-black'>

            {/* Project Header (Navigation Bar) */}
            <div className='flex w-full'>
                <ProjectHeader />
            </div>

            {/* Video Editor */}
            <div className='flex w-full h-full'>
                <VideoEditor />
            </div>

            {/* Fullscreen View */}
            {
                isFullscreen &&
                <FullscreenView />
            }
        </div>
    )
}

export default EditorPage