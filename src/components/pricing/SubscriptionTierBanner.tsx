import React from 'react'

interface SubscriptionTierBannerProps {
    label: string;
    price: string | null;
    headline: string;
    features: string[];
}

const SubscriptionTierBanner: React.FC<SubscriptionTierBannerProps> = ({
    label,
    price,
    headline,
    features
}) => {
    return (
        <div
            className="
                flex flex-col w-full h-full 
                px-8 py-8 gap-6
                bg-black bg-opacity-40
                border-2 border-gray-200 rounded-2xl
            "
        >

            {/* Label */}
            <h1
                className="
                    text-2xl font-medium
                "
            >
                {label}
            </h1>

            {/* Price */}
            {
                price ? (
                    <div className="flex flex-row gap-4">
                        <p className="text-4xl font-semibold">
                            {price}
                        </p>
                        <div className="flex flex-row gap-1">
                            <p className="text-2xl mt-auto">
                                /
                            </p>
                            <p className="text-lg font-medium mt-auto">
                                month
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-4xl font-semibold">
                        Free
                    </p>
                )
            }

            {/* A Divider */}
            <div className="w-full h-px bg-gray-200 bg-opacity-30" />

            {/* Headline */}
            <p className="text-lg font-medium">
                {headline}
            </p>

            {/* Features */}
            <ul className="list-disc list-inside">
                {
                    features.map(
                        (feature, index) => (
                            <li key={index}>
                                {feature}
                            </li>
                        )
                    )
                }
            </ul>

        </div>
    )
}

export default SubscriptionTierBanner