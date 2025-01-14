/**
 * Main Component for the Video Editor
*/

import React, { useState, useEffect, useRef, useCallback } from 'react'
import TimelineContainer from './timeline/TimelineContainer'
import AIAssistantPanel from './AIAssistantPanel'
import ToolBar from './ToolBar'
import ToolPanel from './ToolPanel'
import HorizontalDraggableDivider from '../ui/HorizontalDraggableDivider'
import PreviewPanel from './PreviewPanel'
import PlayerControls from './PlayerControls'
import { useEditorStore } from '@/store/useEditorStore'

const SCALING_FACTOR = 1.5; // Adjust this value for desired sensitivity

const VideoEditor: React.FC = () => {

    // Accessing global state from the editor store
    const {
        tracks,
        selectedClip,
        setSelectedClip,
        selectedTool,
        setSelectedTool,
        zoomLevel,
        setZoomLevel,
        currentTime,
        setCurrentTime,
        isPlaying,
        setIsPlaying,
        duration,
        setDuration
    } = useEditorStore();

    /**
     * Zoom in and out
    */

    // Handle zoom in
    const handleZoomIn = () => {
        setZoomLevel(Math.min(zoomLevel * 1.5, 200));
    };

    // Handle zoom out
    const handleZoomOut = () => {
        setZoomLevel(Math.max(zoomLevel / 1.5, 50));
    };

    /**
     * Video playback
    */

    // Reference to the video element
    const videoRef = useEditorStore((state) => state.videoRef);

    // Sync video currentTime with the store's currentTime
    useEffect(() => {
        if (videoRef.current) {
            if (Math.abs(videoRef.current.currentTime - currentTime) > 0.1) {
                videoRef.current.currentTime = currentTime
            }
        }
    }, [currentTime])

    // Update store's currentTime based on video playback
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime)
        }

        video.addEventListener('timeupdate', handleTimeUpdate)

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [setCurrentTime])

    // Control video playback based on isPlaying state
    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play()
            }
            else {
                videoRef.current.pause()
            }
        }
    }, [isPlaying])

    // Set video duration once metadata is loaded
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleLoadedMetadata = () => {
            setDuration(video.duration)
        }

        video.addEventListener('loadedmetadata', handleLoadedMetadata)

        return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata)
        }
    }, [setDuration])

    // Update isPlaying state when video ends
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleEnded = () => {
            setIsPlaying(false)
        }

        video.addEventListener('ended', handleEnded)

        return () => {
            video.removeEventListener('ended', handleEnded)
        }
    }, [setIsPlaying])

    /**
     * Preview height
    */

    const [previewHeight, setPreviewHeight] = useState<number>(1000);

    // State to manage dragging
    const draggingState = useRef({
        isDragging: false,
        startY: 0,
        startPreviewHeight: previewHeight,
        animationFrame: 0 as number | null
    });

    // Ref to the main container to get its height
    const containerRef = useRef<HTMLDivElement>(null);

    /**
     * Handle window resize to adjust preview height
     */
    useEffect(() => {

        const handleResize = () => {
            if (!containerRef.current) {
                return;
            }

            // Get the container height
            const containerHeight = containerRef.current.clientHeight;
            console.log(`Handling resize: containerHeight=${containerHeight}`);

            // Define the minimum and maximum height for the preview
            const minHeight = 300;
            // const maxHeight = containerHeight;
            const maxHeight = 400;

            setPreviewHeight(prevHeight => Math.max(minHeight, Math.min(prevHeight, maxHeight)));
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial adjustment

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Consistent empty dependency array

    /**
     * Handle mouse/touch move during dragging
     */
    const handleMove = useCallback((clientY: number) => {
        if (!draggingState.current.isDragging || !containerRef.current) {
            return;
        }

        const containerHeight = containerRef.current.clientHeight;
        const deltaY = clientY - draggingState.current.startY;
        const scaledDeltaY = deltaY * SCALING_FACTOR;
        const newPreviewHeight = draggingState.current.startPreviewHeight + scaledDeltaY;

        console.log(`Drag Move: deltaY=${deltaY}, scaledDeltaY=${scaledDeltaY}, newPreviewHeight=${newPreviewHeight}`);

        const minHeight = 100;
        const maxHeight = containerHeight; // Adjust as needed

        if (newPreviewHeight >= minHeight && newPreviewHeight <= maxHeight) {
            setPreviewHeight(newPreviewHeight);
        }
    }, []);

    /**
     * Animation frame loop for smoother updates
     */
    const animate = useCallback((e: MouseEvent | TouchEvent) => {
        let clientY: number;

        if ('touches' in e && e.touches.length > 0) {
            clientY = e.touches[0].clientY;
        } else if ('clientY' in e) {
            clientY = e.clientY;
        } else {
            return;
        }

        if (draggingState.current.animationFrame) {
            cancelAnimationFrame(draggingState.current.animationFrame);
        }

        draggingState.current.animationFrame = requestAnimationFrame(() => handleMove(clientY));
    }, [handleMove]);

    /**
     * Handle mouse/touch up to stop dragging
     */
    const handleEnd = useCallback(() => {
        if (draggingState.current.animationFrame) {
            cancelAnimationFrame(draggingState.current.animationFrame);
            draggingState.current.animationFrame = 0;
        }
        draggingState.current.isDragging = false;
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto';

        window.removeEventListener('mousemove', animate as any);
        window.removeEventListener('mouseup', handleEnd);
        window.removeEventListener('touchmove', animate as any);
        window.removeEventListener('touchend', handleEnd);
        window.removeEventListener('touchcancel', handleEnd);
    }, [animate]);

    /**
     * Handle mouse/touch down to start dragging
     */
    const handleStart = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        e.preventDefault();

        let clientY: number;
        if ('touches' in e && e.touches.length > 0) {
            clientY = e.touches[0].clientY;
        } else if ('clientY' in e) {
            clientY = e.clientY;
        } else {
            return;
        }

        draggingState.current.isDragging = true;
        draggingState.current.startY = clientY;
        draggingState.current.startPreviewHeight = previewHeight;

        document.body.style.cursor = 'row-resize';
        document.body.style.userSelect = 'none';

        window.addEventListener('mousemove', animate);
        window.addEventListener('mouseup', handleEnd);
        window.addEventListener('touchmove', animate);
        window.addEventListener('touchend', handleEnd);
        window.addEventListener('touchcancel', handleEnd);
    }, [animate, handleEnd, previewHeight]);

    /**
     * Handle tool selection
     */
    const handleToolSelect = (tool: string) => {
        setSelectedTool(tool);
    };

    return (
        <div
            ref={containerRef}
            className='flex flex-row bg-blue-500 h-full'
        >

            {/* ToolBar */}
            <div className='flex-shrink-0 w-fit'>
                <ToolBar
                    selectedTool={selectedTool}
                    onToolSelect={handleToolSelect}
                />
            </div>

            {/* ToolPanel */}
            <div className='flex-shrink-0 w-96'>
                <ToolPanel
                    selectedTool={selectedTool}
                />
            </div>

            {/* Preview and Timeline Section */}
            <div className='flex flex-col w-[50vw] h-full'>

                {/* Preview Panel */}
                <div
                    style={{
                        height: `${previewHeight}px`
                    }}
                >
                    <PreviewPanel />
                </div>

                {/* Draggable Divider */}
                <HorizontalDraggableDivider
                    onMouseDown={handleStart}
                    onTouchStart={handleStart}
                />

                {/* Player Controls */}
                <div
                    className='flex-shrink-0 bg-gray-200'
                >
                    <PlayerControls
                        zoomLevel={zoomLevel}
                        onZoomIn={handleZoomIn}
                        onZoomOut={handleZoomOut}
                    />
                </div>

                {/* Timeline Container */}
                <div
                    className='bg-gray-300'
                >
                    <TimelineContainer />
                </div>

            </div>

            {/* AI Assistant Panel */}
            <div className='w-full'>
                <AIAssistantPanel />
            </div>

        </div>
    );
};

export default VideoEditor