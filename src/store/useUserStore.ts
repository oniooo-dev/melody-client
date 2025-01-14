import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
    id: string
    email: string
    fullName: string
    avatarUrl: string
    subscriptionTier: 'free' | 'pro' | 'master'
    storageUsed: number
}

interface UserState {
    user: User | null
    isLoading: boolean
    error: string | null
    isAuthenticated: boolean

    setUser: (user: User) => void
    setIsLoading: (isLoading: boolean) => void
    setError: (error: string) => void
    setIsAuthenticated: (isAuthenticated: boolean) => void
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            isLoading: false,
            error: null,
            isAuthenticated: false,

            setUser: (user: User) => set({ user, error: null }),
            setIsLoading: (isLoading: boolean) => set({ isLoading }),
            setError: (error: string) => set({ error }),
            setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
        }),
        {
            // The key to store the persisted state in storage
            name: 'user-storage',
        }
    )
)