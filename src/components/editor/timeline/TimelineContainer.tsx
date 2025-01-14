/**
 * The TimelineContainer component is the main container for the timeline.
*/

import React, { useEffect, useRef, useState, useCallback } from "react"
import TimelineRuler from "./TimelineRuler"
import TrackComponent from "./tracks/TrackComponent"
import { useEditorStore } from "@/store/useEditorStore"

const TimelineContainer: React.FC = () => {

    // Get the tracks and state methods from the editor store
    const tracks = useEditorStore((state) => state.tracks)
    const setTracks = useEditorStore((state) => state.setTracks)

    // Get the selected clip and setSelectedClip function from the editor store
    const selectedClip = useEditorStore((state) => state.selectedClip)
    const setSelectedClip = useEditorStore((state) => state.setSelectedClip)

    // Get the zoom level from the editor store
    const zoomLevel = useEditorStore((state) => state.zoomLevel)
    const setZoomLevel = useEditorStore((state) => state.setZoomLevel)

    // Scroll position
    const [scrollPosition, setScrollPosition] = useState<number>(0);

    // Visible width
    const [visibleWidth, setVisibleWidth] = useState<number>(60);

    // Timeline duration
    const [timelineDuration, setTimelineDuration] = useState<number>(50);

    // Interval duration
    const [intervalDuration, setIntervalDuration] = useState<number>(5);

    // Reference to the scrollable container
    const scrollableContainerRef = useRef<HTMLDivElement>(null);

    // Marker State
    const markerRef = useRef<HTMLDivElement>(null);
    const markerPositionRef = useRef<number>(0); // Ref to store the latest marker position
    const [markerPosition, setMarkerPosition] = useState<number>(0); // State for rendering
    const isDragging = useRef<boolean>(false);
    const dragStartX = useRef<number>(0);
    const initialMarkerPos = useRef<number>(0);

    // Tooltip State
    const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
    const [tooltipPosition, setTooltipPosition] = useState<number>(0);

    // Animation frame ID
    const animationFrameId = useRef<number | null>(null);

    // Define the handleKeyDown function
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        switch (e.key) {
            case 'ArrowLeft':
                setMarkerPosition(prev => Math.max(0, prev - intervalDuration));
                break;
            case 'ArrowRight':
                setMarkerPosition(prev => Math.min(timelineDuration, prev + intervalDuration));
                break;
            case 'Home':
                setMarkerPosition(0);
                break;
            case 'End':
                setMarkerPosition(timelineDuration);
                break;
            default:
                break;
        }
    };

    // Handle scroll
    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        if (scrollableContainerRef.current) {
            setScrollPosition(scrollableContainerRef.current.scrollLeft);
        }
    }, []);

    useEffect(() => {
        if (scrollableContainerRef.current) {
            setScrollPosition(scrollableContainerRef.current.scrollLeft);
        }
    }, [scrollableContainerRef.current]);

    // Update visibleWidth and timelineDuration when zoomLevel changes
    useEffect(() => {
        setVisibleWidth(60 * zoomLevel);
        setTimelineDuration(50 * zoomLevel);
        setIntervalDuration(5 * zoomLevel);
    }, [zoomLevel]);

    // Snapping function
    const snapToInterval = (position: number): number => {
        const remainder = position % intervalDuration;
        if (remainder < intervalDuration / 2) {
            return position - remainder;
        }
        return position + (intervalDuration - remainder);
    }

    // Handle Mouse Move with requestAnimationFrame
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging.current) return;
        const deltaX = e.clientX - dragStartX.current;
        let newPos = initialMarkerPos.current + deltaX + scrollPosition;
        newPos = snapToInterval(newPos);
        // Constrain marker within timeline
        const maxPos = timelineDuration;
        const clampedPos = Math.max(0, Math.min(newPos, maxPos));

        // Update the ref
        markerPositionRef.current = clampedPos;

        // Schedule the state update
        if (animationFrameId.current === null) {
            animationFrameId.current = requestAnimationFrame(() => {
                setMarkerPosition(markerPositionRef.current);
                setTooltipPosition(markerPositionRef.current);
                animationFrameId.current = null;
            });
        }
    }, [scrollPosition, timelineDuration, intervalDuration]);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (!isDragging.current) return;
        const deltaX = e.touches[0].clientX - dragStartX.current;
        let newPos = initialMarkerPos.current + deltaX + scrollPosition;
        newPos = snapToInterval(newPos);
        // Constrain marker within timeline
        const maxPos = timelineDuration;
        const clampedPos = Math.max(0, Math.min(newPos, maxPos));

        // Update the ref
        markerPositionRef.current = clampedPos;

        // Schedule the state update
        if (animationFrameId.current === null) {
            animationFrameId.current = requestAnimationFrame(() => {
                setMarkerPosition(markerPositionRef.current);
                setTooltipPosition(markerPositionRef.current);
                animationFrameId.current = null;
            });
        }
    }, [scrollPosition, timelineDuration, intervalDuration]);

    // Clean up any pending animation frames on unmount
    useEffect(() => {
        return () => {
            if (animationFrameId.current !== null) {
                cancelAnimationFrame(animationFrameId.current);
            }
        }
    }, []);

    // Drag Handlers
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        isDragging.current = true;
        dragStartX.current = e.clientX;
        initialMarkerPos.current = markerPosition;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        setTooltipVisible(true);
    }

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        isDragging.current = true;
        dragStartX.current = e.touches[0].clientX;
        initialMarkerPos.current = markerPosition;
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
        setTooltipVisible(true);
    }

    const handleMouseUp = useCallback(() => {
        isDragging.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        setTooltipVisible(false);
    }, [handleMouseMove]);

    const handleTouchEnd = useCallback(() => {
        isDragging.current = false;
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        setTooltipVisible(false);
    }, [handleTouchMove]);

    // Function to handle updating clip start
    const handleUpdateClipStart = useCallback((trackId: number, clipId: string, newStart: number) => {
        useEditorStore.getState().onUpdateClipStart(trackId, clipId, newStart);
    }, []);

    // Function to reorder clips
    const handleReorderClips = useCallback(
        (sourceTrackId: number, sourceClipId: string, targetTrackId: number, targetClipId: string | null, position: 'before' | 'after') => {
            useEditorStore.getState().onReorderClips(sourceTrackId, sourceClipId, targetTrackId, targetClipId, position);
        },
        []
    );

    return (
        <div className="relative flex flex-col w-full overflow-x-scroll">

            {/* Marker */}
            <div
                ref={markerRef}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onKeyDown={handleKeyDown}
                tabIndex={0} // Make it focusable for keyboard events
                className="absolute top-0 bottom-0 w-[2px] bg-red-500 cursor-pointer z-20"
                style={{
                    transform: `translateX(${markerPosition - scrollPosition}px)`,
                    willChange: 'transform',
                }}
                aria-label="Timeline Marker"
                role="slider"
                aria-valuenow={markerPosition}
                aria-valuemin={0}
                aria-valuemax={timelineDuration}
            >
                {/* Tooltip */}
                {tooltipVisible && (
                    <div
                        className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded"
                        style={{ transform: `translateX(-50%) translateX(${markerPosition - scrollPosition}px)` }}
                    >
                        {`Time: ${markerPosition}s`}
                    </div>
                )}
            </div>

            <div
                className="relative flex flex-col w-full h-full gap-2"
                onWheel={handleScroll}
            >

                {/* Scrollable tracks area */}
                <div
                    ref={scrollableContainerRef}
                    className="
                        flex flex-col
                        gap-2
                        overflow-x-auto overflow-y-hidden whitespace-nowrap
                        relative
                    "
                    onScroll={handleScroll}
                    style={{
                        width: `${timelineDuration}px`
                    }}
                >
                    {
                        tracks.map(
                            (track, index) => (
                                <TrackComponent
                                    key={track.id}
                                    track={track}
                                    zoomLevel={zoomLevel}
                                    scrollPosition={scrollPosition}
                                    visibleWidth={visibleWidth}
                                    intervalDuration={intervalDuration}
                                    onUpdateClipStart={handleUpdateClipStart}
                                    onReorderClips={handleReorderClips}
                                    onDeleteTrack={(id) => {
                                        // Implement track deletion if necessary
                                    }}
                                    onClipClick={(trackId, clip) => {
                                        // Implement clip click handler if necessary
                                    }}
                                />
                            )
                        )
                    }
                </div>

                {/* Ruler */}
                <TimelineRuler
                    duration={timelineDuration}
                    zoomLevel={zoomLevel}
                    scrollPosition={scrollPosition}
                    visibleWidth={visibleWidth}
                    intervalDuration={intervalDuration}
                />

            </div>
        </div>
    )
}

export default TimelineContainer