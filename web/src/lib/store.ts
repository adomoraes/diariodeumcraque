import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
	id: string
	email: string
	name: string
	role: "ATHLETE" | "PARENT" | "COACH" | "ADMIN"
}

interface AuthState {
	token: string | null
	user: User | null
	isAuthenticated: boolean
	setToken: (token: string | null) => void
	setUser: (user: User | null) => void
	login: (token: string, user: User) => void
	logout: () => void
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			token: null,
			user: null,
			isAuthenticated: false,
			setToken: (token) =>
				set({
					token,
					isAuthenticated: !!token,
				}),
			setUser: (user) =>
				set({
					user,
					isAuthenticated: !!user,
				}),
			login: (token, user) =>
				set({
					token,
					user,
					isAuthenticated: true,
				}),
			logout: () =>
				set({
					token: null,
					user: null,
					isAuthenticated: false,
				}),
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({
				token: state.token,
				user: state.user,
			}),
		},
	),
)

export interface DiaryEntry {
	id: string
	date: string
	focus?: string
	notes?: string
	techniquRating?: number
	physicalRating?: number
	mentalRating?: number
	whatWentWell?: string
	whatWasDifficult?: string
	nextGoal?: string
}

interface DiaryState {
	entries: DiaryEntry[]
	selectedEntry: DiaryEntry | null
	isLoading: boolean
	error: string | null
	setEntries: (entries: DiaryEntry[]) => void
	setSelectedEntry: (entry: DiaryEntry | null) => void
	addEntry: (entry: DiaryEntry) => void
	updateEntry: (id: string, entry: Partial<DiaryEntry>) => void
	deleteEntry: (id: string) => void
	setIsLoading: (loading: boolean) => void
	setError: (error: string | null) => void
}

export const useDiaryStore = create<DiaryState>((set) => ({
	entries: [],
	selectedEntry: null,
	isLoading: false,
	error: null,
	setEntries: (entries) => set({ entries }),
	setSelectedEntry: (entry) => set({ selectedEntry: entry }),
	addEntry: (entry) =>
		set((state) => ({
			entries: [entry, ...state.entries],
		})),
	updateEntry: (id, updates) =>
		set((state) => ({
			entries: state.entries.map((e) =>
				e.id === id ? { ...e, ...updates } : e,
			),
			selectedEntry:
				state.selectedEntry?.id === id
					? { ...state.selectedEntry, ...updates }
					: state.selectedEntry,
		})),
	deleteEntry: (id) =>
		set((state) => ({
			entries: state.entries.filter((e) => e.id !== id),
			selectedEntry:
				state.selectedEntry?.id === id ? null : state.selectedEntry,
		})),
	setIsLoading: (loading) => set({ isLoading: loading }),
	setError: (error) => set({ error }),
}))
