'use client'

import React from 'react'
import BubbleEffect from '@/components/ui/BubbleEffect'
import Navbar from '@/components/common/Navbar'
import { useRouter } from 'next/navigation'

const HomePage = () => {

    // Router
    const router = useRouter();

    return (
        <div
            className="
                flex flex-col w-screen h-full items-center justify-center
                bg-black bg-opacity-70
            "
        >

            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-full z-[-1]">
                <BubbleEffect />
            </div>

            <div className="flex flex-col w-[80%] h-full">

                {/* Navbar */}
                <Navbar />

                {/* Content */}
                <div
                    className="
                    flex flex-col w-full h-full
                    overflow-y-scroll
                "
                >

                    {/* First Section */}
                    <div
                        className="
                        flex flex-col w-full h-screen items-center justify-center
                    "
                    >

                        <div className="flex flex-col items-center justify-center gap-4">

                            {/* Title */}
                            <h1 className="text-7xl text-white font-bold">The AI Video Studio</h1>

                            {/* Description */}
                            <div className="flex flex-col items-center justify-center gap-1">
                                <p className="text-xl text-gray-200">
                                    Transform ideas into short videos that captivate.
                                </p>
                                <p className="text-xl text-gray-200">
                                    Your next viral hit starts here.
                                </p>
                            </div>

                            {/* Button */}
                            <button
                                className="
                                    bg-red-400 hover:bg-red-500 border-2 border-white
                                    text-white font-semibold text-xl
                                    px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl 
                                    active:transform active:scale-95
                                "
                                onClick={
                                    () => router.push('/create')
                                }
                            >
                                CREATE MY VIDEO WITH AI
                            </button>

                        </div>

                    </div>

                    {/* Second Section */}
                    <div
                        className="
                        flex flex-col w-full h-screen items-center justify-center
                        bg-white bg-opacity-20
                    "
                    >
                        <h1 className="text-2xl font-bold text-white">
                            Features (...)
                        </h1>
                    </div>

                    {/* Third Section */}
                    <div
                        className="
                        flex flex-col w-full h-screen items-center justify-center
                        bg-white bg-opacity-30
                    "
                    >
                        <h1 className="text-2xl font-bold text-white">
                            Demos (see PearAI)
                        </h1>
                    </div>

                    {/* Fourth Section */}
                    <div
                        className="
                        flex flex-col w-full h-screen items-center justify-center
                        bg-white bg-opacity-30
                    "
                    >
                        <h1 className="text-2xl font-bold text-white">
                            Try it now! (blah blah blah)
                        </h1>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default HomePage