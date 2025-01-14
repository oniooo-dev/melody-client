import React from 'react'
import { navbarItems } from '../../../constants/projects'
import LemonaLogo from '@/components/common/LemonaLogo'

const ProjectPageNavbar = () => {
    return (
        <div className="flex flex-row w-full justify-between items-center gap-4 py-3 px-8 text-white">
            <LemonaLogo size={36} />
            <div className="flex flex-row gap-16">
                {
                    navbarItems.map(
                        (item, index) => (
                            <button
                                key={index}
                                className="text-xl"
                            >
                                {item.title}
                            </button>
                        )
                    )
                }
            </div>
            <div className='flex flex-row gap-4 items-center justify-center'>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                    Get 1 month Pro Free!
                </button>
                <div>
                    Discord
                </div>
            </div>
        </div>
    )
}

export default ProjectPageNavbar