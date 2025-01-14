/**
 * A Track is a list of clips.
*/

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Clip, Track } from '@/types/EditorTypes';
import ClipComponent from '../clips/ClipComponent';
import TrackHeader from './TrackHeader';
import TrackDeleteButton from '../../buttons/TrackDeleteButton';
import throttle from 'lodash.throttle';

interface TrackComponentProps {
    track: Track;
    onDeleteTrack: (id: number) => void;
    onClipClick: (trackId: number, clip: Clip) => void;
    zoomLevel: number;
    scrollPosition: number;
    visibleWidth: number;
    intervalDuration: number;
    onReorderClips: (
        sourceTrackId: number,
        sourceClipId: string,
        targetTrackId: number,
        targetClipId: string | null,
        position: 'before' | 'after'
    ) => void;
    onUpdateClipStart: (
        trackId: number,
        clipId: string,
        newStart: number
    ) => void;
}

const TrackComponent: React.FC<TrackComponentProps> = ({
    track,
    onDeleteTrack,
    onClipClick,
    zoomLevel,
    scrollPosition,
    visibleWidth,
    intervalDuration,
    onReorderClips,
    onUpdateClipStart
}) => {

    const [draggedClip, setDraggedClip] = useState<{ clipId: string; trackId: number } | null>(null);
    const [shadowBox, setShadowBox] = useState<{ translateX: number; width: number } | null>(null);
    const [initialStart, setInitialStart] = useState<number | null>(null);
    const [initialCursorX, setInitialCursorX] = useState<number | null>(null);

    // Ref to store the animation frame ID
    const animationFrameRef = useRef<number | null>(null);

    // Throttled function to handle dragOver with adjusted translateX
    const throttledUpdateShadowBox = useCallback(
        throttle((deltaX: number, newStart: number, clipWidth: number) => {
            // Adjust translateX by subtracting scrollPosition to align with the visible area
            const translateX = newStart * zoomLevel - scrollPosition;

            // Ensure translateX is non-negative
            const adjustedTranslateX = Math.max(translateX, 0);

            // Use requestAnimationFrame for smoother updates
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            animationFrameRef.current = requestAnimationFrame(() => {
                console.log('Setting shadowBox:', { translateX: adjustedTranslateX, width: clipWidth });
                setShadowBox({
                    translateX: adjustedTranslateX,
                    width: clipWidth,
                });
            });
        }, 16),
        [zoomLevel, scrollPosition]
    );

    const handleDragStart = (clipId: string, trackId: number) => {
        console.log('Drag started:', clipId, trackId);
        setDraggedClip({ clipId, trackId });

        // Find the dragged clip's initial start position
        const draggedClipData = track.clips.find(c => c.id === clipId);
        if (draggedClipData) {
            console.log('Initial start time:', draggedClipData.startTime);
            setInitialStart(draggedClipData.startTime);
        }
    }

    const handleDragEnd = useCallback(() => {
        console.log('Drag ended');
        setDraggedClip(null);
        setShadowBox(null);
        setInitialStart(null);
        setInitialCursorX(null);

        // Cancel any pending animation frames
        if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
        }
    }, []);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (!draggedClip || initialStart === null) {
            console.log('No dragged clip or initial start position not set');
            return;
        }

        const { clipId: sourceClipId, trackId: sourceTrackId } = draggedClip;

        // Calculate cursorX relative to the track
        const trackRect = e.currentTarget.getBoundingClientRect();
        const currentCursorX = e.clientX - trackRect.left;

        // Initialize initialCursorX on the first dragOver event
        if (initialCursorX === null) {
            setInitialCursorX(currentCursorX);
            return;
        }

        // Calculate cumulative delta movement
        const deltaX = currentCursorX - (initialCursorX || 0);
        const deltaStart = deltaX / zoomLevel;
        let newStart = initialStart + deltaStart;

        // Ensure newStart is non-negative
        newStart = Math.max(newStart, 0);

        // Retrieve the dragged clip's duration for shadow box width
        const draggedClipData = track.clips.find(c => c.id === sourceClipId);
        const clipWidth = draggedClipData ? draggedClipData.duration * zoomLevel : 50; // Default width if not found

        // Throttle the shadow box update with adjusted translateX
        throttledUpdateShadowBox(deltaX, newStart, clipWidth);
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (!draggedClip || initialStart === null) {
            console.log('No dragged clip or initial start position not set');
            return;
        }

        const { clipId: sourceClipId, trackId: sourceTrackId } = draggedClip;

        // Calculate cursorX relative to the track
        const trackRect = e.currentTarget.getBoundingClientRect();
        const cursorX = e.clientX - trackRect.left;

        let newStart: number;

        if (sourceTrackId === track.id) {
            // Dragging within the same track
            if (initialCursorX === null || initialStart === null) {
                console.log('Initial cursor position or start not set');
                return;
            }

            // Calculate cumulative movement
            const deltaX = cursorX - (initialCursorX || 0);
            const deltaStart = deltaX / zoomLevel;
            newStart = initialStart + deltaStart;

            // Ensure newStart is non-negative
            newStart = Math.max(newStart, 0);

            // Update the clip's start position
            onUpdateClipStart(track.id, sourceClipId, newStart);
        }
        else {
            // Dragging across different tracks; determine position relative to target clips
            let closestClip: Clip | null = null;
            let minDistance = Infinity;

            for (let clip of track.clips) {
                const clipStartPx = clip.startTime * zoomLevel;
                const clipEndPx = clipStartPx + clip.duration * zoomLevel;
                const clipMidPoint = (clipStartPx + clipEndPx) / 2;
                const distance = Math.abs(cursorX - clipMidPoint);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestClip = clip;
                }
            }

            let position: 'before' | 'after' = 'after';
            let targetClipId: string | null = null;

            if (closestClip) {
                const clipStartPx = closestClip.startTime * zoomLevel;
                const clipEndPx = clipStartPx + closestClip.duration * zoomLevel;
                const clipMidPoint = (clipStartPx + clipEndPx) / 2;

                if (cursorX < clipMidPoint) {
                    position = 'before';
                } else {
                    position = 'after';
                }

                targetClipId = closestClip.id;
            }

            onReorderClips(
                sourceTrackId,
                sourceClipId,
                track.id,
                targetClipId,
                position
            );
        }

        // Reset states after drop
        setShadowBox(null);
        setDraggedClip(null);
        setInitialStart(null);
        setInitialCursorX(null);

        // Cancel any pending animation frames
        if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
        }
    }

    const handleDragLeave = () => {
        console.log('Drag left the track area');
        setShadowBox(null);
    }

    // Optional: Listen to global dragend to ensure state is reset
    useEffect(() => {
        const handleGlobalDragEnd = () => {
            if (draggedClip) {
                console.log('Global drag end');
                handleDragEnd();
            }
        };

        window.addEventListener('dragend', handleGlobalDragEnd);
        return () => {
            window.removeEventListener('dragend', handleGlobalDragEnd);
        };
    }, [draggedClip, handleDragEnd]);

    return (
        <div
            className="
                group relative flex flex-row items-center justify-center 
                gap-2
            "
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >

            {/* Track header */}
            {/* <div className="">
                <TrackHeader track={track} />
                <TrackDeleteButton trackId={track.id} />
            </div> */}

            {/* Shadow Box */}
            {
                // Only show the shadow box if it exists (i.e., the user is dragging a clip)
                shadowBox && (
                    <div
                        className="absolute top-0 bg-blue-500 opacity-50 pointer-events-none transition-transform duration-100 ease-linear"
                        style={{
                            transform: `translateX(${shadowBox.translateX}px)`,
                            width: `${shadowBox.width}px`,
                            height: '100%', // Ensure the shadow box covers the entire height of the track
                            zIndex: 20, // Increased z-index to ensure it's above other elements
                            border: '2px dashed blue', // Changed to dashed for better visibility
                            borderRadius: '4px',
                        }}
                    />
                )
            }

            {/* Track clips */}
            <div
                className="
                    relative w-full h-12 bg-gray-800 rounded cursor-pointer overflow-hidden
                "
            >

                {/* Track container */}
                <div
                    className="absolute top-0 bottom-0"
                    style={{
                        width: `${zoomLevel * 30}px`,
                        transform: `translateX(-${scrollPosition}px)`
                    }}
                >
                    {
                        track.clips.map((clip) => (
                            <ClipComponent
                                key={clip.id}
                                trackId={track.id}
                                clip={clip}
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                zoomLevel={zoomLevel}
                                onClipClick={onClipClick}
                                onUpdateClip={(updatedClip) => {
                                    // Implement the updateClip function here
                                }}
                            />
                        ))
                    }
                </div>

            </div>
        </div>
    );
}

export default React.memo(TrackComponent);