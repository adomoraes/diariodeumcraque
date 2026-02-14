import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthStore } from "./lib/store"
import Layout from "./components/Layout"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage"
import EntryDetailPage from "./pages/EntryDetailPage"
import EditEntryPage from "./pages/EditEntryPage"
import WeeklyReviewPage from "./pages/WeeklyReviewPage"
import MonthlyReviewPage from "./pages/MonthlyReviewPage"

// Componente ProtectedRoute
function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = useAuthStore()

	if (!isAuthenticated) {
		return <Navigate to='/login' />
	}

	return <>{children}</>
}

function App() {
	const { isAuthenticated } = useAuthStore()

	return (
		<BrowserRouter>
			<Routes>
				{/* Rotas Públicas */}
				<Route
					path='/login'
					element={isAuthenticated ? <Navigate to='/' /> : <LoginPage />}
				/>
				<Route
					path='/register'
					element={isAuthenticated ? <Navigate to='/' /> : <RegisterPage />}
				/>

				{/* Rotas Protegidas */}
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<Layout />
						</ProtectedRoute>
					}>
					<Route index element={<DashboardPage />} />
					<Route path='diary/:id' element={<EntryDetailPage />} />
					<Route path='diary/edit/:id' element={<EditEntryPage />} />
					<Route path='review/weekly' element={<WeeklyReviewPage />} />
					<Route path='review/monthly' element={<MonthlyReviewPage />} />
				</Route>

				{/* Fallback */}
				<Route
					path='*'
					element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
