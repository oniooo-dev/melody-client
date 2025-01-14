import React from 'react'
import { useEditorStore } from '@/store/useEditorStore'

const DeleteButton = () => {

    // Get the selected clip
    const selectedClip = useEditorStore((state) => state.selectedClip)

    // Delete the selected clip
    const deleteSelectedClip = useEditorStore((state) => state.deleteSelectedClip)

    // Handle click
    const handleClick = () => {

        // Check if a clip is selected
        if (!selectedClip) {
            console.warn('No clip selected to delete.')
            return
        }

        // Delete the selected clip
        deleteSelectedClip()
    }

    return (
        <button
            onClick={handleClick}
            disabled={!selectedClip}
            title="Delete Clip"
            className={`disabled:opacity-50`}
        >
            <img
                src="/assets/editor/icons/trash.png"
                alt="Delete"
                className='w-5 h-5 hover:scale-110 duration-500'
            />
        </button>
    )
}

export default DeleteButton