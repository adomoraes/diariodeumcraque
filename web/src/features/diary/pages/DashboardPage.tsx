import React, { useState, useEffect } from "react"
import { useAuthStore } from "../../auth/store/authStore"
import { apiClient } from "../../../lib/api/client"
import { Link } from "react-router-dom"
import { type DiaryEntry } from "../types/diary.types"

const DashboardPage: React.FC = () => {
	const { isAuthenticated } = useAuthStore()
	const [entries, setEntries] = useState<DiaryEntry[]>([])
	const [content, setContent] = useState("")

	useEffect(() => {
		const fetchEntries = async () => {
			if (isAuthenticated) {
				try {
					const data = await apiClient.getLastThreeEntries()
					setEntries(data)
				} catch (error) {
					console.error("Failed to fetch entries", error)
				}
			}
		}
		fetchEntries()
	}, [isAuthenticated])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (isAuthenticated) {
			try {
				const newEntry = await apiClient.createDiaryEntry(
					{ notes: content, date: new Date().toISOString() },
				)
				setEntries([newEntry, ...entries.slice(0, 2)])
				setContent("")
			} catch (error) {
				console.error("Failed to create entry", error)
			}
		}
	}

	return (
		<div>
			<h1 className='text-2xl font-bold mb-4 text-light-darker dark:text-dark-lighter'>
				Dashboard
			</h1>

			<div className='mb-8 p-4 bg-light-DEFAULT dark:bg-dark-light shadow-md rounded'>
				<h2 className='text-xl font-semibold mb-2 text-light-darker dark:text-dark-lighter'>
					Novo Registro Rápido
				</h2>
				<form onSubmit={handleSubmit}>
					<textarea
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-light-dark dark:bg-dark-lighter'
						rows={3}
						placeholder='Como foi seu treino hoje?'
						value={content}
						onChange={(e) => setContent(e.target.value)}></textarea>
					<button
						className='bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2'
						type='submit'>
						Salvar
					</button>
				</form>
			</div>

			<div>
				<div className='flex justify-between items-center mb-2'>
					<h2 className='text-xl font-semibold text-light-darker dark:text-dark-lighter'>
						Últimos Registros
					</h2>
					<Link to='/diary/all' className='text-primary hover:underline'>
						Ver todos
					</Link>
				</div>
				<ul>
					{entries.map((entry) => (
						<li
							key={entry.id}
							className='mb-2 p-3 border rounded bg-light-DEFAULT dark:bg-dark-light text-light-darker dark:text-dark-lighter shadow-sm'>
							<Link
								to={`/diary/${entry.id}`}
								className='text-primary hover:underline'>
								<p className='font-semibold'>
									{new Date(entry.date).toLocaleDateString()}
								</p>
								<p className='truncate'>{entry.notes?.substring(0, 100)}...</p>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default DashboardPage
