import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import EntryDetailPage from './pages/EntryDetailPage';
import EditEntryPage from './pages/EditEntryPage';
import WeeklyReviewPage from './pages/WeeklyReviewPage';
import MonthlyReviewPage from './pages/MonthlyReviewPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="diary/:id" element={<EntryDetailPage />} />
          <Route path="diary/edit/:id" element={<EditEntryPage />} />
          <Route path="review/weekly" element={<WeeklyReviewPage />} />
          <Route path="review/monthly" element={<MonthlyReviewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;