import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../auth/store/authStore"
import { apiClient } from "../../../lib/api/client"
import { type DiaryEntry } from "../types/diary.types"

const EditEntryPage: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const { isAuthenticated } = useAuthStore()
	const [entryData, setEntryData] = useState<Partial<DiaryEntry>>({})
	const navigate = useNavigate()

	useEffect(() => {
		const fetchEntry = async () => {
			if (isAuthenticated && id) {
				try {
					const data = await apiClient.getDiaryEntry(id)
					setEntryData({
						...data,
						date: new Date(data.date).toISOString().split("T")[0],
					})
				} catch (error) {
					console.error("Failed to fetch entry", error)
				}
			}
		}
		fetchEntry()
	}, [isAuthenticated, id])

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target
		setEntryData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (isAuthenticated && id) {
			try {
				await apiClient.updateDiaryEntry(id, entryData)
				navigate(`/diary/${id}`)
			} catch (error) {
				console.error("Failed to update entry", error)
			}
		}
	}

	return (
		<div>
			<h1 className='text-2xl font-bold mb-4 text-light-darker dark:text-dark-lighter'>
				Editar Registro
			</h1>
			<form
				onSubmit={handleSubmit}
				className='p-4 bg-light-DEFAULT dark:bg-dark-light shadow-md rounded space-y-4'>
				<div>
					<label
						htmlFor='date'
						className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
						Data do Treino
					</label>
					<input
						type='date'
						name='date'
						id='date'
						value={entryData.date || ""}
						onChange={handleChange}
						className='mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
					/>
				</div>
				<div>
					<label
						htmlFor='focus'
						className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
						Foco do Treino
					</label>
					<textarea
						name='focus'
						id='focus'
						value={entryData.focus || ""}
						onChange={handleChange}
						rows={2}
						className='mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
					/>
				</div>
				<div>
					<label
						htmlFor='notes'
						className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
						Anotações Gerais
					</label>
					<textarea
						name='notes'
						id='notes'
						value={entryData.notes || ""}
						onChange={handleChange}
						rows={4}
						className='mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
					/>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					<div>
						<label
							htmlFor='techniquRating'
							className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
							Nota Técnica
						</label>
						<select
							name='techniquRating'
							id='techniquRating'
							value={entryData.techniquRating || ""}
							onChange={handleChange}
							className='mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'>
							<option value=''>Selecione</option>
							{[1, 2, 3, 4, 5].map((v) => (
								<option key={v} value={v}>
									{v}
								</option>
							))}
						</select>
					</div>
					<div>
						<label
							htmlFor='physicalRating'
							className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
							Nota Física
						</label>
						<select
							name='physicalRating'
							id='physicalRating'
							value={entryData.physicalRating || ""}
							onChange={handleChange}
							className='mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'>
							<option value=''>Selecione</option>
							{[1, 2, 3, 4, 5].map((v) => (
								<option key={v} value={v}>
									{v}
								</option>
							))}
						</select>
					</div>
					<div>
						<label
							htmlFor='mentalRating'
							className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
							Nota Mental
						</label>
						<select
							name='mentalRating'
							id='mentalRating'
							value={entryData.mentalRating || ""}
							onChange={handleChange}
							className='mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'>
							<option value=''>Selecione</option>
							{[1, 2, 3, 4, 5].map((v) => (
								<option key={v} value={v}>
									{v}
								</option>
							))}
						</select>
					</div>
				</div>
				<div>
					<label
						htmlFor='whatWentWell'
						className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
						O que fiz bem?
					</label>
					<textarea
						name='whatWentWell'
						id='whatWentWell'
						value={entryData.whatWentWell || ""}
						onChange={handleChange}
						rows={3}
						className='mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
					/>
				</div>
				<div>
					<label
						htmlFor='whatWasDifficult'
						className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
						O que foi difícil?
					</label>
					<textarea
						name='whatWasDifficult'
						id='whatWasDifficult'
						value={entryData.whatWasDifficult || ""}
						onChange={handleChange}
						rows={3}
						className='mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
					/>
				</div>
				<div>
					<label
						htmlFor='nextGoal'
						className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
						Meta para o próximo treino
					</label>
					<textarea
						name='nextGoal'
						id='nextGoal'
						value={entryData.nextGoal || ""}
						onChange={handleChange}
						rows={2}
						className='mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
					/>
				</div>
				<button
					className='bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2'
					type='submit'>
					Salvar
				</button>
			</form>
		</div>
	)
}

export default EditEntryPage
