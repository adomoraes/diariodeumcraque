import React, { useState, useEffect } from "react"
import { useAuthStore } from "../lib/store"
import { findAll } from "../services/api"
import { Link } from "react-router-dom"
import { type DiaryEntry } from "../types.ts"

const AllEntriesPage: React.FC = () => {
	const { token } = useAuthStore()
	const [entries, setEntries] = useState<DiaryEntry[]>([])

	useEffect(() => {
		const fetchEntries = async () => {
			if (token) {
				try {
					const data = await findAll(token)
					setEntries(data)
				} catch (error) {
					console.error("Failed to fetch entries", error)
				}
			}
		}
		fetchEntries()
	}, [token])

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
