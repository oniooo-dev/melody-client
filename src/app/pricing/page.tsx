'use client'

import Navbar from '@/components/common/Navbar';
import SubscriptionTierBanner from '@/components/pricing/SubscriptionTierBanner';
import ToggleSwitch from '@/components/pricing/ToggleSwitch';
import BubbleEffect from '@/components/ui/BubbleEffect';
import React from 'react'

interface ToggleOption {
    label: string;
    value: string;
}

interface SubscriptionTier {
    label: string;
    price: string | null;
    headline: string;
    features: string[];
}

const PricingPage = () => {

    const options: [ToggleOption, ToggleOption] = [
        {
            label: 'Monthly',
            value: 'monthly'
        },
        {
            label: 'Yearly (Save 20%)',
            value: 'yearly'
        }
    ];

    const subscriptionTiers: SubscriptionTier[] = [
        {
            label: 'Hobby',
            price: null,
            headline: 'Includes',
            features: [
                '1 GB of storage',
                'Free assets',
                'Limited AI Chat',
                'Limited multi-modal images and basic text outputs',
                'Upload videos directly to social media platforms',
                'Watermarking on images',
            ]
        },
        {
            label: 'Pro',
            price: '$19.99',
            headline: 'Everything in Hobby, plus',
            features: [
                'Advanced AI Generation - Images, videos and SFX',
                'Voice Generation - Premium voices and effects',
                'Storage - 10 GB',
                'No Watermark on AI-generated content',
                'Direct upload to social media platforms',
            ]
        },
        {
            label: 'Master',
            price: '$39.99',
            headline: 'Everything in Pro, plus',
            features: [
                'All pro features +',
                'Advanced AI Generation - Images, videos, SFX, and voices',
                'Storage - 100 GB',
                'Priority Access - Faster Processing for large projects',
                'Batch Upload - Export multiple projects at once',
            ]
        }
    ];

    return (
        <div
            className="
                flex flex-col w-screen h-screen items-center 
                gap-4 
                bg-black bg-opacity-70
                text-white
            "
        >

            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-full z-[-1]">
                <BubbleEffect />
            </div>

            {/* Pricing Section */}
            <div
                className="
                    flex flex-col w-[80%] h-full items-center justify-center
                    gap-12
                "
            >

                {/* Navbar */}
                <Navbar />

                <div
                    className="
                        flex flex-col gap-12 w-[80%] h-full items-center justify-center
                    "
                >

                    {/* Title */}
                    <div className="flex flex-col gap-2 w-full mt-16">
                        <h1 className="text-4xl font-semibold text-white">
                            Pricing
                        </h1>
                        <p className="text-lg">
                            Choose the best plan for your journey
                        </p>
                    </div>

                    {/* Toggle Switch */}
                    <div>
                        <ToggleSwitch
                            options={options}
                            onChange={(value) => console.log('Selected:', value)}
                        />
                    </div>

                    {/* Subscription Tiers */}
                    <div
                        className="
                            flex flex-row h-full gap-8
                        "
                    >
                        {
                            subscriptionTiers.map(
                                (tier, index) => (
                                    <SubscriptionTierBanner
                                        key={index}
                                        label={tier.label}
                                        price={tier.price}
                                        headline={tier.headline}
                                        features={tier.features}
                                    />
                                )
                            )
                        }
                    </div>

                    {/* Blank Space */}
                    <div className="flex flex-col w-full h-4"></div>

                </div>

            </div>

        </div>
    )
}

export default PricingPage