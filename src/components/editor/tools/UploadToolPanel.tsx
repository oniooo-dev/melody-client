import React from 'react'

const UploadToolPanel = () => {
    return (
        <div className='flex flex-col w-full h-full'>
            <div className="flex flex-col w-full h-full p-2">
                <div className="flex flex-col items-center justify-center w-full h-1/3 bg-gray-200 rounded-xl">
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            Upload Files
                        </button>
                        <div className="text-gray-900">
                            or drag here
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadToolPanel