import React from 'react'
import TextOverlayButton from '../buttons/TextOverlayButton'
import { TEXT_OVERLAYS } from '@/constants/editor'

const TextToolPanel = () => {
    return (
        <div className="grid grid-cols-2 gap-4 p-2">
            {
                TEXT_OVERLAYS.map(
                    (textOverlay, index) => (
                        <TextOverlayButton
                            key={index}
                            {...textOverlay}
                        />
                    ))
            }
        </div>
    )
}

export default TextToolPanel