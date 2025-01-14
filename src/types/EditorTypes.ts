/**
 * Types for the video editor.
*/

export type AspectRatio = '9/16' | '16/9' | '1/1' | '21/9'

export enum TrackType {
    VIDEO = 'video',
    AUDIO = 'audio'
}

export enum ClipType {
    VIDEO = 'video',
    AUDIO = 'audio'
}

export interface Clip {
    id: string;
    type: ClipType;
    name: string;
    color: string;
    startTime: number    // position on timeline
    duration: number     // length on timeline
    sourceStart: number  // start time in source media
    sourceEnd: number    // end time in source media
    src?: string        // for video clips
    trackId: number;      // **Added Property**
    // text?: string       // for text clips
    transform: Transform;
}

export interface Track {
    id: number;
    type: TrackType;
    name: string;
    clips: Clip[];
}

export interface SelectedClip extends Clip {
    trackId: number;
}

export interface Transform {
    x: number;              // 0-100
    y: number;              // 0-100
    width: number;          // 0-100
    height: number;         // 0-100
    rotation: number;       // 0-360
    scale: number;          // 0-100
    opacity: number;        // 0-100
}

export interface ChatMessage {
    id: number;
    message: string;
    sender: 'user' | 'assistant';
}