import React from 'react'

interface ChatMessageProps {
    id: number;
    message: string;
    sender: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ id, message, sender }) => {
    return (
        <div className='flex flex-col w-full p-2 bg-gray-300'>
            {
                sender === 'user' ? (
                    <div className='flex flex-row w-full h-full bg-gray-400 break-all'>
                        User: {message}
                    </div>
                ) : (
                    <div className='flex flex-row w-full h-full bg-gray-500 break-all'>
                        Assistant: {message}
                    </div>
                )
            }
        </div>
    )
}

export default ChatMessage