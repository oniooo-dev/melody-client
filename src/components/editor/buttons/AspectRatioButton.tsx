import React, { useState, useRef, useEffect } from 'react'
import { useEditorStore } from '@/store/useEditorStore'
import { AspectRatio } from '@/types/EditorTypes'

const AspectRatioButton = () => {
    // Get the current aspect ratio and setter from the editor store
    const aspectRatio = useEditorStore((state) => state.aspectRatio)
    const setAspectRatio = useEditorStore((state) => state.setAspectRatio)

    // Local state to manage the visibility of the drop-up menu
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const buttonRef = useRef<HTMLDivElement>(null)

    // Available aspect ratio options
    const aspectRatios: { label: string; value: AspectRatio }[] = [
        { label: 'Portrait (9:16)', value: '9/16' },
        { label: 'Landscape (16:9)', value: '16/9' },
        { label: 'Square (1:1)', value: '1/1' },
        { label: 'Wide (21:9)', value: '21/9' },
    ]

    // Toggle the drop-up menu visibility
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev)
    }

    // Handle selecting an aspect ratio
    const handleSelect = (ratio: AspectRatio) => {
        setAspectRatio(ratio)
        setIsMenuOpen(false)
    }

    // Close the menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false)
            }
        }

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isMenuOpen])

    return (
        <div className="relative inline-block" ref={buttonRef}>
            <button
                className='flex flex-row items-center gap-2 px-3 py-2 rounded-lg bg-gray-200 opacity-100 hover:opacity-50 duration-500'
                onClick={toggleMenu}
            >
                <span className="text-[10px] text-gray-500">
                    {aspectRatio === '9/16' && 'Portrait (9:16)'}
                    {aspectRatio === '16/9' && 'Landscape (16:9)'}
                    {aspectRatio === '1/1' && 'Square (1:1)'}
                    {aspectRatio === '21/9' && 'Wide (21:9)'}
                </span>
                <svg
                    className={`w-4 h-4 transition-transform ${isMenuOpen ? 'transform rotate-180' : ''
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isMenuOpen && (
                <div className="absolute bottom-full mb-2 right-0 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {aspectRatios.map((ratio) => (
                        <button
                            key={ratio.value}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${aspectRatio === ratio.value ? 'bg-gray-100' : ''
                                }`}
                            onClick={() => handleSelect(ratio.value)}
                        >
                            {ratio.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AspectRatioButton