import React from 'react'

interface ToolButtonProps {
    label: string
}

const ToolButton = ({ label }: ToolButtonProps) => {
    return (
        <button className='text-xs bg-gray-200 text-gray-800 w-16 h-16'>
            {label}
        </button>
    )
}

export default ToolButton