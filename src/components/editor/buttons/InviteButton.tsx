import React from 'react'

interface InviteButtonProps {
    onClick: () => void
}

const InviteButton: React.FC<InviteButtonProps> = ({ onClick }) => {
    return (
        <button
            className='bg-white py-2 px-4 rounded-md'
            onClick={onClick}
        >
            Get 1 Month Pro Free!
        </button>
    )
}

export default InviteButton