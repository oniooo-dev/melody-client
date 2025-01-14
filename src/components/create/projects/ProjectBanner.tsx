"use client"

import React, { useEffect, useRef, useState } from 'react'

interface ProjectBannerProps {
    id: string;
    userId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    thumbnailUrl: string;
    duration: number;
    isPublic: boolean;
}

const ProjectBanner: React.FC<ProjectBannerProps> = ({
    id,
    userId,
    name,
    createdAt,
    updatedAt,
    thumbnailUrl,
    duration,
    isPublic
}) => {

    // Show Menu
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const handleShowMenu = () => {
        setShowMenu(true);
    }

    const handleHideMenu = () => {
        setShowMenu(false);
    }

    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                handleHideMenu();
            }
        }

        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [showMenu])

    return (
        <div className="relative flex flex-col gap-2 aspect-[12/16] rounded-lg overflow-hidden">

            {/* Thumbnail Container */}
            <div className="relative group flex flex-col gap-2 aspect-[12/16] rounded-lg overflow-hidden">

                {/* Duration */}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 py-2 px-4 rounded-lg">
                    <h1 className="text-white text-lg">
                        {`${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`}
                    </h1>
                </div>

                {/* Thumbnail */}
                <img
                    src={thumbnailUrl}
                    className="w-full h-full object-cover"
                />

                {/* Hover Menu */}
                <button className="
                    absolute top-2 right-2 z-10 bg-black bg-opacity-90 rounded-md shadow-lg text-white 
                    items-center justify-center px-2 py-1
                    opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 
                    pointer-events-none group-hover:pointer-events-auto focus-within:pointer-events-auto
                "
                    onClick={handleShowMenu}
                    ref={buttonRef}
                >
                    ...
                </button>


                {/* Menu */}
                {
                    showMenu && (
                        <div
                            className="absolute top-0 left-0 w-full h-full z-10 bg-black bg-opacity-50 flex items-center justify-center"
                        >
                            <div
                                className="grid grid-cols-2 gap-2 p-4 space-y-2 bg-black bg-opacity-90 rounded-md text-white"
                                ref={menuRef}
                            >
                                <div className="cursor-pointer hover:bg-gray-200 px-4 py-2 rounded">Download</div>
                                <div className="cursor-pointer hover:bg-gray-200 px-4 py-2 rounded">Duplicate</div>
                                <div className="cursor-pointer hover:bg-gray-200 px-4 py-2 rounded">Copy Link</div>
                                <div className="cursor-pointer hover:bg-gray-200 px-4 py-2 rounded">Delete</div>
                            </div>
                        </div>
                    )
                }

            </div>

            {/* Name */}
            <div className="flex flex-row gap-2 items-center justify-between text-white text-lg">
                {name}
            </div>

        </div>
    )
}

export default ProjectBanner