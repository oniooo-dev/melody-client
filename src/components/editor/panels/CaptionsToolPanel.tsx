import React, { useState } from 'react'
import CaptionStyleButton from '../buttons/CaptionStyleButton'
import { CAPTION_STYLES } from '@/constants/editor'
import SegmentedControl from '../misc/SegmentedControl';

interface CaptionOption {
    id: string;
    label: string;
}

const tabs: CaptionOption[] = [
    { id: 'style', label: 'Style' },
    { id: 'edit', label: 'Edit' },
];

const CaptionsToolPanel = () => {

    // Handle tab change
    const handleChange = (tabId: string) => {
        console.log('Selected tab:', tabId);
    };

    const [textColor, setTextColor] = useState('#000000');
    const [selectedHighlight, setSelectedHighlight] = useState<number | null>(null);
    const [backgroundColor, setBackgroundColor] = useState('#000000');

    const [highlightColors, setHighlightColors] = useState<string[]>([
        '#98E072', // Light green
        '#FF6B6B', // Light red
        '#5DADE2'  // Light blue
    ]);

    const handleTextColorChange = (color: string) => {
        setTextColor(color);
    };

    const handleHighlightSelect = (index: number) => {
        setSelectedHighlight(selectedHighlight === index ? null : index);
    };

    const handleBackgroundColorChange = (color: string) => {
        setBackgroundColor(color);
    };

    const handleHighlightColorChange = (index: number, color: string) => {
        const newColors = [...highlightColors];
        newColors[index] = color;
        setHighlightColors(newColors);
    };

    return (
        <div className="flex flex-col w-full gap-4 p-4">
            <div className="w-full">
                <SegmentedControl
                    tabs={tabs}
                    onChange={handleChange}
                />
            </div>
            <div className="grid grid-cols-2 gap-4 p-2">
                {
                    CAPTION_STYLES.map(
                        (captionStyle, index) => (
                            <CaptionStyleButton
                                key={index}
                                {...captionStyle}
                            />
                        ))
                }
            </div>

            <div className="max-w-md space-y-6 p-6">
                {/* Text Color Section */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-900">
                        Text Color
                    </label>
                    <div className="relative inline-block">
                        <input
                            type="color"
                            value={textColor}
                            onChange={(e) => handleTextColorChange(e.target.value)}
                            className="h-12 w-full rounded-lg border border-gray-200 bg-white cursor-pointer"
                        />
                    </div>
                </div>

                {/* Highlight Colors Section */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-900">
                        Highlight Colors
                    </label>
                    <div className="flex gap-4">
                        {highlightColors.map((color, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <button
                                    onClick={() => handleHighlightSelect(index)}
                                    className={`
                                        h-12 w-12 rounded-lg transition-transform
                                        ${selectedHighlight === index ? 'scale-95 border-2 border-blue-500' : 'scale-100'}
                                        `}
                                    style={{ backgroundColor: color }}
                                />
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => handleHighlightColorChange(index, e.target.value)}
                                    className="mt-2 h-8 w-8 p-0 border-none cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Background Color Section */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-900">
                        Background Color
                    </label>
                    <div className="relative inline-block">
                        <input
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => handleBackgroundColorChange(e.target.value)}
                            className="h-12 w-full rounded-lg border border-gray-200 cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CaptionsToolPanel