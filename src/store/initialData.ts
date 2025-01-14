import { ChatMessage, ClipType, Track, TrackType, Transform } from "@/types/EditorTypes";

// Initial tracks
export const initialTracks: Track[] = [
    {
        id: 1,
        type: TrackType.VIDEO,
        name: 'Video Track 1',
        clips: [
            {
                id: '1',
                type: ClipType.VIDEO,
                name: 'Video Clip 1',
                color: 'red',
                startTime: 0,
                duration: 5,
                sourceStart: 0,
                sourceEnd: 5,
                src: '/assets/editor/preview/tiktok.mp4',
                trackId: 1,
                transform: {
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 100,
                    rotation: 0,
                    scale: 1,
                    opacity: 100,
                },
            },
        ]
    },
    {
        id: 2,
        type: TrackType.VIDEO,
        name: 'Video Track 2',
        clips: [
            {
                id: '2',
                type: ClipType.VIDEO,
                name: 'Video Clip 2',
                color: 'blue',
                startTime: 7,
                duration: 8,
                sourceStart: 7,
                sourceEnd: 15,
                src: '/assets/editor/preview/tiktok.mp4',
                trackId: 2,
                transform: {
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 100,
                    rotation: 0,
                    scale: 1,
                    opacity: 100,
                },
            }
        ]
    },
    {
        id: 3,
        type: TrackType.AUDIO,
        name: 'Audio Track 1',
        clips: [
            {
                id: '3',
                type: ClipType.AUDIO,
                name: 'Audio Clip 1',
                color: 'green',
                startTime: 2,
                duration: 10,
                sourceStart: 2,
                sourceEnd: 12,
                src: 'https://example.com/audio.mp3',
                trackId: 3,
                transform: {
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 100,
                    rotation: 0,
                    scale: 1,
                    opacity: 100,
                },
            }
        ]
    },
]

// Initial chat messages
export const initialChatMessages: ChatMessage[] = [
    {
        id: 1,
        message: 'Hello, how are you?',
        sender: 'user'
    },
    {
        id: 2,
        message: 'I am fine, thank you!',
        sender: 'assistant'
    }
]