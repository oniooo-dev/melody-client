import React, { useState, useEffect } from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import {
    Move,
    Video,
    Volume2,
    Split,
    Sliders,
    Plus,
    CircleGauge
} from 'lucide-react';
import { Transform } from '@/types/EditorTypes';

interface VideoSelectedClipProps {
    clipId: string;
    clipName: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: () => void;
    videoTransformProps: Array<keyof Transform>;
    transform: Transform;
}

interface TransformInputProps {
    label: string;
    value: string;
    propertyName: keyof Transform;
    onChange: (value: string) => void;
}

const VideoSelectedClip: React.FC<VideoSelectedClipProps> = ({
    clipId,
    clipName,
    handleChange,
    handleBlur,
    videoTransformProps,
    transform = {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        rotation: 0,
        scale: 1,
        opacity: 100,
        // Add other default transform properties
    },
}) => {

    // State for Entry Transition
    const [entryDuration, setEntryDuration] = useState<number>(1);
    const [selectedEntryTransition, setSelectedEntryTransition] = useState<string>('Cross Fade');

    // State for Exit Transition
    const [exitDuration, setExitDuration] = useState<number>(1);
    const [selectedExitTransition, setSelectedExitTransition] = useState<string>('Cross Fade');

    // State for Volume
    const [volume, setVolume] = useState<number>(100);

    // State for Speed
    const [speed, setSpeed] = useState<number>(100);

    // Handlers for Entry Transition
    const handleEntryDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setEntryDuration(value);
            // Optionally update the store here
        }
    };

    const handleEntryTransitionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedEntryTransition(e.target.value);
        // Optionally update the store here
    };

    // Handlers for Exit Transition
    const handleExitDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setExitDuration(value);
            // Optionally update the store here
        }
    };

    const handleExitTransitionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedExitTransition(e.target.value);
        // Optionally update the store here
    };

    // Handler for Volume Change
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
            setVolume(value);
            // Optionally update the store here
        }
    };

    // Handler for Speed Change
    const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
            setSpeed(value);
            // Optionally update the store here
        }
    };

    // Handler for transform property changes
    const handleTransformChange = (propertyName: keyof Transform, value: string) => {
        let numericValue: number;

        if (propertyName === 'opacity') {
            numericValue = parseFloat(value);
            numericValue = Math.min(Math.max(numericValue, 0), 100); // Clamp between 0-100
        } else if (propertyName === 'scale') {
            numericValue = parseFloat(value);
            numericValue = Math.min(Math.max(numericValue, 0.1), 10); // Clamp between 0.1-10
        } else {
            numericValue = parseFloat(value);
            // Define clamping for other properties if necessary
        }

        if (!isNaN(numericValue)) {
            useEditorStore.getState().updateClipTransform(clipId, { [propertyName]: numericValue });
        }
    };

    // Section component
    const Section: React.FC<{
        title: string;
        icon: React.ElementType;
        children: React.ReactNode;
    }> = ({ title, icon: Icon, children }) => (
        <div className="border-b border-gray-700">
            <div className="flex w-full items-center bg-gray-300 gap-2 px-4 py-2">
                <Icon size={16} className="text-blue-900" />
                <h3 className="text-sm font-medium">{title}</h3>
            </div>
            <div className="p-4 space-y-3">
                {children}
            </div>
        </div>
    );

    // Enhanced TransformInput component with local state
    const TransformInput: React.FC<TransformInputProps> = ({ label, value, propertyName, onChange }) => {
        const [inputValue, setInputValue] = useState<string>(value);

        useEffect(() => {
            setInputValue(value);
        }, [value]);

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
            onChange(e.target.value);
        };

        let min: number | undefined = undefined;
        let max: number | undefined = undefined;
        let step: number | undefined = undefined;

        if (propertyName === 'opacity') {
            min = 0;
            max = 100;
            step = 1;
        } else if (propertyName === 'scale') {
            min = 0.1;
            max = 10;
            step = 0.1;
        } else if (propertyName === 'x' || propertyName === 'y') {
            min = -1000;
            max = 1000;
            step = 1;
        } else if (propertyName === 'width' || propertyName === 'height') {
            min = 1;
            max = 2000;
            step = 1;
        } else if (propertyName === 'rotation') {
            min = -360;
            max = 360;
            step = 1;
        } else {
            // Default values for any unspecified properties
            min = -1000;
            max = 1000;
            step = 1;
        }

        return (
            <div className="flex items-center justify-between gap-2">
                <label className="text-sm capitalize">{label}</label>
                <input
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                    min={min}
                    max={max}
                    step={step}
                    className="
                        w-24 px-2 py-1 
                        border border-gray-700 rounded
                        focus:border-blue-500 focus:outline-none
                        text-sm
                    "
                />
            </div>
        );
    };

    // Debugging logs
    console.log('videoTransformProps:', videoTransformProps);
    console.log('transform:', transform);

    return (
        <div className="flex flex-col h-full w-full bg-gray-200">

            {/* Header */}
            <div className="p-4 border-b border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                    <Video size={18} className="text-blue-900" />
                    <h2 className="text-base font-medium">Video Clip Properties</h2>
                </div>
                <input
                    type="text"
                    value={clipName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-3 py-2 border border-gray-700 rounded text-sm focus:border-blue-500 focus:outline-none"
                />
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">

                {/* Transform */}
                <Section title="Transform" icon={Move}>
                    <div className="grid grid-cols-1 gap-3">
                        {videoTransformProps.map((prop, index) => {
                            if (!transform || typeof transform[prop] === 'undefined') {
                                console.warn(`Transform property '${prop}' is missing.`);
                                return (
                                    <TransformInput
                                        key={index}
                                        label={prop}
                                        value=""
                                        propertyName={prop}
                                        onChange={(value) => handleTransformChange(prop, value)}
                                    />
                                );
                            }

                            const value = transform[prop];
                            return (
                                <TransformInput
                                    key={index}
                                    label={prop}
                                    value={value.toString()}
                                    propertyName={prop}
                                    onChange={(value) => handleTransformChange(prop, value)}
                                />
                            );
                        })}
                    </div>
                </Section>

                {/* Animations */}
                <Section title="Animations" icon={Split}>
                    <div className="space-y-3">

                        {/* Entry Transition */}
                        <div className="flex items-center justify-between">
                            <label className="text-sm text-gray-400">Entry</label>
                            <select
                                className="px-2 py-1 bg-gray-300 border border-gray-700 rounded text-sm focus:border-blue-500 focus:outline-none"
                                value={selectedEntryTransition}
                                onChange={handleEntryTransitionChange}
                            >
                                <option>Cross Fade</option>
                                <option>Cross Zoom</option>
                                <option>Zoom In</option>
                                <option>Zoom Out</option>
                                <option>Fade In</option>
                                <option>Fade Out</option>
                            </select>
                        </div>

                        {/* Slider for Entry Duration with Display */}
                        <div className="flex items-center justify-between mt-2">
                            <label className="text-sm text-gray-400">Entry Duration (s): {entryDuration}</label>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                step="0.1"
                                value={entryDuration}
                                onChange={handleEntryDurationChange}
                                className="w-40"
                            />
                        </div>

                        {/* Exit Transition */}
                        <div className="flex items-center justify-between mt-4">
                            <label className="text-sm text-gray-400">Exit</label>
                            <select
                                className="px-2 py-1 bg-gray-300 border border-gray-700 rounded text-sm focus:border-blue-500 focus:outline-none"
                                value={selectedExitTransition}
                                onChange={handleExitTransitionChange}
                            >
                                <option>Cross Fade</option>
                                <option>Cross Zoom</option>
                                <option>Zoom In</option>
                                <option>Zoom Out</option>
                                <option>Fade In</option>
                                <option>Fade Out</option>
                            </select>
                        </div>

                        {/* Slider for Exit Duration with Display */}
                        <div className="flex items-center justify-between mt-2">
                            <label className="text-sm text-gray-400">Exit Duration (s): {exitDuration}</label>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                step="0.1"
                                value={exitDuration}
                                onChange={handleExitDurationChange}
                                className="w-40"
                            />
                        </div>

                    </div>
                </Section>

                {/* Filters */}
                <Section title="Filters" icon={Sliders}>
                    {/* Add Filter */}
                    <button
                        className="
                            flex items-center justify-center w-full 
                            gap-2 px-3 py-2 
                            bg-blue-500 hover:bg-blue-600 rounded-md
                            text-white text-sm font-medium 
                            transition-colors
                        "
                    >
                        <Plus size={16} />
                        Add Filter
                    </button>

                    {/* Effects */}
                    <div className="space-y-2">
                        {
                            ['Gaussian Blur', 'Color Correction'].map((effect, i) => (
                                <div key={i} className="flex items-center justify-between p-2 rounded">
                                    <span className="text-sm">{effect}</span>
                                    <button className="text-gray-400 hover:text-gray-200">
                                        <Sliders size={16} />
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </Section>

                {/* Speed */}
                <Section title="Speed" icon={CircleGauge}>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm text-gray-400">Speed: {speed}</label>
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                value={speed}
                                onChange={handleSpeedChange}
                                className="w-40"
                            />
                        </div>
                    </div>
                </Section>

                {/* Audio */}
                <Section title="Audio" icon={Volume2}>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm text-gray-400">Volume: {volume}</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-40"
                            />
                        </div>
                    </div>
                </Section>

            </div>
        </div>
    );

};

export default VideoSelectedClip;