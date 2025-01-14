/**
 * ChatTextField Component
*/

import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import ChatSendButton from '../buttons/ChatSendButton';

interface ChatTextFieldProps {
    onSend: (message: string) => void;
}

const ChatTextField: React.FC<ChatTextFieldProps> = ({ onSend }) => {

    // Message State
    const [message, setMessage] = useState<string>('');

    // Textarea Ref
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Handle Message Change
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    // Handle Send Message
    const handleSend = () => {

        // Check if message is empty
        if (message.trim() === '') {
            return;
        }

        // Send message
        onSend(message.trim());

        // Clear message
        setMessage('');
    };

    // Handle Key Down Event
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {

        // Check if Enter key is pressed without shift key
        if (e.key === 'Enter' && !e.shiftKey) {

            // Prevent default behavior
            e.preventDefault();

            // Send message
            handleSend();
        }
    };

    useEffect(() => {

        // Auto Resize Textarea
        const textarea = textareaRef.current

        // Check if textarea exists
        if (textarea) {

            // Reset height
            textarea.style.height = 'auto'

            // Set to scrollHeight
            textarea.style.height = `${textarea.scrollHeight}px`
        }
    }, [message])

    return (
        <div
            className='
                flex flex-col w-full 
                gap-2 px-4 py-3 
                bg-white border border-gray-300 rounded-lg
            '
        >

            {/* Textarea */}
            <textarea
                ref={textareaRef}
                className='focus:outline-none text-sm overflow-auto resize-none'
                placeholder="Chat with Melody"
                rows={2}
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />

            {/* Send Button */}
            <div className='flex flex-row items-center justify-between'>
                <div></div>
                <ChatSendButton
                    onSend={handleSend}
                />
            </div>

        </div>
    )
}

export default ChatTextField