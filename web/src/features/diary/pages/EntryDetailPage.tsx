import React, { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../auth/store/authStore"
import { apiClient } from "../../../lib/api/client"
import { type DiaryEntry } from "../types/diary.types"

const EntryDetailPage: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const { isAuthenticated } = useAuthStore()
	const [entry, setEntry] = useState<DiaryEntry | null>(null)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchEntry = async () => {
			if (isAuthenticated && id) {
				try {
					const data = await apiClient.getDiaryEntry(id)
					setEntry(data)
				} catch (error) {
					console.error("Failed to fetch entry", error)
				}
			}
		}
		fetchEntry()
	}, [isAuthenticated, id])

	const handleDelete = async () => {
		if (isAuthenticated && id) {
			if (window.confirm("Tem certeza que deseja excluir este registro?")) {
				try {
					await apiClient.deleteDiaryEntry(id)
					navigate("/dashboard")
				} catch (error) {
					console.error("Failed to delete entry", error)
				}
			}
		}
	}

	if (!entry) {
		return (
			<div className='text-light-darker dark:text-dark-lighter'>
				Carregando...
			</div>
		)
	}

	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl font-bold text-light-darker dark:text-dark-lighter'>
					Registro de {new Date(entry.date).toLocaleDateString()}
				</h1>
				<Link to='/dashboard' className='text-primary hover:underline'>
					&larr; Voltar para o Dashboard
				</Link>
			</div>

			<div className='p-6 bg-light-DEFAULT dark:bg-dark-light shadow-lg rounded-lg space-y-4'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-center'>
					<div className='p-4 bg-light-dark dark:bg-dark-regular rounded-lg'>
						<p className='text-sm text-gray-400'>Nota Técnica</p>
						<p className='text-2xl font-bold'>
							{entry.techniquRating || "N/A"}
						</p>
					</div>
					<div className='p-4 bg-light-dark dark:bg-dark-regular rounded-lg'>
						<p className='text-sm text-gray-400'>Nota Física</p>
						<p className='text-2xl font-bold'>
							{entry.physicalRating || "N/A"}
						</p>
					</div>
					<div className='p-4 bg-light-dark dark:bg-dark-regular rounded-lg'>
						<p className='text-sm text-gray-400'>Nota Mental</p>
						<p className='text-2xl font-bold'>{entry.mentalRating || "N/A"}</p>
					</div>
				</div>

				<div>
					<h3 className='font-semibold text-lg'>Foco do Treino:</h3>
					<p className='text-gray-600 dark:text-gray-300'>
						{entry.focus || "Não especificado."}
					</p>
				</div>

				<div>
					<h3 className='font-semibold text-lg'>Anotações Gerais:</h3>
					<p className='text-gray-600 dark:text-gray-300'>
						{entry.notes || "Nenhuma."}
					</p>
				</div>

				<div>
					<h3 className='font-semibold text-lg'>O que foi bem?</h3>
					<p className='text-gray-600 dark:text-gray-300'>
						{entry.whatWentWell || "Não especificado."}
					</p>
				</div>

				<div>
					<h3 className='font-semibold text-lg'>O que foi difícil?</h3>
					<p className='text-gray-600 dark:text-gray-300'>
						{entry.whatWasDifficult || "Não especificado."}
					</p>
				</div>

				<div>
					<h3 className='font-semibold text-lg'>Meta para o próximo treino:</h3>
					<p className='text-gray-600 dark:text-gray-300'>
						{entry.nextGoal || "Não especificado."}
					</p>
				</div>

				<div className='flex items-center space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700'>
					<Link
						to={`/diary/edit/${entry.id}`}
						className='bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300'>
						Editar
					</Link>
					<button
						onClick={handleDelete}
						className='bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition-colors duration-300'>
						Excluir
					</button>
				</div>
			</div>
		</div>
	)
}

export default EntryDetailPage
