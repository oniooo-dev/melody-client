import React from 'react'

const MusicButton = () => {
    return (
        <button className='flex flex-row items-center justify-center w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300 duration-500'>
            <div className='flex flex-col items-center justify-center w-full h-full'>
                <span className='text-xs'>Music Title</span>
                <div className='flex flex-row items-center justify-center w-full h-full gap-2'>
                    <span className='text-xs'>XX:XX</span>
                    <span className='text-xs'>Author</span>
                </div>
            </div>
        </button>
    )
}

export default MusicButton