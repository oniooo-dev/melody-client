import { useRouter } from 'next/navigation';
import React from 'react';

interface LemonaLogoProps {
    size: number;
}

const LemonaLogo: React.FC<LemonaLogoProps> = ({ size }) => {

    // Router
    const router = useRouter()

    return (
        <button
            onClick={
                () => {
                    router.push('/')
                }
            }
        >
            <img
                src="/assets/main/logo/lemona-logo.png"
                alt="Lemona Logo"
                className={`w-${size}`}
            />
        </button>
    )
}

export default LemonaLogo