import React from 'react'
import ToolButton from './buttons/ToolButton'
import { TOOLS } from '@/constants/editor'

interface ToolBarProps {
    selectedTool: string | null
    onToolClick: (tool: string) => void
}

const ToolBar: React.FC<ToolBarProps> = ({ selectedTool, onToolClick }) => {
    return (
        <div className='flex flex-col w-fit h-full'>
            {
                TOOLS.map((tool, index) => (
                    <ToolButton
                        key={index}
                        label={tool.label}
                        icon={tool.icon}
                        onClick={() => onToolClick(tool.label)}
                        isSelected={selectedTool === tool.label}
                    />
                ))
            }
        </div>
    )
}

export default ToolBar