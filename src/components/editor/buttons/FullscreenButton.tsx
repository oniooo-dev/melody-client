import React from 'react'
import { useEditorStore } from '@/store/useEditorStore'

interface FullscreenButtonProps {
    onFullscreen: () => void;
}

const FullscreenButton: React.FC<FullscreenButtonProps> = ({ onFullscreen }) => {

    return (
        <button onClick={onFullscreen}>
            <img
                src="/assets/editor/icons/fullscreen.png"
                alt="Fullscreen"
                className='w-3 h-3 hover:scale-110 duration-500'
            />
        </button>
    )
}

export default FullscreenButton