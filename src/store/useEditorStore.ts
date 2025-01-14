import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Track, ChatMessage, Clip, AspectRatio, Transform } from '@/types/EditorTypes'
import { initialChatMessages, initialTracks } from './initialData'
import { Dispatch, SetStateAction } from 'react'
import React from 'react'

interface EditorState {
    // State
    tracks: Track[];
    currentTime: number;
    duration: number;
    chatMessages: ChatMessage[];
    selectedClip: Clip | null;
    selectedTool: string | null;
    isPlaying: boolean;
    isFullscreen: boolean;
    aspectRatio: AspectRatio;
    background: string;
    zoomLevel: number;

    // Reference to the video element
    videoRef: React.RefObject<HTMLVideoElement | null>;
    selectedClipPanelRef: React.RefObject<HTMLDivElement | null>;

    // Setters
    setTracks: Dispatch<SetStateAction<Track[]>>;
    setCurrentTime: (time: number) => void;
    setDuration: (duration: number) => void;
    setChatMessages: (messages: ChatMessage[]) => void;
    setSelectedClip: (clip: Clip | null) => void;
    setSelectedTool: (tool: string | null) => void;
    setIsPlaying: (isPlaying: boolean) => void;
    setIsFullscreen: (isFullscreen: boolean) => void;
    setAspectRatio: (aspectRatio: AspectRatio) => void;
    setBackground: (background: string) => void;
    setZoomLevel: (zoomLevel: number) => void;

    // Methods
    deleteSelectedClip: () => void;
    onReorderClips: (
        sourceTrackId: number,
        sourceClipId: string,
        targetTrackId: number,
        targetClipId: string | null,
        position: 'before' | 'after'
    ) => void;
    onUpdateClipStart: (
        trackId: number,
        clipId: string,
        newStart: number
    ) => void;
    onUndo: () => void;
    onRedo: () => void;
    editClipName: (clipId: string, newName: string) => void;
    updateClipTransform: (clipId: string, newTransform: Partial<Transform>) => void;
    addClip: (trackId: number, newClip: Omit<Clip, 'transform'>) => void;
}

