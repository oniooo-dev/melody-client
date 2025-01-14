import React, { useEffect, useRef } from 'react'
import CopyLinkButton from '../buttons/CopyLinkButton'

interface InviteDropdownMenuProps {
    onClose: () => void
}

const InviteDropdownMenu: React.FC<InviteDropdownMenuProps> = ({ onClose }) => {

    // Ref
    const inviteMenuRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inviteMenuRef.current && !inviteMenuRef.current.contains(event.target as Node)) {
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
            ref={inviteMenuRef}
            className='absolute top-16 flex flex-col gap-3 p-4 rounded-lg bg-white shadow-lg'
        >
            <h1 className='text-lg font-semibold'>Unlock Pro Tier for Free!</h1>
            <div className='flex flex-col gap-2'>
                <span className="border border-gray-200 text-gray-400 rounded-md p-2">
                    canva.com/invite/124909041
                </span>
                <CopyLinkButton />
            </div>
            <ul className='flex flex-col gap-2 list-disc pl-5 text-gray-500'>
                <li>1 Friend Signup - 7 Days Pro Tier Access</li>
                <li>3 Friends Signup - 30 Days Pro Tier Access</li>
            </ul>
        </div>
    )
}

export default InviteDropdownMenu