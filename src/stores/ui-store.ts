import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface UIState {
  // Terminal
  isTerminalOpen: boolean
  openTerminal: () => void
  closeTerminal: () => void
  toggleTerminal: () => void

  // Sound
  isSoundEnabled: boolean
  toggleSound: () => void

  // Boot sequence
  hasBooted: boolean
  setHasBooted: (value?: boolean) => void

  // Navigation
  isMobileNavOpen: boolean
  toggleMobileNav: () => void
  closeMobileNav: () => void

  // Search
  isSearchOpen: boolean
  openSearch: () => void
  closeSearch: () => void
  toggleSearch: () => void

  // Achievements
  unlockedAchievements: string[]
  unlockAchievement: (id: string) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Terminal
      isTerminalOpen: false,
      openTerminal: () => set({ isTerminalOpen: true }),
      closeTerminal: () => set({ isTerminalOpen: false }),
      toggleTerminal: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),

      // Sound
      isSoundEnabled: false,
      toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),

      // Boot sequence
      hasBooted: false,
      setHasBooted: (value = true) => set({ hasBooted: value }),

      // Navigation
      isMobileNavOpen: false,
      toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),
      closeMobileNav: () => set({ isMobileNavOpen: false }),

      // Search
      isSearchOpen: false,
      openSearch: () => set({ isSearchOpen: true }),
      closeSearch: () => set({ isSearchOpen: false }),
      toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),

      // Achievements
      unlockedAchievements: [],
      unlockAchievement: (id) =>
        set((state) => ({
          unlockedAchievements: state.unlockedAchievements.includes(id)
            ? state.unlockedAchievements
            : [...state.unlockedAchievements, id],
        })),
    }),
    {
      name: 'vkos-ui',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ hasBooted: state.hasBooted }),
    }
  )
)
