import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));

        // Use auth context to login
        login(token, user);

        // Redirect to home page
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Error processing auth callback:', error);
        navigate('/login', { replace: true });
      }
    } else {
      // No token, redirect to login
      navigate('/login', { replace: true });
    }
  }, [navigate, searchParams, login]);

  return (
    <div className="auth-callback">
      <div className="loading-container">
        <div className="spinner"></div>
        <h2>Logowanie...</h2>
        <p>Przekierowywanie do aplikacji...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
