import React, { useState } from 'react'
import ChatTextField from './assistant/ChatTextField'
import ChatHistory from './assistant/ChatHistory'
import { ChatMessage } from '@/types/EditorTypes';
import { useEditorStore } from '@/store/useEditorStore';

const AIAssistantPanel = () => {

    // Chat Messages
    const { chatMessages, setChatMessages } = useEditorStore();

    const addMessage = (message: string, sender: 'user' | 'assistant') => {

        // Add the message to the chat history
        const newMessage: ChatMessage = {
            id: chatMessages.length + 1,
            message,
            sender,
        };

        // Update the chat history
        setChatMessages(
            [
                ...chatMessages,
                newMessage
            ]
        );
    };

    const handleSend = (message: string) => {
        addMessage(message, 'user');

        // TODO: Handle sending the message to the AI assistant and appending the response
        // addMessage('Hello, how can I help you?', 'assistant');
    };

    return (
        <div
            className="
                flex flex-col items-center justify-between w-full h-full
                p-2 
                bg-gray-800
            ">

            {/* Chat History */}
            <div className='w-full h-full flex-grow'>
                <ChatHistory
                    chatMessages={chatMessages}
                />
            </div>

            {/* Chat Text Field */}
            <div className='w-full'>
                <ChatTextField
                    onSend={handleSend}
                />
            </div>

        </div>
    )
}

export default AIAssistantPanel