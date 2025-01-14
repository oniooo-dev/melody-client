import { useRouter } from 'next/navigation'
import React from 'react'

interface NavItem {
    name: string
    href: string
}

const navItems: NavItem[] = [
    {
        name: 'Pricing',
        href: '/pricing',
    },
    {
        name: 'Features',
        href: '/features',
    },
    {
        name: 'Contact',
        href: '/contact',
    },
]

const Navbar = () => {

    // Router
    const router = useRouter()

    return (
        <div
            className="
                sticky top-6 flex flex-row w-full items-center justify-between
                bg-black bg-opacity-20 rounded-lg
                border-2 border-white border-opacity-20
                px-6 py-2
            "
        >

            {/* Left Side */}
            <div className="flex flex-row items-center justify-center gap-8">

                {/* Lemona Logo */}
                <img
                    src="/assets/main/logo/lemona-logo.png"
                    alt="Lemona Logo"
                    className={`w-32`}
                />

                {/* Divider */}
                <div className="w-px h-6 bg-white bg-opacity-30" />

                {/* Nav Items */}
                <div
                    className="
                        flex flex-row items-center justify-center 
                        gap-8
                    "
                >

                    {
                        navItems.map((item, index) => (
                            <button
                                key={index}
                                className="
                                    flex flex-row items-center justify-center
                                    hover:text-white
                                    hover:underline underline-offset-8
                                    transition-all duration-500
                                "
                                onClick={() => {
                                    router.push(item.href)
                                }}
                            >
                                <p className="text-white text-lg">
                                    {item.name}
                                </p>
                            </button>
                        ))
                    }

                </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-row items-center justify-center gap-4">
                <button
                    className="
                        text-white text-lg
                        border-2 border-white border-opacity-20
                        px-5 py-2 rounded-md
                        transition-all duration-300 hover:bg-white hover:bg-opacity-10
                    "
                >
                    Sign in
                </button>
                <button
                    className="
                        text-white text-lg
                        bg-white bg-opacity-10 
                        px-5 py-2 rounded-md
                        transition-all duration-300 hover:bg-white hover:bg-opacity-20
                    "
                >
                    Sign Up
                </button>
            </div>
        </div>
    )
}

export default Navbar