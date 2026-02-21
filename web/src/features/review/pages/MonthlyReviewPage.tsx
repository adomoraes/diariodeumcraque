import React, { useState } from "react"
import { useAuthStore } from "../lib/store"
import { getMonthlySummary } from "../services/api"
import { type DiaryEntry } from "../types.ts"
import { Link } from "react-router-dom"

interface MonthlySummary {
	year: number
	month: number
	total: number
	entries: DiaryEntry[]
	averageRatings: {
		technique: number | null
		physical: number | null
		mental: number | null
	}
}

const MonthlyReviewPage: React.FC = () => {
	const { token } = useAuthStore()
	const [summary, setSummary] = useState<MonthlySummary | null>(null)
	const [loading, setLoading] = useState(false)
	const [year, setYear] = useState(new Date().getFullYear())
	const [month, setMonth] = useState(new Date().getMonth() + 1)

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault()
		if (token) {
			setLoading(true)
			try {
				const data = await getMonthlySummary(token, year, month)
				setSummary(data)
			} catch (error) {
				console.error("Failed to fetch monthly summary", error)
				setSummary(null)
			} finally {
				setLoading(false)
			}
		}
	}

	const years = Array.from(
		{ length: 5 },
		(_, i) => new Date().getFullYear() - i,
	)
	const months = [
		{ value: 1, name: "Janeiro" },
		{ value: 2, name: "Fevereiro" },
		{ value: 3, name: "Março" },
		{ value: 4, name: "Abril" },
		{ value: 5, name: "Maio" },
		{ value: 6, name: "Junho" },
		{ value: 7, name: "Julho" },
		{ value: 8, name: "Agosto" },
		{ value: 9, name: "Setembro" },
		{ value: 10, name: "Outubro" },
		{ value: 11, name: "Novembro" },
		{ value: 12, name: "Dezembro" },
	]

	return (
		<div className='space-y-6'>
			<h1 className='text-3xl font-bold text-light-darker dark:text-dark-lighter'>
				Revisão Mensal
			</h1>

			<form
				onSubmit={handleSearch}
				className='p-4 bg-light-DEFAULT dark:bg-dark-light shadow-md rounded-lg flex items-center space-x-4'>
				<select
					value={year}
					onChange={(e) => setYear(parseInt(e.target.value, 10))}
					className='p-2 border rounded-md'>
					{years.map((y) => (
						<option key={y} value={y}>
							{y}
						</option>
					))}
				</select>
				<select
					value={month}
					onChange={(e) => setMonth(parseInt(e.target.value, 10))}
					className='p-2 border rounded-md'>
					{months.map((m) => (
						<option key={m.value} value={m.value}>
							{m.name}
						</option>
					))}
				</select>
				<button
					type='submit'
					disabled={loading}
					className='bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400'>
					{loading ? "Buscando..." : "Buscar"}
				</button>
			</form>

			{loading && (
				<div className='text-light-darker dark:text-dark-lighter'>
					Carregando resumo mensal...
				</div>
			)}

			{summary &&
				!loading &&
				(summary.total > 0 ? (
					<div className='space-y-6'>
						<div className='p-6 bg-light-DEFAULT dark:bg-dark-light shadow-lg rounded-lg'>
							<h2 className='text-xl font-semibold mb-4'>
								Resumo das Médias de{" "}
								{months.find((m) => m.value === summary.month)?.name}/
								{summary.year}
							</h2>
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
								{summary.total} {summary.total > 1 ? "Registros" : "Registro"}{" "}
								no Mês
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
											<p className='truncate'>
												{entry.notes?.substring(0, 100)}...
											</p>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				) : (
					<p className='text-light-darker dark:text-dark-lighter'>
						Nenhum registro encontrado para{" "}
						{months.find((m) => m.value === month)?.name}/{year}.
					</p>
				))}
		</div>
	)
}

export default MonthlyReviewPage
