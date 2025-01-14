import React from 'react'
import ZoomSlider from './controls/ZoomSlider'

interface TimelineControllerProps {
    zoomLevel: number
    onZoomIn: () => void
    onZoomOut: () => void
}

const TimelineController: React.FC<TimelineControllerProps> = ({ zoomLevel, onZoomIn, onZoomOut }) => {
    return (
        <div className="flex flex-row items-center w-full p-2 gap-4">
            <ZoomSlider
                value={zoomLevel}
                onZoomIn={onZoomIn}
                onZoomOut={onZoomOut}
            />
        </div>
    )
}

export default TimelineController