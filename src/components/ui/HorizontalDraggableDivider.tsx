/**
 * Horizontal Draggable Line Component with Expanded Hover Area
 */

import React from 'react';

interface HorizontalDraggableDividerProps {
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
    onTouchStart?: React.TouchEventHandler<HTMLDivElement>;
}

const HorizontalDraggableDivider: React.FC<HorizontalDraggableDividerProps> = ({ onMouseDown, onTouchStart }) => {
    return (
        <div className='group relative h-2 cursor-row-resize'>
            <div
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className="
                    absolute bottom-0 left-0 right-0 h-1 
                    bg-cyan-300 opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300 
                    cursor-row-resize
                "
            />
        </div>
    );
};

export default HorizontalDraggableDivider;