import React, { useEffect } from 'react';
import { useEditorStore } from '@/store/useEditorStore'
import ClipOverlay from './ClipOverlay';

const VideoPlayer = () => {

    const {
        aspectRatio,
        currentTime,
        tracks,
        zoomLevel,
    } = useEditorStore((state) => state);

    // Reference to the video element (from the store)
    const videoRef = useEditorStore((state) => state.videoRef);

    // Sync the video player's current time with the store
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const currentTimeDifference = Math.abs(videoElement.currentTime - currentTime);
        const TIME_SYNC_THRESHOLD = 0.1; // Threshold in seconds

        if (currentTimeDifference > TIME_SYNC_THRESHOLD) {
            videoElement.currentTime = currentTime;
        }
    }, [currentTime, videoRef]);

    return (
        <div
            className="relative flex h-full bg-black"
            style={{
                aspectRatio: aspectRatio,
            }}
        >

            {/* Video Player */}
            {/* <video
                ref={videoRef}
                src="/assets/editor/preview/tiktok.mp4" // Replace with dynamic source as needed
                className='w-full h-full object-contain'
                controls={false}
            /> */}

            {/* Clips Overlay */}
            <div className="absolute top-0 left-0 w-full h-full">
                {
                    tracks.flatMap(track =>
                        track.clips.map(clip => (
                            <ClipOverlay
                                key={clip.id}
                                clip={clip}
                                zoomLevel={zoomLevel}
                            />
                        ))
                    )
                }
            </div>

        </div>
    );
};

export default VideoPlayer;