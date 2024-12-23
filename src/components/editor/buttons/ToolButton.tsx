import React from 'react'

interface ToolButtonProps {
    label: string
    icon: string
    onClick: () => void
    isSelected: boolean
}

const ToolButton: React.FC<ToolButtonProps> = ({ label, icon, onClick, isSelected }) => {
    return (
        <button
            className={`
                flex flex-col items-center justify-center gap-1 w-16 h-16 duration-500
                ${isSelected ? 'bg-blue-300' : 'hover:bg-blue-200'}
            `}
            onClick={onClick}
        >
            <img src={icon} alt={label} className='w-6 h-6 object-contain' />
            <p className='text-[10px]'>{label}</p>
        </button>
    )
}

export default ToolButton