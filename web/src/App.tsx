import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthStore } from "./features/auth/store/authStore"
import BaseLayout from "./components/layout/BaseLayout"
import LoginPage from "./features/auth/pages/LoginPage"
import RegisterPage from "./features/auth/pages/RegisterPage"
import DashboardPage from "./features/diary/pages/DashboardPage"
import EntryDetailPage from "./features/diary/pages/EntryDetailPage"
import EditEntryPage from "./features/diary/pages/EditEntryPage"
import WeeklyReviewPage from "./features/review/pages/WeeklyReviewPage"
import MonthlyReviewPage from "./features/review/pages/MonthlyReviewPage"
import AllEntriesPage from "./features/diary/pages/AllEntriesPage"

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
					element={isAuthenticated ? <Navigate to='/dashboard' /> : <LoginPage />}
				/>
				<Route
					path='/register'
					element={isAuthenticated ? <Navigate to='/dashboard' /> : <RegisterPage />}
				/>

				{/* Rotas Protegidas */}
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<BaseLayout />
						</ProtectedRoute>
					}>
					<Route index element={<Navigate to="/dashboard" />} />
					<Route path="dashboard" element={<DashboardPage />} />
					<Route path='diary/all' element={<AllEntriesPage />} />
					<Route path='diary/:id' element={<EntryDetailPage />} />
					<Route path='diary/edit/:id' element={<EditEntryPage />} />
					<Route path='review/weekly' element={<WeeklyReviewPage />} />
					<Route path='review/monthly' element={<MonthlyReviewPage />} />
				</Route>

				{/* Fallback */}
				<Route
					path='*'
					element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
