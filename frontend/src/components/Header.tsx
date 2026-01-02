import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
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
