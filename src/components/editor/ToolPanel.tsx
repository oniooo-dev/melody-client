import React from 'react'
import UploadToolPanel from './panels/UploadToolPanel'
import TextToolPanel from './panels/TextToolPanel'
import AssetsToolPanel from './panels/AssetsToolPanel'
import VoiceoverToolPanel from './panels/VoiceoverToolPanel'
import CaptionsToolPanel from './panels/CaptionsToolPanel'
import AnimationsToolPanel from './panels/AnimationsToolPanel'
import StickersToolPanel from './panels/StickersToolPanel'
import FiltersToolPanel from './panels/FiltersToolPanel'
import SelectedClipPanel from './panels/SelectedClipPanel'

interface ToolPanelProps {
    selectedTool: string | null
}

const toolComponents: { [key: string]: React.ReactNode } = {
    SelectedClip: <SelectedClipPanel />,
    Upload: <UploadToolPanel />,
    Text: <TextToolPanel />,
    Assets: <AssetsToolPanel />,
    Stickers: <StickersToolPanel />,
    Voiceover: <VoiceoverToolPanel />,
    Captions: <CaptionsToolPanel />,
    Animations: <AnimationsToolPanel />,
    Filters: <FiltersToolPanel />,
}

const ToolPanel: React.FC<ToolPanelProps> = ({ selectedTool }) => {
    return (
        <div
            className="
                flex flex-col w-full h-full
                bg-gray-100
            "
        >

            {/* Tool Panel */}
            {
                selectedTool ?
                    toolComponents[selectedTool] :
                    <div className='flex flex-col w-full h-full items-center justify-center'>
                        <p className='text-gray-500'>Select a tool to get started</p>
                    </div>
            }

        </div>
    )
}

export default ToolPanel