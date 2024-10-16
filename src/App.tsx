import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import SignUp from './components/SignUp';
import Verification from './components/Verification';
import Dashboard from './components/Dashboard';
import CreateJob from './components/CreateJob';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './components/Login';

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUp />} />
      <Route path="/verify" element={<Verification />} />
      <Route path="/dashboard" element={<Dashboard  />} />
      <Route path="/create-job" element={<CreateJob />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <AppRoutes />
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
