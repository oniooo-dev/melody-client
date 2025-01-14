import React from 'react'

interface RedoButtonProps {
    onRedo: () => void;
}

const RedoButton: React.FC<RedoButtonProps> = ({ onRedo }) => {
    return (
        <button onClick={onRedo}>
            <img
                src="/assets/editor/icons/undo.png"
                alt="Redo"
                className='w-6 h-6 scale-x-[-1] duration-500'
            />
        </button>
    )
}

export default RedoButton