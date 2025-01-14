import React from 'react'
import { Track, TrackType } from '@/types/EditorTypes'

interface TrackHeaderProps {
    track: Track
}

const TrackHeader: React.FC<TrackHeaderProps> = ({ track }) => {

    // Get track icon
    const getTrackIcon = (type: TrackType) => {
        return type === TrackType.VIDEO ?
            <img src="/assets/editor/icons/video.png" className='w-4 h-4' /> :
            <img src="/assets/editor/icons/audio.png" className='w-4 h-4' />
    }

    return (
        <div className="
            flex flex-col items-center
            flex-1 gap-1 p-2
            text-sm text-gray-500
        ">

            {/* Track icon */}
            <span>
                {getTrackIcon(track.type)}
            </span>

            {/* Track name */}
            {/* <span>
                {track.name}
            </span> */}

        </div>
    )
}

export default TrackHeader