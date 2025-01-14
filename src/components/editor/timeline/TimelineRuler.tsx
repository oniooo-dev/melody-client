import React, { useState, useCallback, useEffect } from 'react'
import { useEditorStore } from '@/store/useEditorStore'

interface TimelineRulerProps {
    duration: number
    zoomLevel: number
    scrollPosition: number
    visibleWidth: number
    intervalDuration: number
}

interface Marker {
    id: number
    time: number
    label?: string
}

const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const TimelineRuler: React.FC<TimelineRulerProps> = ({ duration, zoomLevel, scrollPosition, visibleWidth, intervalDuration }) => {

    const [markers, setMarkers] = useState<Marker[]>([])
    const currentTime = useEditorStore((state) => state.currentTime)
    const setCurrentTime = useEditorStore((state) => state.setCurrentTime)

    // Calculate the number of intervals based on zoom level
    const pixelsPerSecond = zoomLevel
    const totalWidthPixels = duration * pixelsPerSecond

    // Calculate visible time range
    const visibleStartTime = scrollPosition / pixelsPerSecond
    const visibleEndTime = (scrollPosition + visibleWidth) / pixelsPerSecond

    // Generate time markers
    const markersList: { time: number; position: number }[] = []
    const startMarker = Math.floor(visibleStartTime / intervalDuration) * intervalDuration
    const endMarker = Math.ceil(visibleEndTime / intervalDuration) * intervalDuration

    for (let time = startMarker; time <= endMarker; time += intervalDuration) {
        const position = (time * pixelsPerSecond) - scrollPosition
        if (position >= 0 && position <= visibleWidth) {
            markersList.push({
                time,
                position
            })
        }
    }

    // Handle adding a marker on double-click
    const handleDoubleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const time = clickX / (visibleWidth / duration)

        const newMarker: Marker = {
            id: Date.now(),
            time: Math.max(0, Math.min(time, duration)), // Clamp between 0 and duration
            label: `Marker ${markers.length + 1}`
        }

        setMarkers(prevMarkers => [...prevMarkers, newMarker])
    }, [visibleWidth, duration, markers.length])

    // Draggable Marker State
    const [isDragging, setIsDragging] = useState(false)
    const [dragStartX, setDragStartX] = useState(0)
    const [initialTime, setInitialTime] = useState(0)

    const handleMarkerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        setIsDragging(true)
        setDragStartX(e.clientX)
        setInitialTime(currentTime)
    }

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging) return
        const deltaX = e.clientX - dragStartX
        const deltaTime = deltaX / pixelsPerSecond
        let newTime = initialTime + deltaTime
        newTime = Math.max(0, Math.min(newTime, duration))
        setCurrentTime(newTime)
    }, [isDragging, dragStartX, initialTime, pixelsPerSecond, duration, setCurrentTime])

    const handleMouseUp = useCallback(() => {
        if (isDragging) {
            setIsDragging(false)
        }
    }, [isDragging])

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
        } else {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging, handleMouseMove, handleMouseUp])

    // Calculate marker position based on currentTime
    const markerPosition = (currentTime * pixelsPerSecond) - scrollPosition

    return (
        <div
            className="mb-2 h-6 relative border-b border-gray-700 cursor-pointer"
            style={{ width: `${duration * pixelsPerSecond}px` }}
            onDoubleClick={handleDoubleClick}
        >
            {/* Render Interval Markers */}
            {
                markersList.map(({ time, position }) => (
                    <div
                        key={`interval-${time}`}
                        className="absolute text-xs text-gray-400"
                        style={{
                            left: `${(position * 100) / visibleWidth}%`
                        }}
                    >
                        {formatTime(time)}
                    </div>
                ))
            }

            {/* Render Custom Markers */}
            {
                markers.map(marker => {
                    const position = (marker.time * pixelsPerSecond) - scrollPosition
                    if (position >= 0 && position <= visibleWidth) {
                        return (
                            <div
                                key={`marker-${marker.id}`}
                                className="absolute top-0 bottom-0 border-l-2 border-red-500"
                                style={{
                                    left: `${(position * 100) / visibleWidth}%`,
                                }}
                                title={marker.label || 'Marker'}
                            >
                                {/* Optional: Display Marker Label */}
                                {
                                    marker.label && (
                                        <div className="absolute -top-4 left-0 text-red-500 text-xs">
                                            {marker.label}
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                    return null
                })
            }

            {/* Draggable Current Time Marker */}
            <div
                className="absolute top-0 bottom-0 border-l-2 border-blue-500 cursor-pointer"
                style={{
                    left: `${(markerPosition * 100) / visibleWidth}%`,
                    zIndex: 9999
                }}
                onMouseDown={handleMarkerMouseDown}
            >
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-500 rounded-full" />
            </div>
        </div>
    )
}

export default TimelineRuler