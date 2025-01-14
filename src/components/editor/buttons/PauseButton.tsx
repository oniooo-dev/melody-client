import React from 'react'

interface PauseButtonProps {
    onClick: () => void;
}

const PauseButton: React.FC<PauseButtonProps> = ({ onClick }) => {
    return (
        <button
            className="w-3 h-3"
            onClick={onClick}
        >
            <img
                src="/assets/editor/icons/pause.png"
                alt="Pause"
                className="hover:scale-110 duration-500"
            />
        </button>
    )
}

export default PauseButton