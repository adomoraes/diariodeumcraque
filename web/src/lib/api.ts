import { useAuthStore } from "./store"
import type { DiaryEntry } from "./store"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

class ApiClient {
	private baseUrl: string

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl
	}

	private getHeaders() {
		const { token } = useAuthStore.getState()
		return {
			"Content-Type": "application/json",
			...(token && { Authorization: `Bearer ${token}` }),
		}
	}

	private async request<T>(
		endpoint: string,
		options: RequestInit = {},
	): Promise<T> {
		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			...options,
			headers: {
				...this.getHeaders(),
				...options.headers,
			},
		})

		if (!response.ok) {
			if (response.status === 401) {
				useAuthStore.getState().logout()
			}
			const error = await response
				.json()
				.catch(() => ({ message: "Erro desconhecido" }))
			throw new Error(error.message || `HTTP Error: ${response.status}`)
		}

		return response.json()
	}

	// Auth
	async register(
		email: string,
		name: string,
		pass: string,
		birthDate?: string,
	) {
		return this.request("/auth/register", {
			method: "POST",
			body: JSON.stringify({ email, name, pass, birthDate }),
		})
	}

	async login(email: string, pass: string) {
		return this.request("/auth/login", {
			method: "POST",
			body: JSON.stringify({ email, pass }),
		})
	}

	// Users
	async getProfile() {
		return this.request("/users/profile")
	}

	// Diary
	async getDiaryEntries() {
		return this.request<DiaryEntry[]>("/diary")
	}

	async getDiaryEntry(id: string) {
		return this.request<DiaryEntry>(`/diary/${id}`)
	}

	async createDiaryEntry(data: Partial<DiaryEntry>) {
		return this.request<DiaryEntry>("/diary", {
			method: "POST",
			body: JSON.stringify(data),
		})
	}

	async updateDiaryEntry(id: string, data: Partial<DiaryEntry>) {
		return this.request<DiaryEntry>(`/diary/${id}`, {
			method: "PATCH",
			body: JSON.stringify(data),
		})
	}

	async deleteDiaryEntry(id: string) {
		return this.request(`/diary/${id}`, {
			method: "DELETE",
		})
	}

	async getLastThreeEntries() {
		return this.request<DiaryEntry[]>("/diary/last-three")
	}

	async getWeeklySummary() {
		return this.request("/diary/summary/weekly")
	}

	async getMonthlySummary(year: number, month: number) {
		return this.request(`/diary/summary/monthly?year=${year}&month=${month}`)
	}
}

export const apiClient = new ApiClient(API_BASE_URL)
