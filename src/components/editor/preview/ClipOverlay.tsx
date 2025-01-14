import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Clip } from '@/types/EditorTypes';
import { useEditorStore } from '@/store/useEditorStore';
import EditMenu from './EditMenu';

interface ClipOverlayProps {
    clip: Clip;
    zoomLevel: number;
}

const ClipOverlay: React.FC<ClipOverlayProps> = ({ clip, zoomLevel }) => {

    // Accessing store state and actions
    const selectedClip = useEditorStore((state) => state.selectedClip);
    const setSelectedClip = useEditorStore((state) => state.setSelectedClip);
    const updateClipTransform = useEditorStore((state) => state.updateClipTransform);

    // Determine if the current clip is selected
    const isSelected = selectedClip?.id === clip.id;

    // Refs for the overlay and edit menu
    const overlayRef = useRef<HTMLDivElement>(null);
    const editMenuRef = useRef<HTMLDivElement>(null);

    // Refs for dragging state
    const isDragging = useRef<boolean>(false);
    const dragStartX = useRef<number>(0);
    const dragStartY = useRef<number>(0);
    const initialX = useRef<number>(clip.transform.x);
    const initialY = useRef<number>(clip.transform.y);

    // Refs for resizing state
    const isResizing = useRef<boolean>(false);
    const resizingDirection = useRef<'left' | 'right' | null>(null);
    const resizeStartX = useRef<number>(0);
    const initialWidth = useRef<number>(clip.transform.width);

    // Handle selecting the clip
    const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setSelectedClip(clip);
    };

    // Handle the dragging movement
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging.current) {
            const deltaX = e.clientX - dragStartX.current;
            const deltaY = e.clientY - dragStartY.current;

            const newX = initialX.current + deltaX;
            const newY = initialY.current + deltaY;

            // Update the clip's transform in the store
            updateClipTransform(clip.id, { x: newX, y: newY });
        }

        if (isResizing.current) {
            const deltaX = e.clientX - resizeStartX.current;

            if (resizingDirection.current === 'right') {
                const newWidth = Math.max(50, initialWidth.current + deltaX / zoomLevel);
                updateClipTransform(clip.id, { width: newWidth });
            } else if (resizingDirection.current === 'left') {
                const newWidth = Math.max(50, initialWidth.current - deltaX / zoomLevel);
                const newX = initialX.current + deltaX;
                updateClipTransform(clip.id, { width: newWidth, x: newX });
            }
        }
    }, [updateClipTransform, clip.id, zoomLevel]);

    // Handle ending the drag or resize
    const handleMouseUp = useCallback(() => {
        isDragging.current = false;
        if (isResizing.current) {
            isResizing.current = false;
            resizingDirection.current = null;
        }
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);

    // Handle initiating the drag
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        isDragging.current = true;
        dragStartX.current = e.clientX;
        dragStartY.current = e.clientY;
        initialX.current = clip.transform.x;
        initialY.current = clip.transform.y;

        // Attach event listeners to handle dragging
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    // Handle initiating the resize
    const handleResizeMouseDown = (direction: 'left' | 'right') => (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();
        isResizing.current = true;
        resizingDirection.current = direction;
        resizeStartX.current = e.clientX;
        initialWidth.current = clip.transform.width;
        initialX.current = clip.transform.x;

        // Attach event listeners to handle resizing
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    // Cleanup event listeners on unmount
    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    // Calculate overlay positioning
    const overlayStyle: React.CSSProperties = {
        width: `${clip.transform.width}px`,
        height: `${clip.transform.height}px`,
        backgroundColor: clip.color,
        opacity: clip.transform.opacity / 100,
        transform: `
            translate(-50%, -50%) 
            translate(${clip.transform.x}px, ${clip.transform.y}px) 
            scale(${clip.transform.scale}) 
            rotate(${clip.transform.rotation}deg)
        `,
        position: 'absolute',
        top: '50%',
        left: `${clip.startTime * zoomLevel}px`,
        zIndex: isSelected ? 10 : 5,
        transition: 'transform 0.1s linear, left 0.1s linear',
        cursor: isDragging.current ? 'grabbing' : 'grab',
        border: isSelected ? '2px solid purple' : '2px solid transparent',
    };

    return (
        <>
            {/* Clip Overlay */}
            <div
                ref={overlayRef}
                onClick={handleSelect}
                onMouseDown={handleMouseDown}
                className="absolute bg-opacity-50 hover:bg-black"
                style={overlayStyle}
            >
                {/* Optional: Add content inside the overlay if needed */}

                {/* Resizer Handles */}
                {isSelected && (
                    <>
                        {/* Left Resizer */}
                        <div
                            onMouseDown={handleResizeMouseDown('left')}
                            className="absolute left-0 top-0 w-3 h-full cursor-ew-resize bg-transparent"
                            style={{ zIndex: 20 }}
                        ></div>

                        {/* Right Resizer */}
                        <div
                            onMouseDown={handleResizeMouseDown('right')}
                            className="absolute right-0 top-0 w-3 h-full cursor-ew-resize bg-transparent"
                            style={{ zIndex: 20 }}
                        ></div>
                    </>
                )}
            </div>

            {/* Edit Menu */}
            {
                isSelected && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '-50px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 20,
                        }}
                    >
                        <EditMenu
                            clip={clip}
                            overlayRef={overlayRef}
                            editMenuRef={editMenuRef}
                        />
                    </div>
                )
            }
        </>
    );
};

export default ClipOverlay;