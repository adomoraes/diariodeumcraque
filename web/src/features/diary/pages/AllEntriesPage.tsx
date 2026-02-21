import React, { useState, useEffect } from "react"
import { useAuthStore } from "../../auth/store/authStore"
import { apiClient } from "../../../lib/api/client"
import { Link } from "react-router-dom"
import { type DiaryEntry } from "../types/diary.types"

const AllEntriesPage: React.FC = () => {
	const { isAuthenticated } = useAuthStore()
	const [entries, setEntries] = useState<DiaryEntry[]>([])

	useEffect(() => {
		const fetchEntries = async () => {
			if (isAuthenticated) {
				try {
					const data = await apiClient.getDiaryEntries()
					setEntries(data)
				} catch (error) {
					console.error("Failed to fetch entries", error)
				}
			}
		}
		fetchEntries()
	}, [isAuthenticated])

	return (
		<div>
			<div className='flex justify-between items-center mb-4'>
				<h1 className='text-2xl font-bold text-light-darker dark:text-dark-lighter'>
					Todos os Registros
				</h1>
				<Link to='/dashboard' className='text-primary hover:underline'>
					&larr; Voltar para o Dashboard
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
	)
}

export default AllEntriesPage
