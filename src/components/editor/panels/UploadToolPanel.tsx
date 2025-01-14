import React, { useState, useRef, useEffect } from 'react';
import UploadButton from '../buttons/UploadButton';
import axios, { CancelTokenSource, AxiosProgressEvent } from 'axios';
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa';

interface UploadedFile extends File {
    progress: number; // Percentage (0 - 100)
    status?: 'uploading' | 'completed' | 'error' | 'canceled';
    cancelTokenSource?: CancelTokenSource;
}

const UPLOAD_ENDPOINT = '/api/upload'; // Ensure this matches your server endpoint
const MAX_CONCURRENT_UPLOADS = 3;
const MAX_RETRIES = 3;

const UploadToolPanel: React.FC = () => {

    // State to manage drag state and uploaded files
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Upload queue and active uploads tracking using refs
    const activeUploadsRef = useRef<number>(0);
    const uploadQueueRef = useRef<UploadedFile[]>([]);

    // Handle drag over event
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragging) {
            setIsDragging(true);
        }
    };

    // Handle drag leave event
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    // Handle drop event
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFiles(files);
            e.dataTransfer.clearData();
        }
    };

    // Handle files (both from drop and input)
    const handleFiles = (files: FileList) => {
        const fileArray: UploadedFile[] = Array.from(files).map(file => ({
            ...file,
            progress: 0,
            status: 'uploading',
        }));
        setUploadedFiles(prevFiles => [...prevFiles, ...fileArray]);
        console.log("Files to upload:", fileArray);

        fileArray.forEach(file => enqueueUpload(file));
    };

    // Enqueue upload
    const enqueueUpload = (file: UploadedFile) => {
        uploadQueueRef.current.push(file);
        processQueue();
    };

    // Process upload queue
    const processQueue = () => {
        while (activeUploadsRef.current < MAX_CONCURRENT_UPLOADS && uploadQueueRef.current.length > 0) {
            const file = uploadQueueRef.current.shift();
            if (file) {
                activeUploadsRef.current++;
                uploadFile(file).finally(() => {
                    activeUploadsRef.current--;
                    processQueue();
                });
            }
        }
    };

    // Upload file with retry logic
    const uploadFile = async (file: UploadedFile, attempt = 1) => {
        const formData = new FormData();
        formData.append('file', file);

        const cancelTokenSource = axios.CancelToken.source();

        // Assign the cancel token to the file
        setUploadedFiles(prevFiles =>
            prevFiles.map(f =>
                f === file ? { ...f, cancelTokenSource, status: 'uploading' } : f
            )
        );

        try {
            const response = await axios.post(UPLOAD_ENDPOINT, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                cancelToken: cancelTokenSource.token,
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
                    setUploadedFiles(prevFiles =>
                        prevFiles.map(f =>
                            f === file ? { ...f, progress } : f
                        )
                    );
                },
            });
            setUploadedFiles(prevFiles =>
                prevFiles.map(f =>
                    f === file ? { ...f, progress: 100, status: 'completed' } : f
                )
            );
            // Optionally handle the response data if needed
            console.log(`File uploaded successfully: ${file.name}`, response.data);
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log(`Upload canceled for file ${file.name}`);
                setUploadedFiles(prevFiles =>
                    prevFiles.map(f =>
                        f === file ? { ...f, status: 'canceled' } : f
                    )
                );
            } else {
                console.error(`Error uploading file ${file.name} (Attempt ${attempt}):`, error);
                if (attempt < MAX_RETRIES) {
                    // Retry the upload
                    uploadFile(file, attempt + 1);
                } else {
                    setUploadedFiles(prevFiles =>
                        prevFiles.map(f =>
                            f === file ? { ...f, status: 'error' } : f
                        )
                    );
                }
            }
        }
    };

    // Retry upload
    const retryUpload = (file: UploadedFile) => {
        setUploadedFiles(prevFiles =>
            prevFiles.map(f =>
                f === file ? { ...f, progress: 0, status: 'uploading' } : f
            )
        );
        enqueueUpload(file);
    };

    // Cancel upload
    const cancelUpload = (file: UploadedFile) => {
        if (file.cancelTokenSource) {
            file.cancelTokenSource.cancel(`Upload canceled for file ${file.name}`);
        }
    };

    // Trigger file input click
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Handle file selection via input
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFiles(files);
        }
    };

    // Cleanup on unmount: cancel all ongoing uploads
    useEffect(() => {
        return () => {
            uploadedFiles.forEach(file => {
                if (file.cancelTokenSource) {
                    file.cancelTokenSource.cancel('Component unmounted');
                }
            });
        };
    }, [uploadedFiles]);

    return (
        <div className='flex flex-col w-full h-full p-2'>

            {/* Upload Container */}
            <div
                className={`
                    relative flex flex-col w-full h-64 items-center justify-center
                    p-2 rounded-xl
                    border transition-colors duration-500 
                    ${isDragging ?
                        'border-blue-500 bg-gray-100' :
                        'border-gray-400 bg-gray-200'
                    }
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >

                {/* Upload Content */}
                <div className="flex flex-col items-center gap-2">

                    {/* Upload button */}
                    <UploadButton
                        onClick={handleButtonClick}
                    />

                    {/* Upload text */}
                    <p className="text-gray-900">
                        or drag here
                    </p>

                    {/* File input */}
                    <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                    />

                </div>

                {/* Dragging overlay */}
                {
                    isDragging && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg pointer-events-none">
                            <div className="text-white text-lg font-semibold">
                                Drop your files here
                            </div>
                        </div>
                    )
                }

            </div>

            {/* Display uploaded files with progress */}
            {
                uploadedFiles.length > 0 ? (
                    <div className="mt-4 p-2 rounded-lg">
                        <h3 className="text-lg font-semibold">Uploaded Files:</h3>
                        <ul className="list-disc list-inside">
                            {uploadedFiles.map((file, index) => (
                                <li key={index} className="mb-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            {file.status === 'completed' && <FaCheckCircle className="text-green-500 mr-2" />}
                                            {file.status === 'error' && <FaExclamationCircle className="text-red-500 mr-2" />}
                                            {file.status === 'canceled' && <FaTimesCircle className="text-yellow-500 mr-2" />}
                                            {file.status === 'uploading' && <FaSpinner className="text-blue-500 mr-2 animate-spin" />}
                                            <span>{file.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            {file.status === 'uploading' && (
                                                <button
                                                    className="text-yellow-500 underline mr-2"
                                                    onClick={() => cancelUpload(file)}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                            {file.status === 'error' && (
                                                <button
                                                    className="text-red-500 underline"
                                                    onClick={() => retryUpload(file)}
                                                >
                                                    Retry
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full mt-1">
                                        <div
                                            className={`text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all duration-300 ${file.status === 'error' ? 'bg-red-500' :
                                                    file.status === 'canceled' ? 'bg-yellow-500' : 'bg-blue-500'
                                                }`}
                                            style={{ width: `${file.progress}%` }}
                                        >
                                            {file.status === 'uploading' ? (
                                                <FaSpinner className="inline-block mr-1 animate-spin" />
                                            ) : (
                                                `${file.progress}%`
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="
                        flex w-full items-center justify-center 
                        mt-4 p-2 
                        rounded-md
                    ">
                        <h3 className="text-lg font-medium">No files uploaded</h3>
                    </div>
                )
            }

        </div>
    );
};

export default UploadToolPanel;