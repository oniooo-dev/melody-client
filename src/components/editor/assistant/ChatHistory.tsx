import React from 'react'
import ChatMessage from './ChatMessage'

interface ChatMessage {
    id: number;
    message: string;
    sender: 'user' | 'assistant';
}

interface ChatHistoryProps {
    chatMessages: ChatMessage[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chatMessages }) => {
    return (
        <div
            className="
                flex flex-col w-full h-full 
                gap-2 p-2
                bg-gray-200 
                overflow-y-scroll
            "
        >

            {/* Chat Messages */}
            {
                chatMessages.map((message) => (
                    <ChatMessage
                        key={message.id}
                        id={message.id}
                        message={message.message}
                        sender={message.sender}
                    />
                ))
            }

        </div>
    )
}

export default ChatHistory