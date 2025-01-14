import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface ZoomSliderProps {
    min?: number;
    max?: number;
    step?: number;
    value: number;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onChange?: (newValue: number) => void;
}

const ZoomSlider: React.FC<ZoomSliderProps> = ({
    min = 20,
    max = 200,
    step = 5,
    value,
    onZoomIn,
    onZoomOut,
    onChange
}) => {

    // State to manage the dragging of the slider
    const [isDragging, setIsDragging] = useState<boolean>(false);

    // Reference to the slider element
    const sliderRef = useRef<HTMLDivElement>(null);

    // Calculate the range of the slider
    const range = max - min;

    const getValueFromPosition = useCallback((position: number) => {

        // If the slider is not found, return the minimum value
        if (!sliderRef.current) {
            return min;
        }

        // Get the bounding client rect of the slider
        const sliderRect = sliderRef.current.getBoundingClientRect();

        // Calculate the percentage of the slider that is being dragged
        const percentage = Math.max(0, Math.min(1, position / sliderRect.width));

        // Calculate the raw value of the slider
        const rawValue = percentage * range + min;

        // Round the raw value to the nearest step
        const steppedValue = Math.round(rawValue / step) * step;

        // Return the value clamped between the minimum and maximum values
        return Math.max(min, Math.min(max, steppedValue));
    }, [min, max, step, range]);

    // Handle mouse down
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!sliderRef.current) {
            return;
        }
        setIsDragging(true);
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging || !sliderRef.current) {
            return;
        }

        const sliderRect = sliderRef.current.getBoundingClientRect();
        const position = e.clientX - sliderRect.left;
        const newValue = getValueFromPosition(position);

        // Call onChange if provided
        if (onChange) {
            onChange(newValue);
        } else {
            // Fallback to onZoomIn/onZoomOut
            if (newValue > value) {
                onZoomIn();
            } else if (newValue < value) {
                onZoomOut();
            }
        }
    }, [isDragging, onZoomIn, onZoomOut, getValueFromPosition, value, onChange]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const percentage = ((value - min) / range) * 100;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        let newValue = value;

        switch (e.key) {
            case 'ArrowLeft':
            case 'ArrowDown':
                newValue = Math.max(min, value - step);
                onZoomOut();
                break;
            case 'ArrowRight':
            case 'ArrowUp':
                newValue = Math.min(max, value + step);
                onZoomIn();
                break;
            case 'Home':
                newValue = min;
                onZoomOut();
                break;
            case 'End':
                newValue = max;
                onZoomIn();
                break;
            default:
                return;
        }

        e.preventDefault();

        // Call onChange if provided
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className="flex items-center min-w-48 rounded-lg">

            {/* Zoom out button */}
            <button
                onClick={onZoomOut}
                className=""
            >
                <ZoomOut size={14} />
            </button>

            {/* Zoom slider */}
            <div
                ref={sliderRef}
                className="relative flex-1 h-[2px] flex items-center cursor-pointer px-2"
                onMouseDown={handleMouseDown}
            >

                {/* Track background */}
                <div className="absolute w-full h-[4px] bg-gray-300 rounded-full" />

                {/* Filled track */}
                <div
                    className="absolute h-[3px] bg-cyan-400 rounded-full"
                    style={{
                        width: `${percentage}%`,
                    }}
                />

                {/* Thumb */}
                {/* <div
                    role="slider"
                    aria-valuemin={min}
                    aria-valuemax={max}
                    aria-valuenow={value}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    className={`
                        absolute w-4 h-4 bg-white rounded-full shadow-lg transition-shadow 
                        hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800
                        ${isDragging ? 'shadow-xl' : ''}
                    `}
                    style={
                        {
                            left: `${percentage}%`,
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }
                    }
                /> */}
            </div>

            {/* Zoom in button */}
            <button
                onClick={onZoomIn}
                className="ml-4"
            >
                <ZoomIn size={14} />
            </button>

            {/* Zoom level display (optional) */}
            {/* <div className="text-sm text-gray-400 min-w-16 bg-gray-900 py-1 px-2 rounded-md text-center">
                {value}%
            </div> */}
        </div>
    );
};

export default ZoomSlider;