import React from 'react'

interface ShareButtonProps {
    onShare: () => void;
}

const ShareButton: React.FC<ShareButtonProps> = ({ onShare }) => {
    return (
        <button
            onClick={onShare}
            className="bg-white text-black px-4 py-2 rounded-md"
        >
            Share
        </button>
    )
}

export default ShareButton