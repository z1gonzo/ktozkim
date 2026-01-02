import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

// Mock the useAuth hook
jest.mock('../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Header', () => {
  const mockUseAuth = require('../hooks/useAuth').useAuth;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders logo and navigation links', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
      logout: jest.fn(),
    });

    renderWithRouter(<Header />);

    expect(screen.getByText('Kto z kim?')).toBeInTheDocument();
    expect(screen.getByText('Strona główna')).toBeInTheDocument();
    expect(screen.getByText('Urzędnicy')).toBeInTheDocument();
    expect(screen.getByText('Raporty')).toBeInTheDocument();
  });

  it('shows login and register buttons when not authenticated', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
      logout: jest.fn(),
    });

    renderWithRouter(<Header />);

    expect(screen.getByText('Zaloguj się')).toBeInTheDocument();
    expect(screen.getByText('Zarejestruj się')).toBeInTheDocument();
  });

  it('shows user menu when authenticated', () => {
    const mockUser = { firstName: 'Jan', lastName: 'Kowalski' };

    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: mockUser,
      logout: jest.fn(),
    });

    renderWithRouter(<Header />);

    expect(screen.getByText('Witaj, Jan!')).toBeInTheDocument();
    expect(screen.getByText('Wyloguj się')).toBeInTheDocument();
  });
});
