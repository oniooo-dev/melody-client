import React from 'react'
import { useEditorStore } from '@/store/useEditorStore'
import { v4 as uuidv4 } from 'uuid'
import { Clip } from '@/types/EditorTypes'

const SplitButton: React.FC = () => {

  // Get the selected clip, current time, and setters from the store
  const selectedClip = useEditorStore((state) => state.selectedClip)
  const currentTime = useEditorStore((state) => state.currentTime)
  const setTracks = useEditorStore((state) => state.setTracks)
  const setSelectedClip = useEditorStore((state) => state.setSelectedClip)

  const handleSplit = () => {
    if (!selectedClip) {
      console.warn('No clip selected to split.')
      return
    }

    const splitTime = currentTime

    if (splitTime <= selectedClip.startTime || splitTime >= (selectedClip.startTime + selectedClip.duration)) {
      console.warn('Split time is outside the selected clip duration.')
      return
    }

    const firstClipDuration = splitTime - selectedClip.startTime
    const secondClipDuration = selectedClip.duration - firstClipDuration

    const firstClip: Clip = {
      ...selectedClip,
      id: uuidv4(), // string
      duration: firstClipDuration,
      trackId: selectedClip.trackId, // number
    }

    const secondClip: Clip = {
      ...selectedClip,
      id: uuidv4(), // string
      startTime: splitTime,
      duration: secondClipDuration,
      trackId: selectedClip.trackId, // number
    }

    const updatedTracks = useEditorStore.getState().tracks.map(track => {
      if (track.id !== selectedClip.trackId) return track

      const newClips = track.clips.flatMap((clip: Clip) => {
        if (clip.id !== selectedClip.id) return clip
        return [firstClip, secondClip]
      })

      return {
        ...track,
        clips: newClips,
      }
    })

    setTracks(updatedTracks)
    setSelectedClip(secondClip)
  }

  return (
    <button
      onClick={handleSplit}
      disabled={!selectedClip}
      title="Cut Clip"
      className={`disabled:opacity-50`}
    >
      <img
        src="/assets/editor/icons/split.png"
        alt="Split"
        className='w-5 h-5 hover:scale-110 duration-500'
      />
    </button>
  )
}

export default SplitButton