import React, { useEffect, RefObject } from 'react';
import { Clip } from '@/types/EditorTypes';
import { useEditorStore } from '@/store/useEditorStore';

interface EditMenuProps {
    clip: Clip;
    overlayRef: RefObject<HTMLDivElement | null>;
    editMenuRef: RefObject<HTMLDivElement | null>;
}

const EditMenu: React.FC<EditMenuProps> = ({ clip, overlayRef, editMenuRef }) => {

    // Store
    const setSelectedClip = useEditorStore((state) => state.setSelectedClip);
    const selectedClipPanelRef = useEditorStore((state) => state.selectedClipPanelRef);

    // Handle Animation
    const handleAnimation = () => {
        console.log('Animation');
    };

    // Handle Speed
    const handleSpeed = () => {
        console.log('Speed');
    };

    // Handle Volume
    const handleVolume = () => {
        console.log('Volume');
    };

    // Close EditMenu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                editMenuRef.current &&
                !editMenuRef.current.contains(event.target as Node) &&
                overlayRef.current &&
                !overlayRef.current.contains(event.target as Node) &&
                selectedClipPanelRef.current &&
                !selectedClipPanelRef.current.contains(event.target as Node)
            ) {
                setSelectedClip(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setSelectedClip]);

    return (
        <div
            ref={editMenuRef}
            className="
                flex flex-row items-center justify-center w-[20rem]
                mt-2 py-1 bg-white 
                rounded-lg shadow-xl
            "
        >
            <div
                className="
                    flex flex-row items-center justify-center 
                    gap-2 px-2
                    hover:bg-gray-200 rounded-lg
                "
            >
                <img src="/assets/editor/icons/animations.png" alt="Animation" className="w-4 h-4" />
                <button
                    onClick={handleAnimation}
                    className="text-sm py-1"
                >
                    Animation
                </button>
            </div>

            {/* Divider */}
            <span className="border-l border-gray-400 border-opacity-50 mx-2 h-5"></span>

            <div
                className="
                    flex flex-row items-center justify-center 
                    gap-2 px-2
                    hover:bg-gray-200 rounded-lg
                "
            >
                <img src="/assets/editor/icons/speed.png" alt="Speed" className="w-4 h-4" />
                <button
                    onClick={handleSpeed}
                    className="text-sm py-1"
                >
                    Speed
                </button>
            </div>

            {/* Divider */}
            <span className="border-l border-gray-400 border-opacity-50 mx-2 h-5"></span>

            <div
                className="
                    flex flex-row items-center justify-center 
                    gap-2 px-2
                    hover:bg-gray-200 rounded-lg
                "
            >
                <img src="/assets/editor/icons/volume.png" alt="Volume" className="w-4 h-4" />
                <button
                    onClick={handleVolume}
                    className="text-sm py-1"
                >
                    Volume
                </button>
            </div>

        </div>
    );
};

export default EditMenu;