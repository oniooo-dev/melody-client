import React from 'react'
import BackgroundButton from './buttons/BackgroundButton'
import VideoPlayer from './preview/VideoPlayer'
import AspectRatioButton from './buttons/AspectRatioButton'

const PreviewPanel = () => {
    return (
        <div
            className='
                flex flex-row items-center justify-center w-full h-full 
                pt-12 px-2
            '
        >

            {/* Background Button */}
            <div className='flex flex-col h-full w-full justify-end'>
                <BackgroundButton />
            </div>

            {/* Preview Player */}
            <div className='flex flex-col w-fit h-full'>
                <VideoPlayer />
            </div>

            {/* Aspect Ratio Button */}
            <div className='relative flex flex-col h-full w-full justify-end'>
                <div className='absolute bottom-0 right-0'>
                    <AspectRatioButton />
                </div>
            </div>

            {/* Video Player */}
            {/* <VideoPlayer /> */}

        </div>
    )
}

export default PreviewPanel