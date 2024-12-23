import React from 'react'
import ToolButton from './buttons/ToolButton'
import { TOOLS } from '@/constants/editor'

const ToolBar = () => {
    return (
        <div className='flex flex-col w-fit h-full gap-1 bg-gray-300'>
            {TOOLS.map((tool) => (
                <ToolButton key={tool.label} label={tool.label} />
            ))}
        </div>
    )
}

export default ToolBar