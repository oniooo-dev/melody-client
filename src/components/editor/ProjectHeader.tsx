import React from 'react'
import ShareButton from './buttons/ShareButton'
import UpgradeButton from './buttons/UpgradeButton'
import BackButton from './buttons/BackButton'
import UndoButton from './buttons/UndoButton'
import RedoButton from './buttons/RedoButton'

const ProjectHeader = () => {
    return (
        <div className='flex justify-between items-center px-6 py-2 bg-gray-100'>
            <div className="flex flex-row gap-4 items-center">
                <div>
                    <BackButton />
                </div>
                <div className='flex items-center gap-2'>
                    <h1 className='text-2xl font-bold'>Project Name</h1>
                </div>
                <div>
                    <UndoButton />
                </div>
                <div>
                    <RedoButton />
                </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
                <UpgradeButton />
                <ShareButton />
            </div>
        </div>
    )
}

export default ProjectHeader