import React from 'react'
import UploadToolPanel from './tools/UploadToolPanel'
import TextToolPanel from './tools/TextToolPanel'
import AssetsToolPanel from './tools/AssetsToolPanel'
import VoiceoverToolPanel from './tools/VoiceoverToolPanel'
import CaptionToolPanel from './tools/CaptionToolPanel'
import MusicToolPanel from './tools/MusicToolPanel'
import TransitionToolPanel from './tools/TransitionToolPanel'

interface ToolPanelProps {
    selectedTool: string | null
}

const toolComponents: { [key: string]: React.ReactNode } = {
    Upload: <UploadToolPanel />,
    Text: <TextToolPanel />,
    Assets: <AssetsToolPanel />,
    Voiceover: <VoiceoverToolPanel />,
    Captions: <CaptionToolPanel />,
    Music: <MusicToolPanel />,
    Transitions: <TransitionToolPanel />,
}

const ToolPanel: React.FC<ToolPanelProps> = ({ selectedTool }) => {
    return (
        <div className='flex flex-col w-1/2 h-full'>
            {selectedTool ? toolComponents[selectedTool] : null}
        </div>
    )
}

export default ToolPanel