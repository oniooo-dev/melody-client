import React from 'react'
import PlayButton from './buttons/PlayButton'
import PauseButton from './buttons/PauseButton'
import FullscreenButton from './buttons/FullscreenButton'
import SplitButton from './buttons/SplitButton'
import DeleteButton from './buttons/DeleteButton'
import { useEditorStore } from '@/store/useEditorStore'
import { formatTime } from '@/utils/utils'
import TimelineController from './timeline/TimelineController'

interface PlayerControlsProps {
    zoomLevel: number
    onZoomIn: () => void
    onZoomOut: () => void
}

const PlayerControls: React.FC<PlayerControlsProps> = ({ zoomLevel, onZoomIn, onZoomOut }) => {

    // Get the current time and duration from the editor store
    const currentTime = useEditorStore((state) => state.currentTime)
    const duration = useEditorStore((state) => state.duration)
    const isPlaying = useEditorStore((state) => state.isPlaying)
    const setIsPlaying = useEditorStore((state) => state.setIsPlaying)
    const isFullscreen = useEditorStore((state) => state.isFullscreen)
    const setIsFullscreen = useEditorStore((state) => state.setIsFullscreen)

    // Access the videoRef from the store
    const videoRef = useEditorStore((state) => state.videoRef)

    // Access the deleteSelectedClip method from the store
    const deleteSelectedClip = useEditorStore((state) => state.deleteSelectedClip)

    // Optional: Add confirmation before deletion
    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete the selected clip?");
        if (confirmDelete) {
            deleteSelectedClip();
        }
    }

    // Handle play/pause
    const handlePlayPause = async () => {

        // Check if the video element exists
        if (!videoRef.current) {
            console.error("Video element not found");
            return;
        }

        // Play or pause the video
        if (!isPlaying) {
            try {
                await videoRef.current.play();
                setIsPlaying(true);
            } catch (error) {
                console.error("Error attempting to play the video:", error);
            }
        }
        else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }

    // Handle fullscreen
    const handleFullscreen = () => {
        setIsFullscreen(!isFullscreen)
    }

    return (
        <div
            className='
                sticky top-0 flex flex-row w-full items-center justify-between 
                gap-2 px-4 py-2 
                bg-gray-200
            '
        >

            <div className="flex flex-row items-center w-full gap-3">

                {/* Clip tools */}
                <div className='flex flex-row items-center w-full gap-3'>
                    <SplitButton />
                    <DeleteButton />
                </div>

                <div className="w-full"></div>

            </div>

            {/* Player controls */}
            <div className='flex flex-row items-center justify-center gap-2'>

                {/* Play/Pause button */}
                {
                    isPlaying
                        ? <PauseButton onClick={handlePlayPause} />
                        : <PlayButton onClick={handlePlayPause} />
                }

                {/* Time display */}
                <p className='text-xs whitespace-nowrap'>
                    {
                        formatTime(currentTime)} / {formatTime(duration)
                    }
                </p>

            </div>

            <div className="flex flex-row items-center justify-between w-full gap-2">

                <div className="w-full"></div>

                <div className="w-full">
                    {/* Timeline Controller */}
                    <TimelineController
                        zoomLevel={zoomLevel}
                        onZoomIn={onZoomIn}
                        onZoomOut={onZoomOut}
                    />
                </div>

                {/* Fullscreen button */}
                <div className='flex flex-row items-center justify-end w-full gap-2'>
                    <FullscreenButton onFullscreen={handleFullscreen} />
                </div>
            </div>

        </div>
    )
}

export default PlayerControls