/**
 * Project Header
*/

import React, { useState } from 'react'
import ShareButton from './buttons/ShareButton'
import BackButton from './buttons/BackButton'
import UndoButton from './buttons/UndoButton'
import RedoButton from './buttons/RedoButton'
import InviteButton from './buttons/InviteButton'
import InviteDropdownMenu from './dropdown/InviteDropdownMenu'
import ShareDropdownMenu from './dropdown/ShareDropdownMenu'
import { useEditorStore } from '@/store/useEditorStore'

const ProjectHeader = () => {

    // Project Metadata
    const projectName = 'Project Name'

    // Active Dropdown Menu
    const [activeDropdownMenu, setActiveDropdownMenu] = useState<'invite' | 'share' | null>(null)

    // Retrieve onUndo and onRedo from the store
    const onUndo = useEditorStore((state) => state.onUndo)
    const onRedo = useEditorStore((state) => state.onRedo)

    // Invite
    const handleInviteButtonClick = () => {
        setActiveDropdownMenu(prev => (prev === 'invite' ? null : 'invite'))
    }

    const handleInviteModalClose = () => {
        setActiveDropdownMenu(null)
    }

    // Share
    const handleShareButtonClick = () => {
        setActiveDropdownMenu(prev => (prev === 'share' ? null : 'share'))
    }

    const handleShareModalClose = () => {
        setActiveDropdownMenu(null)
    }

    return (
        <div
            className="
                flex justify-between items-center w-full h-14
                px-6
                bg-blue-400
            "
        >
            <div className="flex flex-row gap-4 items-center">
                <BackButton />
                <div className='flex flex-row items-center gap-4'>
                    <img
                        src="/assets/editor/icons/cloud-verification.png"
                        alt="Logo"
                        className='w-5 h-5'
                    />
                    <h1 className='text-xl font-semibold text-white'>{projectName}</h1>
                </div>
                <div className='flex items-center gap-2'>
                    <UndoButton onUndo={onUndo} />
                    <RedoButton onRedo={onRedo} />
                </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
                <div className='flex flex-row gap-2 items-center'>
                    <InviteButton
                        onClick={handleInviteButtonClick}
                    />
                    {
                        activeDropdownMenu === 'invite' && (
                            <InviteDropdownMenu
                                onClose={handleInviteModalClose}
                            />
                        )
                    }
                </div>
                <div className='flex flex-row gap-2 items-center'>
                    <ShareButton
                        onShare={handleShareButtonClick}
                    />
                    {
                        activeDropdownMenu === 'share' && (
                            <ShareDropdownMenu
                                onClose={handleShareModalClose}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ProjectHeader