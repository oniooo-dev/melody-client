import React from 'react'

interface CaptionStyleButtonProps {
    font: string
    boldness: string
    uppercase: boolean
    strokeThickness: string
    strokeColor: string
    shadow: string
    mainTextColor: string
    highlightColors: string[]
    captionPerPage: number
    animation: string
    label: string
}

const CaptionStyleButton: React.FC<CaptionStyleButtonProps> = ({
    font,
    boldness,
    uppercase,
    strokeThickness,
    strokeColor,
    shadow,
    mainTextColor,
    highlightColors,
    captionPerPage,
    animation,
    label
}) => {

    // TODO: Add styles for caption style
    const styles: React.CSSProperties = {
        fontFamily: font,
        fontWeight: boldness,
        textTransform: uppercase ? 'uppercase' : 'none',
        WebkitTextStroke: `${strokeThickness} ${strokeColor}`,
        textShadow: shadow,
        color: mainTextColor,
        background: `linear-gradient(45deg, ${highlightColors.join(', ')})`,
        animation: animation,
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    }

    return (
        <div style={styles}>
            {label}
        </div>
    )
}

export default CaptionStyleButton