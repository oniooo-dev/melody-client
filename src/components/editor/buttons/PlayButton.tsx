import React from 'react'

interface PlayButtonProps {
    onClick: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({ onClick }) => {
    return (
        <button
            className="w-3 h-3"
            onClick={onClick}
        >
            <img
                src="/assets/editor/icons/play.png"
                alt="Play"
                className="hover:scale-110 duration-500"
            />
        </button>
    )
}

export default PlayButton