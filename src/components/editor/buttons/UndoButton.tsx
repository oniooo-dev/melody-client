import React from 'react'

interface UndoButtonProps {
    onUndo: () => void;
}

const UndoButton: React.FC<UndoButtonProps> = ({ onUndo }) => {
    return (
        <button onClick={onUndo}>
            <img
                src="/assets/editor/icons/undo.png"
                alt="Undo"
                className='w-6 h-6 duration-500'
            />
        </button>
    )
}

export default UndoButton