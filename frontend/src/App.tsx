import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Officials from './pages/Officials';
import Reports from './pages/Reports';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthCallback from './pages/AuthCallback';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/officials" element={<Officials />} />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <Reports />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
