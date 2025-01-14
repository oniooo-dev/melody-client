import React from 'react'
import ToolButton from './buttons/ToolButton'
import { TOOLS } from '@/constants/editor'

interface ToolBarProps {
    selectedTool: string | null
    onToolSelect: (tool: string) => void
}

const ToolBar: React.FC<ToolBarProps> = ({ selectedTool, onToolSelect }) => {

    return (
        <div className='flex flex-col w-fit bg-red-500'>
            {
                TOOLS.map(
                    (tool, index) => (
                        <ToolButton
                            key={index}
                            label={tool.label}
                            icon={tool.icon}
                            onClick={() => onToolSelect(tool.label)}
                            isSelected={selectedTool === tool.label}
                            aiTool={tool.aiTool}
                        />
                    ))
            }
        </div>
    )
}

export default ToolBar