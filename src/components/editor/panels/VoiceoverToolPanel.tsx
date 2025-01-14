import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Voice {
    id: string;
    name: string;
    avatarUrl: string;
}

const VoiceoverToolPanel = () => {
    const [selectedVoice, setSelectedVoice] = useState<Voice>({
        id: '1',
        name: 'Whispering Girl',
        avatarUrl: '/api/placeholder/32/32'
    });
    const [script, setScript] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleGenerate = () => {
        console.log('Generating voice over with:', {
            voice: selectedVoice,
            script
        });
    };

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                    Voice
                </label>
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-200 rounded-full text-left"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={selectedVoice.avatarUrl}
                                alt=""
                                className="w-6 h-6 rounded-full"
                            />
                            <span className="text-gray-900">{selectedVoice.name}</span>
                        </div>
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                            {/* Dropdown items would go here */}
                            <div className="p-1">
                                {/* Example voice options */}
                                <button
                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100"
                                    onClick={() => {
                                        setSelectedVoice({
                                            id: '1',
                                            name: 'Whispering Girl',
                                            avatarUrl: '/api/placeholder/32/32'
                                        });
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    <img
                                        src="/api/placeholder/32/32"
                                        alt=""
                                        className="w-6 h-6 rounded-full"
                                    />
                                    <span>Whispering Girl</span>
                                </button>
                                {/* Add more voice options as needed */}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                    Script
                </label>
                <textarea
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    placeholder="Type your script here"
                    className="w-full h-40 px-4 py-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            <button
                onClick={handleGenerate}
                className="w-full py-3 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition-colors"
            >
                Generate AI Voice Over
            </button>
        </div>
    );
};

export default VoiceoverToolPanel;