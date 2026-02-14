import React, { useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useAuthStore } from "../lib/store"

const Layout: React.FC = () => {
	const { user, logout } = useAuthStore()
	const navigate = useNavigate()
	const [isDarkMode, setIsDarkMode] = useState(localStorage.theme === "dark")

	const handleLogout = () => {
		logout()
		navigate("/login")
	}

	const toggleDarkMode = () => {
		if (isDarkMode) {
			document.documentElement.classList.remove("dark")
			localStorage.theme = "light"
		} else {
			document.documentElement.classList.add("dark")
			localStorage.theme = "dark"
		}
		setIsDarkMode(!isDarkMode)
	}

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white'>
			<nav className='bg-blue-600 dark:bg-blue-800 shadow-lg'>
				<div className='max-w-6xl mx-auto px-4 py-3'>
					<div className='flex justify-between items-center'>
						<Link to='/' className='text-white text-2xl font-bold'>
							⚽ Diário de Craque
						</Link>

						<div className='flex items-center gap-6'>
							{user && (
								<>
									<div className='text-white text-sm'>
										Olá, <span className='font-semibold'>{user.name}</span>
									</div>
									<Link
										to='/'
										className='text-white hover:text-blue-100 transition text-sm'>
										Dashboard
									</Link>
									<Link
										to='/review/weekly'
										className='text-white hover:text-blue-100 transition text-sm'>
										Sem. Diária
									</Link>
									<Link
										to='/review/monthly'
										className='text-white hover:text-blue-100 transition text-sm'>
										Revisão Mensal
									</Link>
									<button
										onClick={handleLogout}
										className='text-white hover:text-red-300 transition text-sm'>
										Sair
									</button>
								</>
							)}
							<button
								onClick={toggleDarkMode}
								className='text-white hover:text-blue-100'
								title='Alternar tema'>
								{isDarkMode ? "☀️" : "🌙"}
							</button>
						</div>
					</div>
				</div>
			</nav>

			<main className='max-w-6xl mx-auto px-4 py-8'>
				<Outlet />
			</main>
		</div>
	)
}

export default Layout
