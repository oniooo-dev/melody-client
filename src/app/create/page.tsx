'use client'

import ProjectPageNavbar from '@/components/create/navbar/ProjectPageNavbar';
import ProjectsContainer from '@/components/create/projects/ProjectsContainer';
import BubbleEffect from '@/components/ui/BubbleEffect';
import { PlusIcon } from 'lucide-react';
import React from 'react'

const CreatePage = () => {
    return (
        <div
            className="flex flex-col gap-12 w-full h-screen bg-black bg-opacity-70"
        >

            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-full z-[-1]">
                <BubbleEffect />
            </div>

            {/* Navbar */}
            <ProjectPageNavbar />

            {/* Content */}
            <div className="flex flex-col gap-4 px-16 w-full">
                <div className="flex flex-row gap-4 items-center justify-between">
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <h1 className="text-white text-2xl font-medium">
                            My Videos
                        </h1>
                        <div className="flex flex-row gap-2 items-center justify-center text-lg text-gray-300">
                            0.5 GB / 1 GB
                        </div>
                        <div className="flex flex-row gap-2 items-center justify-center text-lg text-gray-300 underline">
                            Need more space?
                        </div>
                    </div>
                    <button className="flex flex-row gap-2 items-center justify-center text-md bg-white text-black px-4 py-2 rounded-lg">
                        <PlusIcon className="w-4 h-4" />
                        Create a new project
                    </button>
                </div>
                <ProjectsContainer />
            </div>

        </div>
    )
}

export default CreatePage