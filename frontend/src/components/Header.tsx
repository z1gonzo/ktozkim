import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>Kto z kim?</h1>
        </Link>
        <nav className="nav">
          <Link to="/">Strona główna</Link>
          <Link to="/officials">Urzędnicy</Link>
          <Link to="/reports">Raporty</Link>
        </nav>
        <div className="auth-section">
          {isAuthenticated ? (
            <div className="user-menu">
              <span>Witaj, {user?.firstName}!</span>
              <button onClick={handleLogout} className="btn btn-secondary">
                Wyloguj się
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary">Zaloguj się</Link>
              <Link to="/register" className="btn btn-primary">Zarejestruj się</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
