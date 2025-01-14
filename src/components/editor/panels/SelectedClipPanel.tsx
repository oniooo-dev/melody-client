import React, { useState, useEffect } from 'react'
import { useEditorStore } from '@/store/useEditorStore'
import AudioSelectedClip from './selected/AudioSelectedClip'
import VideoSelectedClip from './selected/VideoSelectedClip'
import { Transform } from '@/types/EditorTypes'
import ImageSelectedClip from './selected/ImageSelectedClip'
import TextSelectedClip from './selected/TextSelectedClip'
import CaptionSelectedClip from './selected/CaptionSelectedClip'
import StickerSelectedClip from './selected/StickerSelectedClip'

const videoTransformProps: Array<keyof Transform> = [
    'x',
    'y',
    'width',
    'height',
    'rotation',
    'scale',
    'opacity'
]

const SelectedClipPanel: React.FC = () => {

    // Access the selectedClip and setter from the store
    const selectedClip = useEditorStore((state) => state.selectedClip);
    const setSelectedClip = useEditorStore((state) => state.setSelectedClip);
    const selectedClipPanelRef = useEditorStore((state) => state.selectedClipPanelRef);

    // Local state for the input field
    const [clipName, setClipName] = useState<string>('');

    // Update local state when a new clip is selected
    useEffect(() => {
        if (selectedClip) {
            setClipName(selectedClip.name);
        } else {
            setClipName('');
        }
    }, [selectedClip]);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClipName(e.target.value);
    };

    // Handle input blur to update the store
    const handleBlur = () => {
        if (selectedClip && clipName.trim() !== '') {
            setSelectedClip({ ...selectedClip, name: clipName.trim() });
        }
    };

    if (!selectedClip) {
        return (
            <div className='p-4 bg-gray-100 rounded shadow'>
                <p className='text-gray-500'>No clip selected.</p>
            </div>
        );
    }

    return (
        <div
            ref={selectedClipPanelRef}
            className='flex flex-col w-full h-full p-2 text-black'
        >
            {
                {
                    'video':
                        <VideoSelectedClip
                            clipId={selectedClip.id}
                            clipName={clipName}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            videoTransformProps={videoTransformProps}
                            transform={selectedClip.transform}
                        />,
                    'image':
                        <ImageSelectedClip
                            clipId={selectedClip.id}
                            clipName={clipName}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            videoTransformProps={videoTransformProps}
                            transform={selectedClip.transform}
                        />,
                    'sticker':
                        <StickerSelectedClip
                            clipId={selectedClip.id}
                            clipName={clipName}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            videoTransformProps={videoTransformProps}
                            transform={selectedClip.transform}
                        />,
                    'audio':
                        <AudioSelectedClip
                            clipId={selectedClip.id}
                            clipName={clipName}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            videoTransformProps={videoTransformProps}
                            transform={selectedClip.transform}
                        />,
                    'text':
                        <TextSelectedClip
                            clipId={selectedClip.id}
                            clipName={clipName}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            videoTransformProps={videoTransformProps}
                            transform={selectedClip.transform}
                        />,
                    'caption':
                        <CaptionSelectedClip
                            clipId={selectedClip.id}
                            clipName={clipName}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            videoTransformProps={videoTransformProps}
                            transform={selectedClip.transform}
                        />
                }[selectedClip.type]
            }
        </div>
    );
};

export default SelectedClipPanel