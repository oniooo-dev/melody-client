import { useEditorStore } from '@/store/useEditorStore'
import React from 'react'

interface FullscreenViewProps {
}

const FullscreenView: React.FC<FullscreenViewProps> = () => {

    // Set the isFullscreen state
    const setIsFullscreen = useEditorStore((state) => state.setIsFullscreen)

    return (
        <div
            className='absolute top-0 left-0 w-full h-full bg-black p-1'
            style={{
                zIndex: 9999
            }}
        >

            {/* Main Player */}
            <div className='w-full h-full bg-white/10'>

            </div>

            {/* Player Controls */}
            <div
                className='
                    absolute bottom-4 left-0 flex flex-row items-center justify-between w-full 
                    gap-2 px-4
                '
            >
                <div>

                </div>
                <button
                    onClick={
                        () => setIsFullscreen(false)
                    }
                    className='filter invert hover:scale-110 duration-500 w-4 h-4'
                >
                    <img
                        src="/assets/editor/icons/fullscreen.png"
                        alt="Close"
                        className="hover:scale-110 duration-500"
                    />
                </button>
            </div>
        </div>
    )
}

export default FullscreenView