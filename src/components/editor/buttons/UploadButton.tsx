import React from 'react'

interface UploadButtonProps {
    onClick: () => void
}

const UploadButton: React.FC<UploadButtonProps> = ({ onClick }) => {

    // Handle click
    const handleClick = () => {
        onClick()
    }

    return (
        <button
            className="
                text-white 
                px-4 py-2 
                rounded-2xl
                bg-blue-500
                hover:bg-blue-600 transition-colors duration-500
            "
            onClick={handleClick}
        >
            Upload Files
        </button>
    )
}

export default UploadButton