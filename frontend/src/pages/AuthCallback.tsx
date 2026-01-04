import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    console.log('AuthCallback useEffect triggered');
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');

    console.log('AuthCallback - token:', token);
    console.log('AuthCallback - userParam:', userParam);
    console.log('AuthCallback - searchParams:', searchParams);

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        console.log('AuthCallback - parsed user:', user);

        // Use auth context to login
        login(token, user);

        // Redirect to home page
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Error processing auth callback:', error);
        navigate('/login', { replace: true });
      }
    } else {
      console.log('AuthCallback - missing token or userParam');
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
