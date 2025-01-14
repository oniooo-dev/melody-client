import React from 'react'

interface TextOverlayButtonProps {
    font: string
    fontSize: number
    boldness: string
    uppercase: boolean
    textColor: string
    backgroundColor: string | null
    strokeColor: string | null
    shadow: string | null
    label: string
}

const TextOverlayButton: React.FC<TextOverlayButtonProps> = ({
    font,
    fontSize,
    boldness,
    uppercase,
    textColor,
    backgroundColor,
    strokeColor,
    shadow,
    label
}) => {

    // TODO: Add styles for text overlay
    const divStyle: React.CSSProperties = {
        fontFamily: font,
        fontSize: `${fontSize}px`,
        fontWeight: boldness,
        textTransform: uppercase ? 'uppercase' : 'none',
        color: textColor,
        backgroundColor: backgroundColor || 'transparent',
        WebkitTextStroke: strokeColor ? `1px ${strokeColor}` : undefined,
        textShadow: shadow || 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, color 0.3s ease'
    }

    return (
        <div
            className="flex flex-col items-center justify-center border border-gray-300 rounded-md p-2"
            style={divStyle}
        >
            <div className="text-sm font-medium">
                {label}
            </div>
        </div>
    )
}

export default TextOverlayButton