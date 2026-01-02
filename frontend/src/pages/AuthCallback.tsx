import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));

        // Store authentication data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

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
  }, [navigate, searchParams]);

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
