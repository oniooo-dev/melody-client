import React from 'react'
import { useRouter } from 'next/navigation';

interface BackButtonProps {
}

const BackButton: React.FC<BackButtonProps> = () => {

    // Router
    const router = useRouter();

    // Handle back button click
    const handleBack = () => {
        router.push('/create');
    }

    return (
        <button
            onClick={handleBack}
        >
            <img
                src="/assets/editor/icons/arrow.png"
                alt="Back"
                className='w-3 h-3 rotate-90 filter invert hover:scale-110 duration-500'
            />
        </button>
    )
}

export default BackButton