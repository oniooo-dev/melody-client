import React from 'react'

interface TrackDeleteButtonProps {
    trackId: number
    // onDeleteTrack: (id: number) => void
}

const TrackDeleteButton: React.FC<TrackDeleteButtonProps> = ({ trackId }) => {
    return (
        <button
            // onClick={() => onDeleteTrack(trackId)}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500 hover:bg-opacity-20 rounded transition-opacity"
        >
            <img
                src="/assets/editor/icons/trash.png"
                className='w-4 h-4'
            />
        </button>
    )
}

export default TrackDeleteButton