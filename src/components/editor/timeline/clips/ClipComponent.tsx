import React, { useState, useRef, useEffect } from 'react'
import { Clip } from '@/types/EditorTypes'
import { useEditorStore } from '@/store/useEditorStore';

interface ClipComponentProps {
    trackId: number
    clip: Clip
    onDragStart: (clipId: string, trackId: number) => void;
    onDragEnd: () => void;
    zoomLevel: number
    onClipClick: (trackId: number, clip: Clip) => void;
    onUpdateClip: (updatedClip: Clip) => void;
}

const ClipComponent: React.FC<ClipComponentProps> = ({
    trackId,
    clip,
    onDragStart,
    onDragEnd,
    zoomLevel,
    onClipClick,
    onUpdateClip
}) => {

    const {
        selectedClip,
        setSelectedClip,
        selectedTool,
        setSelectedTool
    } = useEditorStore();

    const isSelected = selectedClip?.id === clip.id;

    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState<'left' | 'right' | null>(null);
    const startXRef = useRef<number>(0);
    const startDurationRef = useRef<number>(clip.duration);
    const startStartTimeRef = useRef<number>(clip.startTime);

    const handleDragStartEvent = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('clipId', clip.id.toString());
        e.dataTransfer.setData('trackId', trackId.toString());
        onDragStart(clip.id, trackId);
    }

    const handleDragEndEvent = () => {
        console.log('Clip drag ended');
        onDragEnd();
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, direction: 'left' | 'right') => {
        e.stopPropagation();
        setIsResizing(true);
        setResizeDirection(direction);
        startXRef.current = e.clientX;
        startDurationRef.current = clip.duration;
        startStartTimeRef.current = clip.startTime;
    }

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing || !resizeDirection) return;

            const deltaX = e.clientX - startXRef.current;
            const deltaTime = deltaX / zoomLevel;

            if (resizeDirection === 'right') {
                const newDuration = Math.max(0.1, startDurationRef.current + deltaTime);
                onUpdateClip({ ...clip, duration: newDuration });
            } else if (resizeDirection === 'left') {
                const newStartTime = startStartTimeRef.current + deltaTime;
                const newDuration = Math.max(0.1, startDurationRef.current - deltaTime);
                if (newDuration > 0) {
                    onUpdateClip({ ...clip, startTime: newStartTime, duration: newDuration });
                }
            }
        }

        const handleMouseUp = () => {
            if (isResizing) {
                setIsResizing(false);
                setResizeDirection(null);
            }
        }

        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            if (isResizing) {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            }
        }
    }, [isResizing, resizeDirection, zoomLevel, clip, onUpdateClip]);

    return (
        <div
            draggable
            onDragStart={handleDragStartEvent}
            onDragEnd={handleDragEndEvent}
            onClick={() => {
                const selected: Clip = { ...clip, trackId };
                setSelectedClip(selected);
                setSelectedTool('SelectedClip');
                onClipClick(trackId, clip);
            }}
            className={`
                relative
                h-full rounded opacity-80 hover:opacity-100 
                text-white cursor-move transition-all duration-200 ease-in-out
                ${isSelected ? 'border-2 border-black' : ''}
                will-change: transform
            `}
            style={{
                transform: `translateX(${clip.startTime * zoomLevel}px)`,
                width: `${clip.duration * zoomLevel}px`,
                position: 'absolute',
                backgroundColor: clip.color,
            }}
        >
            <div
                className="absolute left-0 top-0 w-2 h-full cursor-ew-resize"
                onMouseDown={(e) => handleMouseDown(e, 'left')}
            ></div>

            <div
                className="absolute right-0 top-0 w-2 h-full cursor-ew-resize"
                onMouseDown={(e) => handleMouseDown(e, 'right')}
            ></div>

            <div className="text-xs p-1 truncate">{clip.name}</div>
        </div>
    )
}

// Use React.memo to prevent unnecessary re-renders
export default React.memo(ClipComponent);