export const useEditorStore = create<EditorState>()(
    persist(
        (set, get) => ({
            // State
            tracks: initialTracks,
            currentTime: 0,
            duration: 0,
            chatMessages: initialChatMessages,
            selectedClip: null,
            selectedTool: null,
            isPlaying: false,
            isFullscreen: false,
            aspectRatio: '9/16',
            background: 'none',
            zoomLevel: 100,

            // Reference to the video element
            videoRef: React.createRef<HTMLVideoElement | null>(),
            selectedClipPanelRef: React.createRef<HTMLDivElement | null>(),

            // Setters
            setTracks: (tracksOrUpdater) => {
                if (typeof tracksOrUpdater === 'function') {
                    set({ tracks: tracksOrUpdater(get().tracks) });
                } else {
                    set({ tracks: tracksOrUpdater });
                }
            },
            setCurrentTime: (time) => set({ currentTime: time }),
            setDuration: (duration) => set({ duration }),
            setChatMessages: (messages) => set({ chatMessages: messages }),
            setSelectedClip: (clip) => set({ selectedClip: clip }),
            setSelectedTool: (tool) => set({ selectedTool: tool }),
            setIsPlaying: (isPlaying) => set({ isPlaying }),
            setIsFullscreen: (isFullscreen) => set({ isFullscreen }),
            setAspectRatio: (aspectRatio) => set({ aspectRatio }),
            setBackground: (background) => set({ background }),
            setZoomLevel: (zoomLevel) => set({ zoomLevel }),

            // Delete Selected Clip
            deleteSelectedClip: () => {
                const selectedClip = get().selectedClip;
                if (!selectedClip) return;

                const updatedTracks = get().tracks.map(track => ({
                    ...track,
                    clips: track.clips.filter(clip => clip.id !== selectedClip.id)
                }));

                set({ tracks: updatedTracks, selectedClip: null });
            },

            // Reorder Clips
            onReorderClips: (sourceTrackId, sourceClipId, targetTrackId, targetClipId, position) => {
                set(state => {
                    const sourceTrack = state.tracks.find(track => track.id === sourceTrackId);
                    const targetTrack = state.tracks.find(track => track.id === targetTrackId);
                    if (!sourceTrack || !targetTrack) {
                        console.error('Source or target track not found');
                        return state;
                    }

                    const clipToMove = sourceTrack.clips.find(clip => clip.id === sourceClipId);
                    if (!clipToMove) {
                        console.error('Clip to move not found in source track');
                        return state;
                    }

                    // Remove the clip from the source track
                    const updatedSourceClips = sourceTrack.clips.filter(clip => clip.id !== sourceClipId);

                    // Determine new startTime based on targetClip and position
                    let newStartTime: number;

                    if (targetClipId) {
                        const targetClip = targetTrack.clips.find(clip => clip.id === targetClipId);
                        if (!targetClip) {
                            console.error('Target clip not found in target track');
                            return state;
                        }

                        newStartTime = position === 'before' ? targetClip.startTime : targetClip.startTime + targetClip.duration;
                    } else {
                        // If no targetClipId, place at the end
                        newStartTime = targetTrack.clips.reduce((max, clip) => Math.max(max, clip.startTime + clip.duration), 0);
                    }

                    // Update the clip's trackId and startTime
                    const updatedClip = { ...clipToMove, trackId: targetTrackId, startTime: newStartTime };

                    // Insert the clip into the target track's clips array
                    let updatedTargetClips: Clip[];
                    if (targetClipId) {
                        const targetIndex = targetTrack.clips.findIndex(clip => clip.id === targetClipId);
                        if (targetIndex === -1) {
                            updatedTargetClips = [...targetTrack.clips, updatedClip];
                        } else {
                            if (position === 'before') {
                                updatedTargetClips = [
                                    ...targetTrack.clips.slice(0, targetIndex),
                                    updatedClip,
                                    ...targetTrack.clips.slice(targetIndex)
                                ];
                            } else {
                                updatedTargetClips = [
                                    ...targetTrack.clips.slice(0, targetIndex + 1),
                                    updatedClip,
                                    ...targetTrack.clips.slice(targetIndex + 1)
                                ];
                            }
                        }
                    } else {
                        updatedTargetClips = [...targetTrack.clips, updatedClip];
                    }

                    // Sort the target clips by startTime
                    updatedTargetClips.sort((a, b) => a.startTime - b.startTime);

                    // Adjust startTime to prevent overlapping
                    for (let i = 1; i < updatedTargetClips.length; i++) {
                        const prevClip = updatedTargetClips[i - 1];
                        const currentClip = updatedTargetClips[i];
                        if (currentClip.startTime < prevClip.startTime + prevClip.duration) {
                            updatedTargetClips[i].startTime = prevClip.startTime + prevClip.duration;
                        }
                    }

                    // Update the state with modified tracks
                    const updatedTracks = state.tracks.map(track => {
                        if (track.id === sourceTrackId) {
                            return { ...track, clips: updatedSourceClips };
                        } else if (track.id === targetTrackId) {
                            return { ...track, clips: updatedTargetClips };
                        } else {
                            return track;
                        }
                    });

                    return { ...state, tracks: updatedTracks };
                });
            },

            // Update Clip Start
            onUpdateClipStart: (trackId, clipId, newStartTime) => {
                set(state => {
                    const updatedTracks = state.tracks.map(track => {
                        if (track.id === trackId) {
                            const updatedClips = track.clips.map(clip => {
                                if (clip.id === clipId) {
                                    return { ...clip, startTime: newStartTime };
                                }
                                return clip;
                            });
                            return { ...track, clips: updatedClips };
                        }
                        return track;
                    });
                    return { ...state, tracks: updatedTracks };
                });
            },

            // Undo (Implement your undo logic here)
            onUndo: () => {
                console.log('Undo action triggered');
                // Implement undo functionality
            },

            // Redo (Implement your redo logic here)
            onRedo: () => {
                console.log('Redo action triggered');
                // Implement redo functionality
            },

            // Edit Clip Name
            editClipName: (clipId, newName) => {
                const updatedTracks = get().tracks.map(track => ({
                    ...track,
                    clips: track.clips.map(clip =>
                        clip.id === clipId ? { ...clip, name: newName } : clip
                    )
                }));
                set({ tracks: updatedTracks });
            },

            // Update Clip Transform
            updateClipTransform: (clipId, newTransform) => {
                set((state) => {
                    const updatedTracks = state.tracks.map((track) => ({
                        ...track,
                        clips: track.clips.map((clip) => {
                            if (clip.id !== clipId) return clip;
                            return { ...clip, transform: { ...clip.transform, ...newTransform } };
                        }),
                    }));
                    return { ...state, tracks: updatedTracks };
                });
            },

            // Add Clip
            addClip: (trackId, newClip) => {
                const defaultTransform: Transform = {
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 100,
                    rotation: 0,
                    scale: 1,
                    opacity: 100,
                    // Initialize other properties with default values
                };

                const clipWithTransform: Clip = {
                    ...newClip,
                    transform: defaultTransform,
                };

                set(state => {
                    const updatedTracks = state.tracks.map(track => {
                        if (track.id === trackId) {
                            return {
                                ...track,
                                clips: [...track.clips, clipWithTransform],
                            };
                        }
                        return track;
                    });
                    return { tracks: updatedTracks };
                });
            },
        }),
        {
            name: 'editor-storage',
            partialize: (state) => ({
                currentTime: state.currentTime,
                duration: state.duration,
                chatMessages: state.chatMessages,
                selectedClip: state.selectedClip,
                selectedTool: state.selectedTool,
                isPlaying: state.isPlaying,
                isFullscreen: state.isFullscreen,
                aspectRatio: state.aspectRatio,
                background: state.background,
                zoomLevel: state.zoomLevel,
            }),
        }
    )
);