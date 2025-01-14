import React, { useState, useRef, useEffect } from 'react'
import { useEditorStore } from '@/store/useEditorStore'

const BackgroundButton = () => {

    // Get the current background and setter from the editor store
    const background = useEditorStore((state) => state.background)
    const setBackground = useEditorStore((state) => state.setBackground)

    // Local state to manage the visibility of the drop-up menu
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const buttonRef = useRef<HTMLDivElement>(null)

    // Available background options
    const backgroundOptions = [
        { label: 'None', value: 'none' },
        { label: 'Gradient', value: 'gradient' },
        { label: 'Blur', value: 'blur' },
    ]

    // Toggle the drop-up menu visibility
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev)
    }

    // Handle selecting a background option
    const handleSelect = (background: string) => {
        setBackground(background)
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

            {/* Background Button */}
            <button
                className='flex flex-row items-center gap-2 px-3 py-2 rounded-lg bg-gray-200 opacity-100 hover:opacity-50 duration-500'
                onClick={toggleMenu}
            >
                <span className="text-[10px] text-gray-500">
                    {background === 'none' && 'None'}
                    {background === 'gradient' && 'Gradient'}
                    {background === 'blur' && 'Blur'}
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

            {/* Background Menu */}
            {
                isMenuOpen && (
                    <div className="absolute bottom-full mb-2 left-0 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                        {
                            backgroundOptions.map((option) => (
                                <button
                                    key={option.value}
                                    className={`
                                    w-full text-left px-4 py-2 hover:bg-gray-100 
                                    ${background === option.value ? 'bg-gray-100' : ''}
                                `}
                                    onClick={() => handleSelect(option.value)}
                                >
                                    {option.label}
                                </button>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default BackgroundButton