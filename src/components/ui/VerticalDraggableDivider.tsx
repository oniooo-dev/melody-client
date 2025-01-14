/**
 * Horizontal Draggable Line Component
 */

import React from 'react';

interface VerticalDraggableDividerProps {
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void
}

const VerticalDraggableDivider: React.FC<VerticalDraggableDividerProps> = ({
    onMouseDown,
}) => {
    return (
        <div
            className="w-2 opacity-0 hover:opacity-100 hover:bg-cyan-300 duration-300 cursor-col-resize"
            onMouseDown={onMouseDown}
        />
    );
};

export default VerticalDraggableDivider;