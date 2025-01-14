import React, { useEffect, useRef } from 'react'
import CopyLinkButton from '../buttons/CopyLinkButton'
import DownloadButton from '../buttons/DownloadButton'

interface ShareDropdownMenuProps {
    onClose: () => void
}

const ShareDropdownMenu: React.FC<ShareDropdownMenuProps> = ({ onClose }) => {

    // Ref
    const shareMenuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
                onClose()
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [onClose])

    return (
        <div
            ref={shareMenuRef}
            className='absolute top-16 right-4 flex flex-col w-80 gap-3 p-4 rounded-lg bg-white shadow-lg'
        >
            <span className='text-lg font-semibold'>Share Video</span>
            <div className='flex flex-col gap-2'>
                <span className="border border-gray-200 text-gray-400 rounded-md p-2">
                    canva.com/invite/124909041
                </span>
                <CopyLinkButton />
            </div>
            <span className='text-lg font-semibold'>Download Video</span>
            <div className='flex flex-col gap-2'>
                <span className="border border-gray-200 text-gray-400 rounded-md p-2">
                    Quality: 1080p
                </span>
                <span className="border border-gray-200 text-gray-400 rounded-md p-2">
                    FPS: 60
                </span>
                <span className="border border-gray-200 text-gray-400 rounded-md p-2">
                    Watermark: No
                </span>
                <DownloadButton />
            </div>
        </div>
    )
}

export default ShareDropdownMenu