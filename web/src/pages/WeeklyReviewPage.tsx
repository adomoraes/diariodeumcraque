import React, { useState, useEffect } from "react"
import { useAuthStore } from "../lib/store"
import { getWeeklySummary } from "../services/api"
import { type DiaryEntry } from "../types.ts"
import { Link } from "react-router-dom"

interface WeeklySummary {
	total: number
	entries: DiaryEntry[]
	averageRatings: {
		technique: number | null
		physical: number | null
		mental: number | null
	}
}

const WeeklyReviewPage: React.FC = () => {
	const { token } = useAuthStore()
	const [summary, setSummary] = useState<WeeklySummary | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchSummary = async () => {
			if (token) {
				try {
					const data = await getWeeklySummary(token)
					setSummary(data)
				} catch (error) {
					console.error("Failed to fetch weekly summary", error)
				} finally {
					setLoading(false)
				}
			}
		}
		fetchSummary()
	}, [token])

	if (loading) {
		return (
			<div className='text-light-darker dark:text-dark-lighter'>
				Carregando resumo semanal...
			</div>
		)
	}

	if (!summary || summary.total === 0) {
		return (
			<div>
				<h1 className='text-2xl font-bold mb-4 text-light-darker dark:text-dark-lighter'>
					Revisão Semanal
				</h1>
				<p className='text-light-darker dark:text-dark-lighter'>
					Nenhum registro encontrado para esta semana.
				</p>
			</div>
		)
	}

	return (
		<div className='space-y-6'>
			<h1 className='text-3xl font-bold text-light-darker dark:text-dark-lighter'>
				Revisão Semanal
			</h1>

			<div className='p-6 bg-light-DEFAULT dark:bg-dark-light shadow-lg rounded-lg'>
				<h2 className='text-xl font-semibold mb-4'>Resumo das Médias</h2>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-center'>
					<div className='p-4 bg-light-dark dark:bg-dark-regular rounded-lg'>
						<p className='text-sm text-gray-400'>Técnica</p>
						<p className='text-2xl font-bold'>
							{summary.averageRatings.technique?.toFixed(1) || "N/A"}
						</p>
					</div>
					<div className='p-4 bg-light-dark dark:bg-dark-regular rounded-lg'>
						<p className='text-sm text-gray-400'>Física</p>
						<p className='text-2xl font-bold'>
							{summary.averageRatings.physical?.toFixed(1) || "N/A"}
						</p>
					</div>
					<div className='p-4 bg-light-dark dark:bg-dark-regular rounded-lg'>
						<p className='text-sm text-gray-400'>Mental</p>
						<p className='text-2xl font-bold'>
							{summary.averageRatings.mental?.toFixed(1) || "N/A"}
						</p>
					</div>
				</div>
			</div>

			<div>
				<h2 className='text-xl font-semibold mb-2 text-light-darker dark:text-dark-lighter'>
					{summary.total} {summary.total > 1 ? "Registros" : "Registro"} da
					Semana
				</h2>
				<ul>
					{summary.entries.map((entry) => (
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

export default WeeklyReviewPage
