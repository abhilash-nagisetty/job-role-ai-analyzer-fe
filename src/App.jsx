import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobAnalyzer from './pages/JobAnalyzer';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/job-role-analyzer"
        element={
          <ProtectedRoute>
            <JobAnalyzer />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
