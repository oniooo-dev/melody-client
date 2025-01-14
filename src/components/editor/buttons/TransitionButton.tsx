import React from 'react'

interface TransitionButtonProps {
    label: string
}

const TransitionButton: React.FC<TransitionButtonProps> = ({ label }) => {
    return (
        <button className='flex flex-col items-center justify-center gap-2'>
            <div className='flex flex-row items-center justify-center w-full h-32 rounded-lg bg-gray-200 hover:bg-gray-300 duration-500'>
                <p className='text-xs'>{label}</p>
            </div>
            <p className='text-xs'>{label}</p>
        </button>
    )
}

export default TransitionButton